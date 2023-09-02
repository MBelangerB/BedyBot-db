// Config environnement
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'bedybot_mochaTest';

// Requirement
const { BedyAPIConst } = require('../src/BedyAPIConst')
const { generateUnsignedBigInt64 } = require('../src/services/TestService');
const { models, controller } = require('../src/BedyContext');
const { BOT_GuildsController, BOT_UsersController, BOT_ChannelsController } = controller;
const { MOD_Notifications, BOT_Guilds, BOT_GuildOptions, BOT_Users, BOT_Channels } = models;

let beforeIsInitialize = false;
let afterIsInitialize = false;

async function cleanAllGuild() {
    const allGuilds = await BOT_GuildsController.getAllGuilds();
    if (allGuilds != null) {
        for (let index = 0; index < allGuilds.length; index++) {
            const aGuild = allGuilds[index];
            await BOT_GuildsController.deleteGuild(aGuild.guildId);
        }
    }
}

async function cleanAllUsers() {
    const allUsers = await BOT_UsersController.getAllUsers();
    if (allUsers != null) {
        for (let index = 0; index < allUsers.length; index++) {
            const aUser = allUsers[index];
            await BOT_UsersController.deleteUser(aUser.userId);
        }
    }
}

async function beforeCheckState() {
    if (!beforeIsInitialize) {
        console.log(' ====> Before Clean All Guilds');
        await cleanAllGuild();
        console.log(' ====> Before Clean All Users');
        await cleanAllUsers();
        beforeIsInitialize = true;
    }
}

async function afterCheckState() {
    if (!afterIsInitialize) {
        console.log(' ====> After Clean All Guilds');
        await cleanAllGuild();
        console.log(' ====> Before Clean All Users');
        await cleanAllUsers();
        afterIsInitialize = true;
    }
}

async function resetState() {
    beforeIsInitialize = false;
    afterIsInitialize = false;
}

class PrepareData {
    static guildId; // = generateUnsignedBigInt64();
    static guildName = "Test Guild";
    static guildOwnerId; // = generateUnsignedBigInt64();

    static tmpGuildId; // = generateUnsignedBigInt64();
    static tmpGuildName = "Tmp Test Guild";

    static channelId;
    static channelName = "My channel";

    static initalize() {
        this.guildId = generateUnsignedBigInt64();
        this.guildName = "Test Guild";
        this.guildOwnerId = generateUnsignedBigInt64();

        this.tmpGuildId = generateUnsignedBigInt64();
        this.tmpGuildName = "Tmp Test Guild";

        this.channelId = generateUnsignedBigInt64();
    }

    static GuildInitialization = async () => {
        this.initalize();

        await BOT_GuildsController.createGuild(this.guildId, this.guildName, this.guildOwnerId, null, null, null, null, true);
        await BOT_GuildsController.createGuild(this.tmpGuildId, this.tmpGuildName, this.guildOwnerId, null, null, null, null, true);
        await BOT_ChannelsController.createGuildChannel(this.guildId, this.channelId, this.channelName, BedyAPIConst.DiscordChannelTypes.GUILD_TEXT);
    };
}

class ResetData {

    static CleanAllNotifications = async () => {
        // await MOD_Notifications.destroy({ truncate: true })
        //     .then(() => console.log('All records deleted'))
        //     .catch(err => console.error(err));

        await MOD_Notifications.findAll()
            .then(async (notifications) => {
                if (notifications.length === 0) {
                    console.log('No notification records to delete');
                    return;
                }
                return await MOD_Notifications.destroy({ truncate: true });
            })
            .then(() => console.log('All records notifications deleted'))
            .catch((err) => console.error(err));

    }

    static CleanAllGuilds = async () => {
        // await BOT_Guilds.findAll()
        //     .then(async (guilds) => {
        //         if (guilds.length === 0) {
        //             console.log('No guilds records to delete');
        //             return;
        //         }
        //         return await BOT_Guilds.destroy({ truncate: true });
        //     })
        //     .then(() => console.log('All records guilds deleted'))
        //     .catch((err) => console.error(err));

        await BOT_Guilds.destroy({
            where: {},
            include: [ models.BOT_GuildOptions, models.MOD_Notifications,  models.BOT_Channels, models.BOT_Users ]
        })
            .then(() => console.log('All guilds records deleted'))
            .catch(err => console.error(err));

        // await BOT_Guilds.findAll().then((guilds) => {
        //         if (guilds.length === 0) {
        //             console.log('No records to delete');
        //             return;
        //         }
        //         return BOT_Guilds.destroy({
        //             where: {},
        //             truncate: true,
        //             include: [
        //                 {
        //                     model: BOT_GuildOptions
        //                 },
        //                 {
        //                     model: MOD_Notifications
        //                 }
        //             ]
        //         });
        //     })
        //     .then(() => console.log('All records deleted'))
        //     .catch((err) => console.error(err));

    }

    static CleanAllUsers = async () => {
        await BOT_Users.findAll()
            .then((users) => {
                if (users.length === 0) {
                    console.log('No users records to delete');
                    return;
                }
                return BOT_Users.destroy({ truncate: true });
            })
            .then(() => console.log('All records users deleted'))
            .catch((err) => console.error(err));
  
    }

    static CleanAllChannels = async () => {
        // await BOT_Channels.findAll()
        //     .then(async (data) => {
        //         if (data.length === 0) {
        //             console.log('No channel records to delete');
        //             return;
        //         }
        //         return await BOT_Channels.destroy({ truncate: true });
        //     })
        //     .then(() => console.log('All records channel deleted'))
        //     .catch((err) => console.error(err));


            await BOT_Channels.destroy({
                where: {},
                include: [ models.MOD_Notifications, models.BOT_Guilds ]
            })
                .then(() => {
                    console.log('All channels records deleted')
                })
                .catch(err => console.error(err));
    }
}


module.exports = {
    beforeCheckState,
    afterCheckState,
    resetState,
    PrepareData,
    ResetData
};
