const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_GuildsController } = controller;


describe('01.00.00 - BOT_GuildsController', () => {

    // Declare const
    const newGuildName = 'Guild BedyBot';
    const newOwnerId = generateUnsignedBigInt64();
    const unModifiedGuidId = generateUnsignedBigInt64();
    const UnModifiedGuildName = 'Unmodified';


    before(async () => {
        console.log('============== Setup (Before on BOT_GuildsController) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_GuildsController) ==============');
        await ResetData.CleanAllGuilds();
    });

    /* eslint-disable-next-line no-undef */
    context('1.0 - without data', () => {
        it('should contains 2 elements - Try to get all actives guilds', async () => {
            const allActiveGuilds = await BOT_GuildsController.getAllActiveGuilds();

            expect(allActiveGuilds).to.be.an('array');
            expect(allActiveGuilds).to.have.lengthOf(2);
        });

        it('should contains 2 elements - Try to get all guilds', async () => {
            const allGuilds = await BOT_GuildsController.getAllGuilds();
            console.log('1.1 : ', allGuilds.length);

            expect(allGuilds).to.be.an('array');
            expect(allGuilds).to.have.lengthOf(2);
        });
    }); // Context Without Data

    /* eslint-disable-next-line no-undef */
    context('1.1 - valid CRUD action', () => {

        it('should create a new guild', async () => {
            const newGuildId = generateUnsignedBigInt64();
            const createdGuild = await BOT_GuildsController.createGuild(newGuildId, PrepareData.guildName, PrepareData.guildOwnerId);

            expect(createdGuild).to.be.an('object');
            expect(createdGuild.guildOwnerId).to.equal(PrepareData.guildOwnerId);
            expect(createdGuild.guildId).to.equal(newGuildId);
            expect(createdGuild.guildName).to.equal(PrepareData.guildName);
        });

        it('should create and delete a guild', async () => {
            const lGuildId = generateUnsignedBigInt64();
            const aGuild = await BOT_GuildsController.createGuild(lGuildId, PrepareData.guildName, PrepareData.guildOwnerId);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(PrepareData.guildName);

            await BOT_GuildsController.deleteGuild(lGuildId);
        });

        it('should update the guild name for a existing guild, with updateGuild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(PrepareData.guildName);

            const updatedGuild = await BOT_GuildsController.updateGuild(PrepareData.guildId, newGuildName, null);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(PrepareData.guildOwnerId);
            expect(BigInt(updatedGuild.guildId)).to.equal(PrepareData.guildId);
            expect(updatedGuild.guildName).to.equal(newGuildName);
        });

        it('should return the guild unchanged, as no value has been modified. (unmodified)', async () => {
            const aGuild = await BOT_GuildsController.createGuild(unModifiedGuidId, UnModifiedGuildName, PrepareData.guildOwnerId, null, null, null, true, true);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(UnModifiedGuildName);

            const updatedGuild = await BOT_GuildsController.updateGuild(unModifiedGuidId, UnModifiedGuildName, null);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(PrepareData.guildOwnerId);
            expect(BigInt(updatedGuild.guildId)).to.equal(unModifiedGuidId);
            expect(updatedGuild.guildName).to.equal(UnModifiedGuildName);
        });

        it('should get Guild for a existing guild with include BOT_GuildOptions', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(unModifiedGuidId, [models.BOT_GuildOptions]);

            expect(aGuild).to.be.an('object');
            expect(aGuild.guildName).to.equal(UnModifiedGuildName);
            expect(aGuild.BOT_GuildOption).not.equal(null);
        });

        it('should update the guild owner for a existing guild, with updateGuild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');
            expect(BigInt(aGuild.guildOwnerId)).to.equal(PrepareData.guildOwnerId);

            const updatedGuild = await BOT_GuildsController.updateGuild(PrepareData.guildId, null, newOwnerId);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(newOwnerId);
        });

        it('should update the optional guild field for a existing guild', async () => {
            const updatedGuild = await BOT_GuildsController.updateGuild(PrepareData.guildId, null, newOwnerId, 'fr', '1', '2');

            expect(updatedGuild).to.be.an('object');
            // expect(updatedGuild.guildRegion).to.equal('na');
            expect(updatedGuild.guildPreferredLocale).to.equal('fr');
            expect(updatedGuild.guildIconUrl).to.equal('1');
            expect(updatedGuild.guildBannerUrl).to.equal('2');
        });

        it('should update the guild name for a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');

            const updatedGuild = await BOT_GuildsController.updateGuildName(aGuild, 'New Guild Name');

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.guildName).to.equal('New Guild Name');
        });

        it('should return the guild unmodified, without modifying the guild name. (unmodified)', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');

            const updatedGuild = await BOT_GuildsController.updateGuildName(aGuild, null);

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.guildName).to.equal(aGuild.guildName);
        });

        it('should return the guild unmodified, without modifying the guild owner. (unmodified)', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');

            const updatedGuild = await BOT_GuildsController.updateGuildOwner(aGuild, null);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(newOwnerId);
        });

        it('should update the guild owner for a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');

            const updatedGuild = await BOT_GuildsController.updateGuildOwner(aGuild, PrepareData.guildOwnerId);

            expect(updatedGuild).to.be.an('object');
            expect(BigInt(updatedGuild.guildOwnerId)).to.equal(PrepareData.guildOwnerId);
        });

        it('should be disabled a existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.isActive).to.equal(true);

            // True to False
            const updatedGuild = await BOT_GuildsController.updateGuildStatut(PrepareData.guildId, false);

            expect(updatedGuild).to.be.an('object');
            expect(updatedGuild.isActive).to.equal(false);
            expect(updatedGuild.leftAt).not.equal(null);
        });

        it('should be active a disabled existing guild', async () => {
            const aGuild = await BOT_GuildsController.getGuildByGuildId(PrepareData.guildId);
            expect(aGuild).to.be.an('object');
            expect(aGuild.isActive).to.equal(false);

            // False to True
            const updatedGuild = await BOT_GuildsController.updateGuildStatut(PrepareData.guildId, true);

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
            // expect(allGuilds).to.have.length(2);
        });


    }); // Context (CRUD Action)

    /* eslint-disable-next-line no-undef */
    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid guild', async () => {
            try {
                await BOT_GuildsController.updateGuild(generateUnsignedBigInt64(), 'test', null);
                assert.fail('Error !  BOT_GuildsController.updateGuild hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.INVALID_PK);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update the status of a invalid guildId', async () => {
            try {
                await BOT_GuildsController.updateGuildStatut(generateUnsignedBigInt64(), false);
                assert.fail('Error ! BOT_GuildsController.updateGuildStatut() hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.NULL_ENTITY);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update the name of a invalid guild id', async () => {
            try {
                await BOT_GuildsController.updateGuildName(generateUnsignedBigInt64(), 'BigInt Guild');
                assert.fail('Error ! BOT_GuildsController.updateGuildName() hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update the name of a null guild entity', async () => {
            try {
                await BOT_GuildsController.updateGuildName(null, 'Null Guild');
                assert.fail('Error ! BOT_GuildsController.updateGuildName() hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.NULL_ENTITY);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update the owner of a null guild entity', async () => {
            try {
                await BOT_GuildsController.updateGuildOwner(null, generateUnsignedBigInt64());
                assert.fail('Error ! BOT_GuildsController.updateGuildOwner() hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.NULL_ENTITY);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update the owner of a invalid guild id', async () => {
            try {
                await BOT_GuildsController.updateGuildOwner(generateUnsignedBigInt64(), generateUnsignedBigInt64());
                assert.fail('Error ! BOT_GuildsController.updateGuildOwner() hasn\'t return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for delete a invalid guild', async () => {
            try {
                const rndGuid = generateUnsignedBigInt64();
                await BOT_GuildsController.deleteGuild(rndGuid);
                assert.fail('Error ! BOT_GuildsController.deleteGuild() has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                    expect(error.errorType).to.equal(InvalidEntityException.ErrorType.INVALID_PK);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });
    });

}); // first describe
