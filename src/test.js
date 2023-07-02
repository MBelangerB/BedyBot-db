// const { sequelize } = require('./dbSchema');
// const { Bot_Guilds } = sequelize.models;

const GuildController = require('./controllers/Discord/Bot_GuildsController');
// const GuildOptionController = require('./controllers/Discord/BOT_GuildOptionsController');
const RolesController = require('./controllers/Discord/Bot_RolesController');

async function canTreatArrayAsAnd() {
    const listGuild = await GuildController.getAllActiveGuilds();
    console.log('-------------------')
    // console.log(listGuild);
    console.log(listGuild.map((row) => row.toJSON()));
    console.log('-------------------')

    let guildId = listGuild[0].guildId;
    const optionInfo = await GuildController.getGuildOptionByGuildId(guildId, false)
    console.log('-------------------')
    // console.log(optionInfo);   
    console.log(optionInfo.toJSON());
    console.log('-------------------')

    return;
}

canTreatArrayAsAnd();