const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const InvalidCRONException = require('../../../src/declarations/InvalidCRONException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { controller } = require('../../../src/BedyContext');
const { BOT_GuildsController, BOT_GuildOptionsController } = controller;


describe('01.00.01 - BOT_GuildOptionsController', () => {

    before(async () => {
        console.log('============== Setup (Before on BOT_GuildOptionsController) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
        await PrepareData.GuildChannelInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_GuildOptionsController) ==============');
        await ResetData.CleanAllChannels();
        await ResetData.CleanAllGuilds();
    });


    // Declare const
    // const guildId = generateUnsignedBigInt64();
    // const ownerId = generateUnsignedBigInt64();
    // const channelId = generateUnsignedBigInt64();
    // const initialGuildName = 'Guild Option Test';

    /* eslint-disable-next-line no-undef */
    context('1.0 - without data', () => {
        // No test in this context
    }); // End wihtout data Context

    /* eslint-disable-next-line no-undef */
    context('1.1 - valid CRUD action', () => {

        it('should activated GuildOption for a new guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.initOptionForGuildId(PrepareData.guildId);
            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(PrepareData.guildId);
        });

        it('should updated GuildOption for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(PrepareData.guildId, PrepareData.channelId, 4, true, '* * * 10 *');

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(PrepareData.channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should updated GuildOption without changed value for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(PrepareData.guildId);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(PrepareData.channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should get GuildOption for a existing guild with include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(PrepareData.guildId, true);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(PrepareData.guildId);
            expect(aGuildOption.BOT_Guild.guildName).to.equal(PrepareData.guildName);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
        });

        it('should get GuildOption for a existing guild without include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(PrepareData.guildId, false);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(PrepareData.guildId);
            expect(aGuildOption.BOT_Guild).to.be.undefined;
        });

    }); // End Context CRUD

    /* eslint-disable-next-line no-undef */
    context('1.2 - error action', () => {
        it('should throw a exception for update guildOption with a invalid guild id', async () => {
            try {
                await BOT_GuildOptionsController.updateGuildOption(generateUnsignedBigInt64(), PrepareData.channelId, null, null);
                assert.fail('Error !  BOT_GuildOptionsController.updateGuildOption has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update guildOption with a invalid CRON value', async () => {
            try {
                await BOT_GuildOptionsController.updateGuildOption(PrepareData.guildId, PrepareData.channelId, 4, true, 'test');
                assert.fail('Error !  BOT_GuildOptionsController.updateGuildOption has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidCRONException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });
    }); // End error context

}); // first describe