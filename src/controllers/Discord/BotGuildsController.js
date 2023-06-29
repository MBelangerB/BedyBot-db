const { sequelize } = require('../../dbSchema');
const { BOT_Guilds } = sequelize.models;

/**
 * Get BOT_Guilds by id
 * @param {*} id 
 * @param {*} withInclude 
 * @returns 
 */
exports.getGuildByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_Guilds.findOne({ where: { guildId: guildId }, include: [BOT_Guilds.getModels().BOT_GuildOptions] });
    } else {
        return await BOT_Guilds.findOne({ where: { guildId: guildId } });
    }
}

/**
 * Return all active guilds
 * @param {boolean} withInclude
 * @returns {BOT_Guilds}
 */
exports.getAllActiveGuild = async (withInclude = true) => {
    if (withInclude) {
        return await BOT_Guilds.findAll({ where: { isActive: true }, include: [BOT_Guilds.getModels().BOT_GuildOptions] });
    } else {
        return await BOT_Guilds.findAll({ where: { isActive: true } });
    }
}


/**
 * Add a new discord guild on DB 
 * @param {*} guildId 
 * @param {*} guildName 
 * @param {*} ownerId 
 * @param {*} region 
 * @param {*} preferredLocal 
 * @param {*} iconUrl 
 * @param {*} bannerUrl 
 * @returns 
 */
exports.createBotBuilds = async (guildId, guildName, ownerId,
    region = null, preferredLocal = null,
    iconUrl = null, bannerUrl = null) => {
    return await BOT_Guilds.create({
        guildId: guildId,
        guildName: guildName,
        guildOwnerId: ownerId,
        guildIconUrl: iconUrl,
        guildBannerUrl: bannerUrl,
        guildRegion: region,
        guildPreferredLocale: preferredLocal,
        isActive: true,
    });
}

/**
 * Update a new discord guild on DB 
 * @param {*} guildId 
 * @param {*} guildName 
 * @param {*} ownerId 
 * @param {*} region 
 * @param {*} preferredLocal 
 * @param {*} iconUrl 
 * @param {*} bannerUrl 
 * @returns 
 */
exports.updateGuild = async (guildId, guildName, ownerId,
    region = null, preferredLocal = null,
    iconUrl = null, bannerUrl = null) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)
    } else {
        aGuild.set({
            guildName: guildName,
            guildOwnerId: ownerId,
            guildIconUrl: iconUrl,
            guildBannerUrl: bannerUrl,
            guildRegion: region,
            guildPreferredLocale: preferredLocal,
            isActive: true,
        });

        return await aGuild.save();
    }

}

/**
     * Update the guild statut and date param
     * @param {boolean} isActive new guild Statut
     * @returns {BOT_Guilds}
     */
exports.updateGuildStatut = async (guildId, newStatut) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)
    } else if (aGuild.isActive !== newStatut && newStatut) {
        // Guild is comeback
        aGuild.set({
            isActive: isActive,
            joinedAt: Date.now(),
            leftAt: null,
        });
        return await aGuild.save();

    } else if (aGuild.isActive !== newStatut && !newStatut) {
        // Guild is left
        aGuild.set({
            isActive: isActive,
            leftAt: Date.now(),
        });
        return await aGuild.save();
    }
    console.verbose(`Guild status and date for **${aGuild.id}** has been updated.`);
}


/**
 * Update the guild name
 * @param {string} newName
 */
exports.updateGuildName = async (guildId, newGuildName) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)
    } else if (aGuild.guildName !== newGuildName) {
        aGuild.set({
            guildName: newName,
        });
        await aGuild.save();

        console.verbose(`Guild name for **${aGuild.id}** has been updated.`);
    }
}

/**
 * Update the guild owner id
 * @param {string} ownerId
 */
exports.updateGuildOwner = async (guildId, newOwnerId) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)
    } else if (aGuild.guildOwnerId !== newOwnerId) {
        aGuild.set({
            guildOwnerId: ownerId,
        });
        await aGuild.save();

        console.verbose(`Guild owner for **${aGuild.id}** has been updated.`);
    }
}

/**
 * Return the guild option by a guildId
 * @param {integer} guildId
 * @returns {BOT_GuildOptions}
 */
exports.getGuildOptionByGuildId = async (guildId) => {
    let aGuild = this.getGuildByGuildId(guildId, true);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)
    } else {
        return aGuild?.BOT_GuildOption;
    }
}

