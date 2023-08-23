const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const { controller } = require('../../src/BedyContext');
const { BOT_GuildsController, BOT_GuildOptionsController } = controller;

describe('BOT_GuildOptionsController', () => {

    // Declare const
    const guildId = generateUnsignedBigInt64();
    const ownerId = generateUnsignedBigInt64();
    const channelId = generateUnsignedBigInt64();
    const initialGuildName = 'Guild Option Test';

    after(async () => {
        console.log('============== after 2 ==============');
        const allGuilds = await BOT_GuildsController.getAllGuilds();
        if (allGuilds != null) {
            for (let index = 0; index < allGuilds.length; index++) {
                const aGuild = allGuilds[index];
                await BOT_GuildsController.deleteGuild(aGuild.guildId);

            }
        }
    });

    // Declare « grouping » test
    describe('GuildOption Management', () => {

        it('should activated GuildOption for a new guild', async () => {
            const aGuild = await BOT_GuildsController.createGuild(guildId, initialGuildName, ownerId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(initialGuildName);

            const aGuildOption = await BOT_GuildOptionsController.initOptionForGuildId(guildId);
            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
        });

        it('should updated GuildOption for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(guildId, channelId, 4, true);

            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should get GuildOption for a existing guild with include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(guildId, true);

            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
            expect(BigInt(aGuildOption.BOT_Guild.guildName)).to.equal(initialGuildName);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
        });

        it('should get GuildOption for a existing guild without include BOT_Guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.getGuildOptionByGuildId(guildId, false);

            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
            expect(BigInt(aGuildOption.BOT_Guild)).to.be.null;
        });

        it('should updated GuildOption without changed value for a existing guild', async () => {
            const aGuildOption = await BOT_GuildOptionsController.updateGuildOption(guildId, channelId, null, null);

            expect(aGuildOption).to.be.an('object');
            expect(aGuildOption.guildId).to.equal(guildId);
            expect(BigInt(aGuildOption.announcementChannelId)).to.equal(channelId);
            expect(aGuildOption.maxPlayerPerLobby).to.equal(4);
            expect(aGuildOption.addEveryone).to.equal(true);
        });

        it('should throw a exception for update guildOption with a invalid guild id', async () => {
            try {
                await BOT_GuildOptionsController.updateGuildOption(generateUnsignedBigInt64(), channelId, null, null);
                assert.fail('Error !  BOT_GuildOptionsController.updateGuild has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

    }); // 2nd describe

}); // first describe

// TODO : Put this in a Services
function generateUnsignedBigInt64() {
    const maxUint64 = BigInt('18446744073709551615'); // 2^64 - 1
    const randomUint64 = BigInt(Math.floor(Math.random() * Number(maxUint64)));
    return randomUint64;
}
