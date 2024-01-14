const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

// const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
// const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { API_ModulesController } = controller;

describe('04.01.01 - API_ModulesController', () => {
    // Const


    // Hook
    before(async () => {
        console.log('============== Setup (Before on API_ModulesController) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on API_ModulesController) ==============');
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should get all active modules, without includes', async () => {
            const aEntities = await API_ModulesController.GetAllModules();

            expect(aEntities).to.be.an('array');
            expect(aEntities).not.to.be.empty;
        });

        it('should get all active modules, with includes', async () => {
            const aEntities = await API_ModulesController.GetAllModules([models.API_Commands, models.API_GuildModules]);

            expect(aEntities).to.be.an('array');
            expect(aEntities).not.to.be.empty;
            expect(aEntities[0].API_Commands).to.be.an('array');
            expect(aEntities[0].API_GuildModules).to.be.an('array'); // not.to.be.undefined;
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {

    }); // End context « error action »

});