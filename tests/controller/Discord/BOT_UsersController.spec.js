const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { beforeCheckState, afterCheckState, resetState } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_UsersController } = controller;

describe('01.02 - BOT_UsersController', () => {
    // Const
    const userId = generateUnsignedBigInt64();
    const username = 'TestUser';
    const newUsername = 'TestUser2';
    const globalUsername = 'Global test user';
    const testEmail = 'test-email@localhost.com';

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

    /* eslint-disable-next-line no-undef */
    context('1.0 - without data', () => {
        it('should be empty - Try to get all actives users', async () => {
            const allUsers = await BOT_UsersController.getAllUsers();

            expect(allUsers).to.be.an('array');
            expect(allUsers).to.be.empty;
        });

        it('should be empty - Try to get all actives users with includes', async () => {
            const allUsers = await BOT_UsersController.getAllUsers([models.BOT_UserDetails]);

            expect(allUsers).to.be.an('array');
            expect(allUsers).to.be.empty;
        });

        it('should get null data', async () => {
            const aUser = await BOT_UsersController.getUserByUserId(generateUnsignedBigInt64());
            expect(aUser).to.be.null;
        });

    }); // End wihtout data Context

    /* eslint-disable-next-line no-undef */
    context('1.1 - valid CRUD action', () => {
        it('should create a new user', async () => {
            const createdUser = await BOT_UsersController.createNewUser(userId, username);

            expect(createdUser).to.be.an('object');
            expect(createdUser.username).to.equal(username);
            expect(BigInt(createdUser.userId)).to.equal(userId);
        });

        it('should get a existing user', async () => {
            const aUser = await BOT_UsersController.getUserByUserId(userId, [models.BOT_UserDetails]);
            expect(aUser).to.be.an('object');
            expect(BigInt(aUser.userId)).to.equal(userId);
        });

        it('should update the optional user field for a existing user', async () => {
            const aUser = await BOT_UsersController.getUserByUserId(userId);
            expect(aUser).to.be.an('object');

            const updatedUser = await BOT_UsersController.updateUser(aUser, userId, newUsername, globalUsername, '1234', testEmail, 'avatar.png',
                'banner.png', 2463422);

            expect(updatedUser).to.be.an('object');
            expect(updatedUser.username).to.equal(newUsername);
            expect(updatedUser.globalUsername).to.equal(globalUsername);
            expect(updatedUser.email).to.equal(testEmail);
            expect(updatedUser.avatar).to.equal('avatar.png');
            expect(updatedUser.banner).to.equal('banner.png');
            expect(updatedUser.accentColor).to.equal(2463422);
        });

        it('should return a unchanged user', async () => {
            const updatedUser = await BOT_UsersController.updateUser(null, userId, newUsername, globalUsername, '1234', testEmail, 'avatar.png',
            'banner.png', 2463422);

            expect(updatedUser).to.be.an('object');
            expect(updatedUser).not.to.be.null;
            expect(updatedUser.username).to.equal(newUsername);
            expect(updatedUser.globalUsername).to.equal(globalUsername);
            expect(updatedUser.email).to.equal(testEmail);
            expect(updatedUser.avatar).to.equal('avatar.png');
            expect(updatedUser.banner).to.equal('banner.png');
            expect(updatedUser.accentColor).to.equal(2463422);
        });

        it('should create and delete a guild', async () => {
            const rndGuid = generateUnsignedBigInt64();
            const createdUser = await BOT_UsersController.createNewUser(rndGuid, username);

            expect(createdUser).to.be.an('object');
            expect(createdUser.username).to.equal(username);

            await BOT_UsersController.deleteUser(rndGuid);
        });
    });

    /* eslint-disable-next-line no-undef */
    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid user', async () => {
            try {
                await BOT_UsersController.updateUser(null, generateUnsignedBigInt64(), 'TestUser');
                assert.fail('Error !  BOT_UsersController.updateUser has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for delete a user who don\' exists.', async () => {
            try {
                const rndGuid = generateUnsignedBigInt64();
                await BOT_UsersController.deleteUser(rndGuid);
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

    });

});