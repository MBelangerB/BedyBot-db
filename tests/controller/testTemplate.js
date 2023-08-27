const { assert, expect } = require('chai');
const InvalidEntityException = require('../../src/declarations/InvalidEntityException');

/* eslint-disable-next-line no-unused-vars */
const { sequelize, models, migrations, controller, schema } = require('../../src/BedyContext');
const { before, after, describe, it } = require('mocha');

const { BOT_UsersController } = controller;

const { beforeCheckState, afterCheckState, resetState } = require('../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../src/services/TestService');

describe('01.02 - BOT_UsersController', () => {
    // Const


    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_UsersController) ==============');
        await beforeCheckState();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_UsersController) ==============');
        resetState();
        await afterCheckState();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {

    }); // End context « Crud Action »

    context('1.2 - error action', () => {

    }); // End context « error action »

});