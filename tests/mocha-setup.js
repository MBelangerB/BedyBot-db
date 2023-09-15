// Config environnement
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'bedybot_mochaTest';

// Requirement
const { BedyAPIConst } = require('../src/BedyAPIConst');
const { generateUnsignedBigInt64 } = require('../src/services/TestService');
const { models, controller } = require('../src/BedyContext');
const { BOT_GuildsController, BOT_UsersController, BOT_ChannelsController, BOT_UsersDetailsController, BOT_GuildUsersController } = controller;
const { MOD_Notifications, BOT_Guilds, BOT_GuildOptions, BOT_Users, BOT_Channels, BOT_UserDetails, BOT_GuildUser } = models;

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
    }

    /**
     * Create guild for test
     */
    static async GuildInitialization(guildIsEnabled, createGuildChannel = false) {;
        this.initialize();

        await BOT_GuildsController.createGuild(this.guildId, this.guildName, this.guildOwnerId, null, null, null, null, guildIsEnabled, false);
        await BOT_GuildsController.createGuild(this.tmpGuildId, this.tmpGuildName, this.guildOwnerId, null, null, null, null, guildIsEnabled, true);
    
        // if (createGuildChannel) {
        //     await this.GuildChannelInitialization();
        // }
    };

    /**
     * Create guild channel for test
     */
    static async GuildChannelInitialization() {
        this.initialize();
        await BOT_ChannelsController.createGuildChannel(this.guildId, this.channelId, this.channelName, BedyAPIConst.DiscordChannelTypes.GUILD_TEXT);
   
        await BOT_ChannelsController.createGuildChannel(this.guildId, this.channelCategoryId, this.channelCategoryName, BedyAPIConst.DiscordChannelTypes.GUILD_CATEGORY);
 
    };

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
            await BOT_GuildUsersController.initGuildUser(this.guildId, this.userID, guildUsername, null);      
        }    
    };

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

    };

    static async CleanAllGuilds() {
        await BOT_Guilds.destroy({
            where: {},
            include: [models.BOT_GuildOptions, models.MOD_Notifications, models.BOT_Channels, models.BOT_Users, models.BOT_GuildUser],
        }).then(() => {
                console.log('All guilds records deleted');
            }).catch((err) => {
                console.error(err);
            });
    };

    static async CleanAllUsers() {
        await BOT_Users.destroy({
            where: {},
            include: [ models.BOT_UserDetails, models.BOT_GuildUser],
        }).then(() => {
                console.log('All users records deleted');
            }).catch((err) => {
                console.error(err);
            });
    };

    static async CleanAllChannels() {
        await BOT_Channels.destroy({
            where: {},
            include: [models.MOD_Notifications, models.BOT_Guilds],
        })
            .then(() => {
                console.log('All channels records deleted');
            })
            .catch(err => console.error(err));
    };
}


module.exports = {
    PrepareData,
    ResetData,
};
