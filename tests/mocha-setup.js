// Config environnement
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'bedybot_mochaTest';

// Requirement
const { BedyAPIConst } = require('../src/BedyAPIConst');
const { generateUnsignedBigInt64 } = require('../src/services/TestService');
const { models, controller } = require('../src/BedyContext');
const { Op } = require('sequelize');

const { BOT_GuildsController, BOT_UsersController, BOT_ChannelsController, BOT_UsersDetailsController,
        BOT_GuildUsersController, BOT_RolesController, RIOT_ConfigController } = controller;
const { MOD_Notifications, BOT_Guilds, BOT_Users, BOT_Channels, BOT_Roles } = models;
const { RIOT_Config } = models;

class PrepareData {
    static guildId = null;
    static guildName = 'Guild Test';
    static guildOwnerId = null;

    static userID = null;
    static username = 'TestUser';
    static globalUsername = 'Usager Test';
    static guildUsername = 'GuildTest UserTest';

    static tmpGuildId = null;
    static tmpGuildName = 'Tmp Test Guild';

    static channelId = null;
    static channelName = 'My channel';

    static channelCategoryId = null;
    static channelCategoryName = 'My Category';

    static roleId = null;
    static roleName = 'Test Role';

    static tmpRoleId = null;
    static tmpRoleName = 'Tmp RoleName';

    // Riot
    static tmpConfigId = 2;

    static initialize() {
        if (!this.guildId) {
            this.guildId = generateUnsignedBigInt64();
        }

        if (!this.guildOwnerId) {
            this.guildOwnerId = generateUnsignedBigInt64();
        }

        if (!this.userID) {
            this.userID = generateUnsignedBigInt64();
        }

        if (!this.tmpGuildId) {
            this.tmpGuildId = generateUnsignedBigInt64();
        }

        if (!this.channelId) {
            this.channelId = generateUnsignedBigInt64();
        }

        if (!this.channelCategoryId) {
            this.channelCategoryId = generateUnsignedBigInt64();
        }

        if (!this.roleId) {
            this.roleId = generateUnsignedBigInt64();
        }

        if (!this.tmpRoleId) {
            this.tmpRoleId = generateUnsignedBigInt64();
        }
    }

    /**
     * Create guild for test
     */
    static async GuildInitialization(guildIsEnabled) {
        this.initialize();

        await BOT_GuildsController.createGuild(this.guildId, this.guildName, this.guildOwnerId, null, null, null, guildIsEnabled, false);
        await BOT_GuildsController.createGuild(this.tmpGuildId, this.tmpGuildName, this.guildOwnerId, null, null, null, guildIsEnabled, true);
    }

    /**
     * Create guild channel for test
     */
    static async GuildChannelInitialization() {
        this.initialize();
        await BOT_ChannelsController.createGuildChannel(this.guildId, this.channelId, this.channelName, BedyAPIConst.DiscordChannelTypes.GUILD_TEXT);

        await BOT_ChannelsController.createGuildChannel(this.guildId, this.channelCategoryId, this.channelCategoryName, BedyAPIConst.DiscordChannelTypes.GUILD_CATEGORY);

    }

    /**
     * Create user for test
     */
    static async UserInitialization(userDetail = false, guildUser = false) {
        this.initialize();
        await BOT_UsersController.createNewUser(this.userID, this.username, this.globalUsername, null, null, null, null, null);

        if (userDetail) {
            await BOT_UsersDetailsController.initializeUserDetails(this.userID);
        }
        if (guildUser) {
            await BOT_GuildUsersController.initializeGuildUser(this.guildId, this.userID, this.guildUsername, null);
        }
    }

    static async RoleInitialization() {
        this.initialize();

        await BOT_RolesController.createRoleOnDB(this.guildId, this.roleId, this.roleName, '1', '94945', null, 8);
    }

    static async ConfigInitialization() {
        await RIOT_ConfigController.createConfig(this.tmpConfigId, BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2);
    }

}

class ResetData {

    static async CleanAllNotifications() {
        await MOD_Notifications.findAll()
            .then(async (notifications) => {
                if (notifications.length === 0) {
                    console.log('No notification records to delete');
                    return;
                }
                return await MOD_Notifications.destroy({ truncate: true });
            })
            .then(() => {
                console.log('All records notifications deleted');
            })
            .catch((err) => {
                console.error(err);
            });

    }

    static async CleanAllGuilds() {
        await BOT_Guilds.destroy({
            where: {},
            include: [models.BOT_GuildOptions, models.MOD_Notifications, models.BOT_Channels,
                     models.BOT_Users, models.BOT_GuildUser, models.BOT_Roles],
        }).then(() => {
                console.log('All guilds records deleted');
            }).catch((err) => {
                console.error(err);
            });
    }

    static async CleanAllUsers() {
        await BOT_Users.destroy({
            where: {},
            include: [ models.BOT_UserDetails, models.BOT_GuildUser],
        }).then(() => {
                console.log('All users records deleted');
            }).catch((err) => {
                console.error(err);
            });
    }

    static async CleanAllChannels() {
        await BOT_Channels.destroy({
            where: {},
            include: [models.MOD_Notifications, models.BOT_Guilds],
        })
            .then(() => {
                console.log('All channels records deleted');
            })
            .catch(err => console.error(err));
    }

    static async CleanAllRoles() {
        await BOT_Roles.destroy({
            where: {},
            // include: [ models.BOT_UserDetails, models.BOT_GuildUser],
        }).then(() => {
                console.log('All roles records deleted');
            }).catch((err) => {
                console.error(err);
            });
    }

    static async CleannAllNewConfig() {
        await RIOT_Config.destroy({
            where: {
                id: { [Op.ne] : 1 },
            },
        }).then(() => {
                console.log('All new config records deleted');
            }).catch((err) => {
                console.error(err);
            });

        // Restore initial value
        // const aConfig = await context.models.RIOT_Config.findOne({ where: { id: 1 } });
        // if (aConfig) {
        //     aConfig.set({
        //         seasonId: BedyAPIConst.LeagueOfLegendSeasons.S2024.Split1,
        //     });
        //     await aConfig.save();
        // }

    }

}

// console.log(`TZ : ${process.env.TZ}`);

module.exports = {
    PrepareData,
    ResetData,
};
