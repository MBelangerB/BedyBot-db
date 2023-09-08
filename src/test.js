const { sequelize, models, migrations, controller } = require('./BedyContext');
const { BOT_GuildsController, BOT_GuildOptionsController, BOT_RolesController } = controller;

async function canTreatArrayAsAnd() {
    const listGuild = await BOT_GuildsController.getAllActiveGuilds();
    console.log('-------------------');
    console.log('Guild');
    console.log(listGuild.map((row) => row.toJSON()));
    console.log('-------------------');

    const guildId = listGuild[0].guildId;
    const optionInfo = await BOT_GuildsController.getGuildOptionByGuildId(guildId, false);
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

canTreatArrayAsAnd();