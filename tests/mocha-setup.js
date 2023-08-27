// Config environnement
process.env.NODE_ENV = 'test';
process.env.DB_NAME = 'bedybot_mochaTest';

// Requirement
const { controller } = require('../src/BedyContext');
const { BOT_GuildsController, BOT_UsersController } = controller;

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

async function resetState()  {
    beforeIsInitialize = false;
    afterIsInitialize = false;
}

// A valider
// const BOT_TablesTest = [
//     require('./controller/BOT_GuildsController.spec'),
//     require('./controller/BOT_GuildOptionsController.spec')
// ]
// BOT_TablesTest.forEach(test => test());

module.exports = {
    beforeCheckState,
    afterCheckState,
    resetState
  };
