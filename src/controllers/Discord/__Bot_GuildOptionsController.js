const { sequelize } = require('../../dbSchema');
const { BOT_GuildOptions } = sequelize.models;


/**
 * Get BOT_GuildOptions by id
 * @param {*} id 
 * @param {*} withInclude 
 * @returns 
 */
exports.getGuildOptionByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_GuildOptions.findOne({ where: { guildId: guildId }, include: [BOT_GuildOptions.getModels().BOT_Guilds] });
    } else {
        return await BOT_GuildOptions.findOne({ where: { guildId: guildId } });
    }
}

exports.initOptionForGuildId = async (guildId) => {
    return await BOT_GuildOptions.create({
        guildId: guildId,
        maxPlayerPerLobby: 12,
    });
}
