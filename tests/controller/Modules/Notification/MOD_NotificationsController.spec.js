const { assert, expect } = require('chai');
const { v4: uuidv4 } = require('uuid');

const InvalidEntityException = require('../../../../src/declarations/InvalidEntityException');

/* eslint-disable-next-line no-unused-vars */
const { sequelize, models, migrations, controller, schema } = require('../../../../src/BedyContext');
const { before, after, describe, it } = require('mocha');

const { MOD_NotificationsController } = controller;

const { PrepareData, ResetData } = require('../../../mocha-setup');
/* eslint-disable-next-line no-unused-vars */
const { generateUnsignedBigInt64 } = require('../../../../src/services/TestService');
const { BedyAPIConst } = require('../../../../src/BedyAPIConst');

describe('03.01 - MOD_Notifications', () => {
    // Const
    let defaultGuild = null;
    let newNotificationId = null;
    const notificationId = uuidv4();

    // Hook
    before(async () => {
        console.log('============== Setup (Before on MOD_Notifications) ==============');
        defaultGuild = await PrepareData.GuildInitialization();
        // await beforeCheckState();
    });

    after(async () => {
        console.log('============== Setup (After on MOD_Notifications) ==============');

        try {
            await ResetData.CleanAllNotifications();
            await ResetData.CleanAllChannels();
            await ResetData.CleanAllGuilds();
        } catch (err) {
            console.error(err);
        }

        // resetState();
        // await afterCheckState();
    });

    context('1.0 - without data', () => {

        it('should be empty - Try to get all notifications for a specific guild', async () => {
            const allNotif = await MOD_NotificationsController.getNotificationByGuildId(PrepareData.guildId);

            expect(allNotif).to.be.an('array');
            expect(allNotif).to.be.empty;
        });

        it('should be empty - Try to get all notifications for a specific guild (with model)', async () => {
            const allNotif = await MOD_NotificationsController.getNotificationByGuildId(PrepareData.guildId, [models.BOT_Guilds]);

            expect(allNotif).to.be.an('array');
            expect(allNotif).to.be.empty;
        });

        it('should be empty - Try to get a specific notification', async () => {
            const aNotification = await MOD_NotificationsController.getNotificationById(notificationId);
            expect(aNotification).to.be.null;
        });
    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {

        it('should create a new notification with channel', async () => {
            const createdNotif = await MOD_NotificationsController.createNotification(PrepareData.guildId, '',
                BedyAPIConst.NotificationType.TWITCH, 'Streamer', true, PrepareData.channelId);
            // newNotificationId = createdNotif.notificationId;

            expect(createdNotif).to.be.an('object');
            expect(createdNotif.notificationId).not.be.null;
            expect(createdNotif.channelId).not.be.null;
            expect(createdNotif.notificationTarget).to.equal('Streamer');
            expect(createdNotif.guildId).to.equal(PrepareData.guildId);
        });

        it('should create a new notification without channel', async () => {
            const createdNotif = await MOD_NotificationsController.createNotification(PrepareData.guildId, '',
                BedyAPIConst.NotificationType.TWITCH, 'Streamer', true, null);
            newNotificationId = createdNotif.notificationId;

            expect(createdNotif).to.be.an('object');
            expect(createdNotif.notificationId).not.be.null;
            expect(createdNotif.channelId).be.null;
            expect(createdNotif.notificationTarget).to.equal('Streamer');
            expect(createdNotif.guildId).to.equal(PrepareData.guildId);
        });

        it('should create and delete all guild notification', async () => {
            const notifToRemove = await MOD_NotificationsController.createNotification(PrepareData.tmpGuildId, '',
                BedyAPIConst.NotificationType.TWITCH, 'ToRemove', true, null);

            expect(notifToRemove).to.be.an('object');
            expect(notifToRemove.notificationId).not.be.null;
            expect(notifToRemove.notificationTarget).to.equal('ToRemove');
            expect(notifToRemove.guildId).to.equal(PrepareData.tmpGuildId);

            await MOD_NotificationsController.deleteAllNotificationByGuildId(PrepareData.tmpGuildId);
        });

        it('should create and delete a notification', async () => {
            const notifToRemove = await MOD_NotificationsController.createNotification(PrepareData.guildId, '',
                BedyAPIConst.NotificationType.YOUTUBE, 'ToRemove2', true, null);

            expect(notifToRemove).to.be.an('object');
            expect(notifToRemove.notificationId).not.be.null;
            expect(notifToRemove.notificationTarget).to.equal('ToRemove2');
            expect(notifToRemove.guildId).to.equal(PrepareData.guildId);

            await MOD_NotificationsController.deleteNotificationId(notifToRemove.notificationId);
        });

        it('should update a notification', async () => {
            const updatedNotification = await MOD_NotificationsController.updateNotification(newNotificationId, 'My content',
                BedyAPIConst.NotificationType.YOUTUBE, 'Youtube Streamer', false, PrepareData.channelId);

            expect(updatedNotification).to.be.an('object');
            expect(updatedNotification.notificationId).not.be.null;
            expect(updatedNotification.notificationTarget).to.equal('Youtube Streamer');
            expect(updatedNotification.notificationMessage).to.equal('My content');
            expect(BigInt(updatedNotification.channelId)).to.equal(PrepareData.channelId);
        });

        it('should return a unchanged notification, as no value has been modified. (unmodified)', async () => {
            const updatedNotification = await MOD_NotificationsController.updateNotification(newNotificationId, 'My content',
                BedyAPIConst.NotificationType.YOUTUBE, 'Youtube Streamer', false, PrepareData.channelId);

            expect(updatedNotification).to.be.an('object');
            expect(updatedNotification.notificationId).not.be.null;
        });

        it('should update a notification with remove channelId', async () => {
            const updatedNotification = await MOD_NotificationsController.updateNotification(newNotificationId, 'My content',
                BedyAPIConst.NotificationType.YOUTUBE, 'Youtube Streamer', false, null);

            expect(updatedNotification).to.be.an('object');
            expect(updatedNotification.notificationId).not.be.null;
            expect(updatedNotification.channelId).be.null;
        });

        it('should read a existing notification, without includes association', async () => {
            const aNotification = await MOD_NotificationsController.getNotificationById(newNotificationId);

            expect(aNotification).to.be.an('object');
            expect(aNotification.notificationId).not.be.null;
            expect(aNotification.notificationTarget).to.equal('Youtube Streamer');
            expect(aNotification.notificationMessage).to.equal('My content');
        });

        it('should read a existing notification, including association', async () => {
            const aNotification = await MOD_NotificationsController.getNotificationById(newNotificationId, [models.BOT_Guilds]);

            expect(aNotification).to.be.an('object');
            expect(aNotification.notificationId).not.be.null;
            expect(aNotification.BOT_Guild).not.be.null;
            expect(aNotification.notificationTarget).to.equal('Youtube Streamer');
            expect(aNotification.notificationMessage).to.equal('My content');
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {

        it('should throw a exception for trying to delete a invalid guild notification', async () => {
            try {
                await MOD_NotificationsController.deleteAllNotificationByGuildId(1);
                assert.fail('Error !  MOD_NotificationsController.deleteAllNotificationByGuildId has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for trying to delete a invalid notification', async () => {
            try {
                await MOD_NotificationsController.deleteNotificationId(1);
                assert.fail('Error !  MOD_NotificationsController.deleteNotificationId has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update a invalid notification id', async () => {
            try {
                await MOD_NotificationsController.updateNotification(1, 'My content', BedyAPIConst.NotificationType.YOUTUBE,
                    'Youtube Streamer', false, PrepareData.channelId);

                assert.fail('Error !  MOD_NotificationsController.updateNotification has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

    }); // End context « error action »

});