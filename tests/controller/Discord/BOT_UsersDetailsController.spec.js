const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { controller } = require('../../../src/BedyContext');
const { BOT_UsersDetailsController } = controller;

describe('01.02 - BOT_UsersDetailsController', () => {
    // Const
    const SwitchFriendCode = '2023-0914-1652';
    const SwitchUsername = 'Switch TestUser';
    const TwitchUsername = 'Twitch TestUser';

    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_UsersDetailsController) ==============');
        await ResetData.CleanAllGuilds();
        await PrepareData.GuildInitialization();
        await PrepareData.UserInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_UsersDetailsController) ==============');
        await ResetData.CleanAllUsers();
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should initialize the user details for a existing user', async () => {
            const userDetail = await BOT_UsersDetailsController.initializeUserDetails(PrepareData.userID);

            expect(userDetail).to.be.an('object');
            expect(BigInt(userDetail.userId)).to.equal(PrepareData.userID);
        });

        it('should update the user details for a existing user', async () => {
            const updateUserDetails = await BOT_UsersDetailsController.updateUserDetails(PrepareData.userID, SwitchFriendCode, SwitchUsername, TwitchUsername);

            expect(updateUserDetails).to.be.an('object');
            expect(updateUserDetails.switchFriendCode).to.equal(SwitchFriendCode);
            expect(updateUserDetails.switchUsername).to.equal(SwitchUsername);
            expect(updateUserDetails.twitchUsername).to.equal(TwitchUsername);
        });

        it('should trying to update a user details, wihtout changing', async () => {
            const updateUserDetails = await BOT_UsersDetailsController.updateUserDetails(PrepareData.userID, SwitchFriendCode, SwitchUsername, TwitchUsername);

            expect(updateUserDetails).to.be.an('object');
            expect(updateUserDetails.switchFriendCode).to.equal(SwitchFriendCode);
            expect(updateUserDetails.switchUsername).to.equal(SwitchUsername);
            expect(updateUserDetails.twitchUsername).to.equal(TwitchUsername);
        });

        it('should get a user details for a existing user, without include User', async () => {
            const userDetail = await BOT_UsersDetailsController.getUserDetailsByUserId(PrepareData.userID, false);

            expect(userDetail).to.be.an('object');
            expect(BigInt(userDetail.userId)).to.equal(PrepareData.userID);
            expect(userDetail.switchFriendCode).to.equal(SwitchFriendCode);
            expect(userDetail.switchUsername).to.equal(SwitchUsername);
            expect(userDetail.twitchUsername).to.equal(TwitchUsername);
            expect(userDetail.BOT_User).not.to.be.undefined;
        });

        it('should get a user details for a existing user, without include User', async () => {
            const userDetail = await BOT_UsersDetailsController.getUserDetailsByUserId(PrepareData.userID, true);

            expect(userDetail).to.be.an('object');
            expect(BigInt(userDetail.userId)).to.equal(PrepareData.userID);
            expect(userDetail.switchFriendCode).to.equal(SwitchFriendCode);
            expect(userDetail.switchUsername).to.equal(SwitchUsername);
            expect(userDetail.twitchUsername).to.equal(TwitchUsername);
            expect(userDetail.BOT_User).to.be.undefined;
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid user details', async () => {
            try {
                await BOT_UsersDetailsController.updateUserDetails(generateUnsignedBigInt64(), SwitchFriendCode, SwitchUsername, TwitchUsername);
                assert.fail('Error !  BOT_UsersDetailsController.updateUserDetails has\' return a error.');
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