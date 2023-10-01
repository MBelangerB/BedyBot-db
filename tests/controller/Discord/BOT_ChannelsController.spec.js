const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');
const { BedyAPIConst } = require('../../../src/BedyAPIConst');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_ChannelsController } = controller;

describe('01.01.00 - BOT_ChannelsController', () => {
    // Const


    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_ChannelsController) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
        // await PrepareData.UserInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_ChannelsController) ==============');
        // await ResetData.CleanAllUsers();
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should create a new channel', async () => {
            const createdChannel = await BOT_ChannelsController.createGuildChannel(PrepareData.guildId, PrepareData.channelId, PrepareData.channelName, 
                                                            BedyAPIConst.DiscordChannelTypes.GUILD_TEXT, null, 'Topic message', null);

            expect(createdChannel).to.be.an('object');
            expect(BigInt(createdChannel.channelId)).to.equal(PrepareData.channelId);
            expect(BigInt(createdChannel.guildId)).to.equal(PrepareData.guildId);
            expect(createdChannel.channelName).to.equal(PrepareData.channelName);
        });

        it('should get a existing channel', async () => {
            const aChannel = await BOT_ChannelsController.getChannelById(PrepareData.channelId, [models.BOT_UserDetails]);
            expect(aChannel).to.be.an('object');
            expect(BigInt(aChannel.channelId)).to.equal(PrepareData.channelId);
        });

        it('should create and delete a channel', async () => {
            const tmpChannelGuid = generateUnsignedBigInt64();
            const tmpChannel = await BOT_ChannelsController.createGuildChannel(PrepareData.guildId, tmpChannelGuid, PrepareData.channelName, 
                                                                BedyAPIConst.DiscordChannelTypes.GUILD_TEXT, null, 'Channel to Remove', null);

            expect(tmpChannel).to.be.an('object');
            expect(BigInt(tmpChannel.channelId)).to.equal(tmpChannelGuid);
            expect(tmpChannel.channelName).to.equal(PrepareData.channelName);

            await BOT_ChannelsController.deleteChannel(tmpChannelGuid);
        });

        it('should update a channel, without change entity', async () => {
            const updatedChannel = await BOT_ChannelsController.updateChannel(PrepareData.channelId, PrepareData.channelName, 
                                                                            BedyAPIConst.DiscordChannelTypes.GUILD_TEXT, null, 'Topic message', null);

            expect(updatedChannel).to.be.an('object');
            expect(BigInt(updatedChannel.channelId)).to.equal(PrepareData.channelId);
            expect(BigInt(updatedChannel.guildId)).to.equal(PrepareData.guildId);
            expect(updatedChannel.channelName).to.equal(PrepareData.channelName);
        });

        it('should update a existing channel', async () => {
            const updatedChannel = await BOT_ChannelsController.updateChannel(PrepareData.channelId, 'New Channel Name', 
                                                                            BedyAPIConst.DiscordChannelTypes.GUILD_VOICE, PrepareData.channelCategoryId,
                                                                            'New Topic', '1');

            expect(updatedChannel).to.be.an('object');
            expect(BigInt(updatedChannel.channelId)).to.equal(PrepareData.channelId);
            expect(BigInt(updatedChannel.guildId)).to.equal(PrepareData.guildId);
            expect(updatedChannel.channelName).to.equal('New Channel Name');
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid channel', async () => {
            try {
                await BOT_ChannelsController.updateChannel(generateUnsignedBigInt64(), PrepareData.channelName, 
                                                BedyAPIConst.DiscordChannelTypes.GUILD_TEXT, null, null, null);
                assert.fail('Error ! BOT_ChannelsController.updateChannel has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for delete a invalid channel', async () => {
            try {
                await BOT_ChannelsController.deleteChannel(generateUnsignedBigInt64());
                assert.fail('Error ! BOT_ChannelsController.deleteChannel has\' return a error.');
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