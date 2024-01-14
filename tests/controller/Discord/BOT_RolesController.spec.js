const { before, after, describe, it } = require('mocha');
const { assert, expect } = require('chai'); // Utilisez l'assertion de votre choix (par exemple, Chai)

const InvalidEntityException = require('../../../src/declarations/InvalidEntityException');
const { PrepareData, ResetData } = require('../../mocha-setup');
const { generateUnsignedBigInt64 } = require('../../../src/services/TestService');

/* eslint-disable-next-line no-unused-vars */
const { models, controller } = require('../../../src/BedyContext');
const { BOT_UsersController, BOT_RolesController } = controller;

describe('01.03.00 - BOT_RolesController', () => {
    // Const


    // Hook
    before(async () => {
        console.log('============== Setup (Before on BOT_RolesController) ==============');
        await ResetData.CleanAllGuilds();

        await PrepareData.GuildInitialization();
        await PrepareData.RoleInitialization();
        await PrepareData.UserInitialization();
    });

    after(async () => {
        console.log('============== Setup (After on BOT_RolesController) ==============');
        await ResetData.CleanAllUsers();
        await ResetData.CleanAllGuilds();
    });

    context('1.0 - without data', () => {
        it('should contains 1 elements - get all existing roles for a guild, without include guild', async () => {
            const allEntities = await BOT_RolesController.getAllRolesByGuildId(PrepareData.guildId, false);

            expect(allEntities).to.be.an('array');
            expect(allEntities).to.have.lengthOf(1);
            expect(allEntities[0].BOT_Guild).to.be.undefined;
        });

        it('should contains 1 elements - get all existing roles for a guild, including guild', async () => {
            const allEntities = await BOT_RolesController.getAllRolesByGuildId(PrepareData.guildId, true);

            expect(allEntities).to.be.an('array');
            expect(allEntities).to.have.lengthOf(1);
            expect(allEntities[0].BOT_Guild).not.to.be.undefined;
        });

    }); //  End context « without data »

    context('1.1 - valid CRUD action', () => {
        it('should create a new role', async () => {
            const aEntity = await BOT_RolesController.createRoleOnDB(PrepareData.guildId, PrepareData.tmpRoleId, PrepareData.tmpRoleName, 8, '94945', 1, 2);

            expect(aEntity).to.be.an('object');
            expect(BigInt(aEntity.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aEntity.roleId)).to.equal(PrepareData.tmpRoleId);
            expect(aEntity.roleName).to.equal(PrepareData.tmpRoleName);
            expect(aEntity.rolePermission).to.equal(8);
            expect(aEntity.roleColor).to.equal('94945');
            expect(aEntity.type).to.equal(1);
            expect(aEntity.rolePosition).to.equal(2);
        });

        it('should get a existing roles, without including guild', async () => {
            const aEntity = await BOT_RolesController.getRolesById(PrepareData.roleId, false);
            expect(aEntity).to.be.an('object');
            expect(BigInt(aEntity.roleId)).to.equal(PrepareData.roleId);
            expect(aEntity.BOT_Guild).to.be.undefined;
        });

        it('should get a existing roles, including guild', async () => {
            const aEntity = await BOT_RolesController.getRolesById(PrepareData.roleId, true);
            expect(aEntity).to.be.an('object');
            expect(BigInt(aEntity.roleId)).to.equal(PrepareData.roleId);
            expect(aEntity.BOT_Guild).not.to.be.undefined;
        });

        it('should update a role, without change entity', async () => {
            // updateRole(roleId, roleName = null, permission = null, color = null, type = null, position = null)
            const aEntity = await BOT_RolesController.updateRole(PrepareData.tmpRoleId, PrepareData.tmpRoleName, 8, '94945', 1, 2);

            expect(aEntity).to.be.an('object');
            expect(BigInt(aEntity.roleId)).to.equal(PrepareData.tmpRoleId);
            expect(BigInt(aEntity.guildId)).to.equal(PrepareData.guildId);
        });

        it('should update a role', async () => {
            const aEntity = await BOT_RolesController.updateRole(PrepareData.tmpRoleId, 'new NAME', 4, '99111', 2, 3);

            expect(aEntity).to.be.an('object');
            expect(BigInt(aEntity.guildId)).to.equal(PrepareData.guildId);
            expect(BigInt(aEntity.roleId)).to.equal(PrepareData.tmpRoleId);
            expect(aEntity.roleName).to.equal('new NAME');
            expect(aEntity.rolePermission).to.equal(4);
            expect(aEntity.roleColor).to.equal('99111');
            expect(aEntity.type).to.equal(2);
            expect(aEntity.rolePosition).to.equal(3);
        });

        it('should delete a role', async () => {
            await BOT_RolesController.deleteRole(PrepareData.tmpRoleId);
            const aEntity = await BOT_RolesController.getRolesById(PrepareData.tmpRoleId, false);
            expect(aEntity).to.be.null;
        });

    }); // End context « Crud Action »

    context('1.2 - error action', () => {
        it('should throw a exception for update a invalid role', async () => {
            try {
                await await BOT_RolesController.updateRole(generateUnsignedBigInt64(), PrepareData.tmpRoleName, 8, '94945', 1, 2);
                assert.fail('Error ! BOT_RolesController.updateRole has\' return a error.');
            } catch (error) {
                if (error instanceof InvalidEntityException) {
                    assert.ok(error);
                } else {
                    assert.fail('Invalid exception');
                }
            }
        });

        it('should throw a exception for delete a invalid role', async () => {
            try {
                await BOT_RolesController.deleteRole(generateUnsignedBigInt64());
                assert.fail('Error ! BOT_RolesController.deleteRole has\' return a error.');
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