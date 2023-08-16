// const { sequelize } = require('./dbSchema');
import dbContext from "./sequelizeContext";
const { Bot_Guilds } = dbContext.models;

// const GuildController = require('./controllers/Discord/Bot_GuildsController');
// const GuildOptionController = require('./controllers/Discord/BOT_GuildOptionsController');
// const RolesController = require('./controllers/Discord/Bot_RolesController');

// async function canTreatArrayAsAnd() {
//     const listGuild = await GuildController.getAllActiveGuilds();
//     console.log('-------------------');
//     console.log('Guild');
//     console.log(listGuild.map((row) => row.toJSON()));
//     console.log('-------------------');

//     const guildId = listGuild[0].guildId;
//     const optionInfo = await GuildController.getGuildOptionByGuildId(guildId, false);
//     console.log('-------------------');
//     console.log('Guild Option');
//     console.log(optionInfo.toJSON());
//     console.log('-------------------');

//     const roles = await RolesController.getAllRolesByGuildId(guildId);
//     console.log('-------------------');
//     console.log('Guild Roles');
//     console.log(roles.map((row) => row.toJSON()));
//     console.log('-------------------');

//     return;
// }

// canTreatArrayAsAnd();