const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)
// const { v4: uuidv4 } = require('uuid');

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { BedyAPIConst } = require('../../../src/BedyAPIConst');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { RIOT_ConfigController } = controller;

describe('01.02 - RIOT_ConfigController', () => {

    // Const
    const configId = 1; // uuidv4();
    const newConfigId = 11; // ConfigInitialization 
    const invalidConfigId = 999;

    // Hook
    before(async () => {
        console.log('============== Setup (Before on RIOT_Config) ==============');
        await PrepareData.ConfigInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on RIOT_Config) ==============');
        await ResetData.CleanAllNewConfig();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should create a new config', async () => {
            const createdConfig = await RIOT_ConfigController.createConfig(null, BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);

            expect(createdConfig).to.be.an('object');
            expect(createdConfig.seasonId).to.equal(BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);
        });

        it('should create a new config, with specific ID', async () => {
            const createdConfig = await RIOT_ConfigController.createConfig(newConfigId, BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);

            expect(createdConfig).to.be.an('object');
            expect(createdConfig.seasonId).to.equal(BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);
        });

        it('should get a existing Config', async () => {
            const aConfig = await RIOT_ConfigController.getConfigById(configId);

            expect(aConfig).to.be.an('object');
            expect(aConfig.id).to.equal(configId);
            expect(aConfig.seasonId).to.equal(BedyAPIConst.LeagueOfLegendSeasons.S2024.Split1);
        });

        it('should update the seasonId for a existing guild', async () => {
            const aConfig = await RIOT_ConfigController.getConfigById(PrepareData.tmpConfigId);
            expect(aConfig).to.be.an('object');
            expect(aConfig.seasonId).to.equal(BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);

            const updatedConfig = await RIOT_ConfigController.updateConfig(PrepareData.tmpConfigId, BedyAPIConst.LeagueOfLegendSeasons.S2024.Split3);
            expect(updatedConfig).to.be.an('object');
            expect(updatedConfig.seasonId).to.equal(BedyAPIConst.LeagueOfLegendSeasons.S2024.Split3);
            expect(updatedConfig.seasonId).not.be.equal(aConfig.seasonId);
        });


    }); // End context « Crud Action »

    context('1.2 - error action', () => {

        it('should throw a exception for get a invalid config id', async () => {
            try {
                await RIOT_ConfigController.getConfigById(invalidConfigId);

                assert.fail('Error !  RIOT_ConfigController.getConfigById has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for update a invalid config id', async () => {
            try {
                await RIOT_ConfigController.updateConfig(invalidConfigId, BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);

                assert.fail('Error !  RIOT_ConfigController.updateConfig has\' return a error.');
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