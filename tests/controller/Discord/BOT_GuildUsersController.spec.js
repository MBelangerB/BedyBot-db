const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_UsersController, BOT_GuildUsersController } = controller;

describe('01.02.02 - BOT_GuildUsersController', () => {
    // Const
    const userAvatarHash = '6182729096ea3675442027381ff52dfe'; 
    const guildNickName = 'TestGuild TestUser';

    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_GuildUsersController) ==============');
        await PrepareData.GuildInitialization();
        await PrepareData.UserInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_GuildUsersController) ==============');
        await ResetData.CleanAllUsers();
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should initialize the guildUser for a existing user', async () => {
            const guildUser = await BOT_GuildUsersController.initializeGuildUser(PrepareData.guildId, PrepareData.userID, 'GuildUser Test', '8342729096ea3675442027381ff50dfe');

            expect(guildUser).to.be.an('object');
            expect(BigInt(guildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(guildUser.userId)).to.equal(PrepareData.userID);
        });

        it('should get a user by UserId/GuildId without include', async () => {
            const aUser = await BOT_UsersController.getUserByGuildIdUserId(PrepareData.guildId, PrepareData.userID);

            expect(aUser).to.be.an('object');
            expect(BigInt(aUser.userId)).to.equal(PrepareData.userID);
            expect(aUser.username).to.equal(PrepareData.username);
            expect(aUser.BOT_Guild).to.be.undefined;
            expect(aUser.BOT_User).to.be.undefined;
        });

        it('should get a GuildUser by UserId/GuildId with include', async () => {
            const aGuildUser = await BOT_GuildUsersController.getGuildUserByUserId(PrepareData.guildId, PrepareData.userID, true, true);

            expect(aGuildUser).to.be.an('object');
            expect(BigInt(aGuildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aGuildUser.userId)).to.equal(PrepareData.userID);
            expect(aGuildUser.BOT_Guild).not.to.be.undefined;
            expect(aGuildUser.BOT_User).not.to.be.undefined;
        });

        it('should get a GuildUser by UserId/GuildId without include', async () => {
            const aGuildUser = await BOT_GuildUsersController.getGuildUserByUserId(PrepareData.guildId, PrepareData.userID, false, false);

            expect(aGuildUser).to.be.an('object');
            expect(BigInt(aGuildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aGuildUser.userId)).to.equal(PrepareData.userID);
            expect(aGuildUser.BOT_Guild).to.be.undefined;
            expect(aGuildUser.BOT_User).to.be.undefined;
        });

        it('should update the guildUser details for a existing user', async () => {
            const guildUser = await BOT_GuildUsersController.updateGuildUser(PrepareData.guildId, PrepareData.userID, guildNickName, userAvatarHash);

            expect(guildUser).to.be.an('object');
            expect(BigInt(guildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(guildUser.userId)).to.equal(PrepareData.userID);
            expect(guildUser.nickname).to.equal(guildNickName);
            expect(guildUser.avatar).to.equal(userAvatarHash);
        });

        it('should trying to update a guildUser details, wihtout changing', async () => {
            const guildUser = await BOT_GuildUsersController.updateGuildUser(PrepareData.guildId, PrepareData.userID, guildNickName, userAvatarHash);

            expect(guildUser).to.be.an('object');
            expect(BigInt(guildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(guildUser.userId)).to.equal(PrepareData.userID);
            expect(guildUser.nickname).to.equal(guildNickName);
            expect(guildUser.avatar).to.equal(userAvatarHash);
        });

        it('should update the guildUser status for a existing user (exist guild)', async () => {
            const guildUser = await BOT_GuildUsersController.updateGuildUserStatut(PrepareData.guildId, PrepareData.userID, true);

            expect(guildUser).to.be.an('object');
            expect(BigInt(guildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(guildUser.userId)).to.equal(PrepareData.userID);
            expect(guildUser.joinedAt).not.be.undefined;
            expect(guildUser.leftAt).not.be.undefined;
        });

        it('should update the guildUser status for a existing user (joined guild)', async () => {
            const guildUser = await BOT_GuildUsersController.updateGuildUserStatut(PrepareData.guildId, PrepareData.userID, false);

            expect(guildUser).to.be.an('object');
            expect(BigInt(guildUser.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(guildUser.userId)).to.equal(PrepareData.userID);
            expect(guildUser.joinedAt).not.be.undefined;
            expect(guildUser.leftAt).be.null;
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {

        it('should throw a exception for update a invalid guildUser', async () => {
            try {
                await BOT_GuildUsersController.updateGuildUser(generateUnsignedBigInt64(), PrepareData.userID, guildNickName, userAvatarHash);
                assert.fail('Error !  BOT_GuildUsersController.updateGuildUser has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception on update guild status for a invalid guildUser', async () => {
            try {
                await BOT_GuildUsersController.updateGuildUserStatut(PrepareData.guildId, generateUnsignedBigInt64(), false);
                assert.fail('Error !  BOT_GuildUsersController.updateGuildUserStatut has\' return a error.');
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