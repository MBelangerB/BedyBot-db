  /* eslint-disable-next-line no-unused-vars */
const { sequelize, models, migrations, controller } = require('./BedyContext');
const { BOT_Guilds } = models;
const { BOT_GuildsController, BOT_GuildOptionsController, BOT_RolesController } = controller;


async function getGuild() {
    const data = await BOT_Guilds.findAll({ where: { isActive: true } });
    console.log('getGuild  :', data);
    return data;
}

async function canTreatArrayAsAnd() {
    const listGuild = await BOT_GuildsController.getAllActiveGuilds();
    console.log('-------------------');
    console.log('Guild');
    console.log(listGuild.map((row) => row.toJSON()));
    console.log('-------------------');

    // VALUES(1970384394833100860, 'Discord Tester', NULL, NULL, 731938823591731200, 'euw', 'fr-fr', 1, current_timestamp(), NULL);
    // let newGuild = await BOT_GuildsController.createGuild('1970384394833100861', 'Test', 731938823591731200, 'euw', 'fr-fr', null, null);
    // console.log('-------------------');
    // console.log('New Guild');
    // console.log(newGuild);
    // console.log('-------------------');

    const guildId = listGuild[0].guildId;
    const optionInfo = await BOT_GuildOptionsController.getGuildOptionByGuildId(guildId, false);
    console.log('-------------------');
    console.log('Guild Option');
    console.log(optionInfo.toJSON());
    console.log('-------------------');

    const roles = await BOT_RolesController.getAllRolesByGuildId(guildId);
    console.log('-------------------');
    console.log('Guild Roles');
    console.log(roles.map((row) => row.toJSON()));
    console.log('-------------------');

    return;
}

getGuild();
canTreatArrayAsAnd();