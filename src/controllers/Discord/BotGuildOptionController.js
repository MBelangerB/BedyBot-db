const { sequelize } = require('../../dbSchema');
const { BOT_GuildOption } = sequelize.models;


/**
 * Get BOT_GuildOption by id
 * @param {*} id 
 * @param {*} withInclude 
 * @returns 
 */
exports.getGuildOptionByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_GuildOption.findOne({ where: { guildId: guildId }, include: [BOT_GuildOption.getModels().BOT_Guilds] });
    } else {
        return await BOT_GuildOption.findOne({ where: { guildId: guildId } });
    }
}

exports.initOptionForGuildId = async (guildId) => {
    return await BOT_GuildOption.create({
        guildId: guildId,
        maxPlayerPerLobby: 12,
    });
}
