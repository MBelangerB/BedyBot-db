const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const InvalidCRONException = require('../../../src/declarations/InvalidCRONException');
const { beforeCheckState, afterCheckState, resetState } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { controller } = require('../../../src/BedyContext');
const { BOT_GuildsController, BOT_GuildOptionsController } = controller;


describe('01.02 - BOT_GuildOptionsController', () => {

    before(async () => {
        console.log('============== Setup (Before on GuildOptionController) ==============');
        await beforeCheckState();
    });

    after(async () => {
        console.log('============== Setup (After on GuildOptionController) ==============');
        resetState();
        await afterCheckState();
    });


    // Declare const
    const guildId = generateUnsignedBigInt64();
    const ownerId = generateUnsignedBigInt64();
    const channelId = generateUnsignedBigInt64();
    const initialGuildName = 'Guild Option Test';

    /* eslint-disable-next-line no-undef */
    context('1.0 - without data', () => {
        // No test in this context
    }); // End wihtout data Context

    /* eslint-disable-next-line no-undef */
    context('1.1 - valid CRUD action', () => {

        it('should activated GuildOption for a new guild', async () => {
            const aGuild = await BOT_GuildsController.createGuild(guildId, initialGuildName, ownerId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(initialGuildName);

            const aGuildOption = await BOT_GuildOptionsController.initOptionForGuildId(guildId);
            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
        });

        it('should updated GuildOption for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(guildId, channelId, 4, true, '* * * 10 *');
            // console.log(aGuildOption)

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should updated GuildOption without changed value for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(guildId);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should get GuildOption for a existing guild with include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(guildId, true);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(guildId);
            expect(aGuildOption.BOT_Guild.guildName).to.equal(initialGuildName);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
        });

        it('should get GuildOption for a existing guild without include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(guildId, false);

            expect(aGuildOption).to.be.an('object');
            expect(BigInt(aGuildOption.guildId)).to.equal(guildId);
            expect(aGuildOption.BOT_Guild).to.be.undefined;
        });

    }); // End Context CRUD

    /* eslint-disable-next-line no-undef */
    context('1.2 - error action', () => {
        it('should throw a exception for update guildOption with a invalid guild id', async () => {
            try {
                await BOT_GuildOptionsController.updateGuildOption(generateUnsignedBigInt64(), channelId, null, null);
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
                await BOT_GuildOptionsController.updateGuildOption(guildId, channelId, 4, true, 'test');
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