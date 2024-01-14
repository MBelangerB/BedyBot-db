const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_UsersController } = controller;

describe('01.02 - BOT_UsersController', () => {
    // Const


    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_XYZ) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
        await PrepareData.UserInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_XYZ) ==============');
        await ResetData.CleanAllUsers();
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {

    }); // End context « Crud Action »

    context('1.2 - error action', () => {

    }); // End context « error action »

});