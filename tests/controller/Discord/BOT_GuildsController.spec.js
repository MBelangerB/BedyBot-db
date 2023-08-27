const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)
const InvalidEntityException = require('../../src/declarations/InvalidEntityException');

/* eslint-disable-next-line no-unused-vars */
const { sequelize, models, migrations, controller, schema } = require('../../src/BedyContext');
const { before, after, describe, it } = require('mocha');
const { BOT_GuildsController } = controller;

// const { v4: uuidv4 } = require('uuid');

const { beforeCheckState, afterCheckState, resetState } = require('../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../src/services/TestService');


describe('01.00 - BOT_GuildsController', () => {

    // Declare const
    const guildId = generateUnsignedBigInt64(); // uuidv4();
    const ownerId = generateUnsignedBigInt64();
    const initialGuildName = 'Guild Test';
    const newGuildName = 'Guild BedyBot';
    const newOwnerId = generateUnsignedBigInt64();
    const unModifiedGuidId = generateUnsignedBigInt64();
    const UnModifiedGuildName = 'Unmodified';


    before(async () => {
        console.log('============== Setup (Before on GuildController) ==============');
        await beforeCheckState();
        // await sequelize.drop(); // Supprimez les tables de la base de données
    });

    after(async () => {
        console.log('============== Setup (After on GuildController) ==============');
        resetState();
        await afterCheckState();
        // await sequelize.drop(); // Supprimez les tables de la base de données
    });


    context('1.0 - without data', () => {
        it('should be empty - Try to get all actives guilds', async () => {
            const allActiveGuilds = await BOT_GuildsController.getAllActiveGuilds();
            console.log(`Nb Active Guild : ${allActiveGuilds == null ? null : allActiveGuilds.length}`);

            expect(allActiveGuilds).to.be.an('array');
            expect(allActiveGuilds).to.be.empty;
        });

        it('should be empty - Try to get all guilds', async () => {
            const allGuilds = await BOT_GuildsController.getAllGuilds();

            expect(allGuilds).to.be.an('array');
            expect(allGuilds).to.be.empty;
        });
    }); // Context Without Data

    context('1.1 - valid CRUD action', () => {

        it('should create a new guild', async () => {
            const createdGuild = await BOT_GuildsController.createGuild(guildId, initialGuildName, ownerId);

            expect(createdGuild).to.be.an('object');
            expect(createdGuild.guildOwnerId).to.equal(ownerId);
            expect(createdGuild.guildId).to.equal(guildId);
            expect(createdGuild.guildName).to.equal(initialGuildName);
        });

        it('should create and delete a guild', async () => {
            const lGuildId = generateUnsignedBigInt64();
            const aGuild = await BOT_GuildsController.createGuild(lGuildId, initialGuildName, ownerId);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(initialGuildName);

            await BOT_GuildsController.deleteGuild(lGuildId);
        });

        it('should update the guild name for a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(initialGuildName);

            const updatedGuild = await BOT_GuildsController.updateGuild(guildId, newGuildName, null);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(ownerId);
            expect(BigInt(updatedGuild.guildId)).to.equal(guildId);
            expect(updatedGuild.guildName).to.equal(newGuildName);
        });

        it('should return the guild unchanged, as no value has been modified. (unmodified)', async () => {
            const aGuild = await BOT_GuildsController.createGuild(unModifiedGuidId, UnModifiedGuildName, ownerId, null, null, null, null, true);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(UnModifiedGuildName);

            let updatedGuild = await BOT_GuildsController.updateGuild(unModifiedGuidId, UnModifiedGuildName, null);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(ownerId);
            expect(BigInt(updatedGuild.guildId)).to.equal(unModifiedGuidId);
            expect(updatedGuild.guildName).to.equal(UnModifiedGuildName);

            updatedGuild = await BOT_GuildsController.updateGuildStatut(unModifiedGuidId, false);
            expect(updatedGuild.isActive).to.equal(false);
        });

        it('should get Guild for a existing guild with include BOT_GuildOptions', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(unModifiedGuidId, [models.BOT_GuildOptions]);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(UnModifiedGuildName);
            expect(aGuild.BOT_GuildOption).not.equal(null);
        });

        it('should update the guild owner for a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(guildId);
            expect(aGuild).to.be.an('object');
            expect(BigInt(aGuild.guildOwnerId)).to.equal(ownerId);

            const updatedGuild = await BOT_GuildsController.updateGuild(guildId, null, newOwnerId);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(newOwnerId);
        });

        it('should update the optional guild field for a existing guild', async () => {
            const updatedGuild = await BOT_GuildsController.updateGuild(guildId, null, null, 'na', 'fr', '1', '2');

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.guildRegion).to.equal('na');
            expect(updatedGuild.guildPreferredLocale).to.equal('fr');
            expect(updatedGuild.guildIconUrl).to.equal('1');
            expect(updatedGuild.guildBannerUrl).to.equal('2');
        });

        it('should be disabled a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.isActive).to.equal(true);

            const updatedGuild = await BOT_GuildsController.updateGuildStatut(guildId, false);

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.isActive).to.equal(false);
            expect(updatedGuild.leftAt).not.equal(null);
        });

        it('should be active a disabled existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.isActive).to.equal(false);

            const updatedGuild = await BOT_GuildsController.updateGuildStatut(guildId, true);

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.isActive).to.equal(true);
            expect(updatedGuild.leftAt).to.equal(null); // .to.be.null();
        });

        it('should be not empty - Get all actives guilds', async () => {
            const allActiveGuilds = await BOT_GuildsController.getAllActiveGuilds([models.BOT_GuildOptions]);

            expect(allActiveGuilds).to.be.an('array');
            expect(allActiveGuilds).to.be.not.empty;
        });

        it('should be not empty - Get all guilds', async () => {
            const allGuilds = await BOT_GuildsController.getAllGuilds([models.BOT_GuildOptions]);

            expect(allGuilds).to.be.an('array');
            expect(allGuilds).to.be.not.empty;
            expect(allGuilds).to.have.length(2);
        });


    }) // Context (CRUD Action)

    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid guild id', async () => {
            try {
                await BOT_GuildsController.updateGuild(generateUnsignedBigInt64(), 'test', null);
                assert.fail('Error !  BOT_GuildsController.updateGuild has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update guid statut for a invalid guild id', async () => {
            try {
                await BOT_GuildsController.updateGuildStatut(generateUnsignedBigInt64(), false);
                assert.fail('Error !  BOT_GuildsController.updateGuildStatut has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should be a exception - Delete a guild we don\' exists.', async () => {
            try {
                const rndGuid = generateUnsignedBigInt64();
                await BOT_GuildsController.deleteGuild(rndGuid);
                assert.fail('Error ! BOT_GuildsController.deleteGuild() has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });
    });

}); // first describe



// TODO : Put this in a Services
// function generateUnsignedBigInt64() {
//     const maxUint64 = BigInt('18446744073709551615'); // 2^64 - 1
//     const randomUint64 = BigInt(Math.floor(Math.random() * Number(maxUint64)));
//     return randomUint64;
// }
