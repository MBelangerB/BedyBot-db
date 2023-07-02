const { sequelize } = require('../../dbSchema');
const { BOT_Guilds, BOT_GuildOptions, BOT_GuildUser } = sequelize.models;

// ******************************************
// BOT_Guilds 
// ******************************************

/**
 * Get BOT_Guilds by guildId
 * @param {BigInt} guildId A Discord guildId
 * @param {Models[]} includeModels Array of Sequelize models
 * @returns {BOT_Guilds}
 */
exports.getGuildByGuildId = async (guildId, includeModels = []) => {
    if (includeModels && includeModels.length > 0) {
        return await BOT_Guilds.findOne({ where: { guildId: guildId }, include: includeModels });
    } else {
        return await BOT_Guilds.findOne({ where: { guildId: guildId } });
    }
}

/**
 * Return all active guilds
 * @param {Models[]} includeModels Array of Sequelize models
 * @returns {BOT_Guilds[]}
 */
exports.getAllActiveGuilds = async (includeModels = []) => {
    if (includeModels && includeModels.length > 0) {
        return await BOT_Guilds.findAll({ where: { isActive: true }, include: includeModels });
    } else {
        return await BOT_Guilds.findAll({ where: { isActive: true } });
    }
}

/**
 * Return all guilds
 * @param {Models[]} includeModels Array of Sequelize models
 * @returns {BOT_Guilds[]}
 */
 exports.getAllGuilds = async (includeModels = []) => {
    if (includeModels && includeModels.length > 0) {
        return await BOT_Guilds.findAll({ include: includeModels });
    } else {
        return await BOT_Guilds.findAll();
    }
}

/**
 * Add a new discord guild on DB 
 * @param {BIGINT} guildId (mandatory)
 * @param {String} guildName (mandatory) 
 * @param {*} ownerId (mandatory)
 * @param {*} region 
 * @param {*} preferredLocal 
 * @param {*} iconUrl 
 * @param {*} bannerUrl 
 * @returns 
 */
exports.createGuild = async (guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null) => {
    return await BOT_Guilds.create({
        guildId: guildId,
        guildName: guildName,
        guildIconUrl: iconUrl,
        guildBannerUrl: bannerUrl,
        guildOwnerId: ownerId,
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
exports.updateGuild = async (guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`);

    } else {
        if (guildName != null && aGuild.guildName != guildName) {
            aGuild.set({
                guildName: region
            });
        }
        if (ownerId != null && aGuild.guildOwnerId != ownerId) {
            aGuild.set({
                guildOwnerId: region
            });
        }

        if (region != null && aGuild.guildRegion != region) {
            aGuild.set({
                guildRegion: region
            });
        }

        if (preferredLocal != null && aGuild.guildPreferredLocale != preferredLocal) {
            aGuild.set({
                guildPreferredLocale: preferredLocal
            });
        }

        if (iconUrl != null && aGuild.guildIconUrl != iconUrl) {
            aGuild.set({
                guildIconUrl: iconUrl
            });
        }
        if (bannerUrl != null && aGuild.guildBannerUrl != bannerUrl) {
            aGuild.set({
                guildBannerUrl: bannerUrl
            });
        }

        // TODO: If no changed, what we do ?
        if (aGuild.changed() && aGuild.changed.length > 0) {
            return await aGuild.save();
        }
    }
}

/**
 * Update the guild statut and date param.
 * @param {boolean} newStatut new guild Statut
 * @returns {BOT_Guilds}
 */
exports.updateGuildStatut = async (guildId, newStatut) => {
    let aGuild = this.getGuildByGuildId(guildId);
    if (!aGuild) {
        throw new Exception(`GuildId ${guildId} doesn't exist.`)

    } else if (aGuild.isActive !== newStatut && newStatut == true) {
        // Guild is comeback
        aGuild.set({
            isActive: newStatut,
            joinedAt: Date.now(),
            leftAt: null,
        });
        return await aGuild.save();

    } else if (aGuild.isActive !== newStatut && newStatut == false) {
        // Guild is left
        aGuild.set({
            isActive: newStatut,
            leftAt: Date.now(),
        });
        return await aGuild.save();
    }
    console.verbose(`Guild status and date for **${aGuild.id}** has been updated.`);
}

// ******************************************
// BOT_GuildOptions
// ******************************************

/**
 * Initialize a GuildOption
 * @param {BIGINT} guildId 
 * @returns 
 */
exports.initOptionForGuildId = async (guildId) => {
    return await BOT_GuildOptions.create({
        guildId: guildId,
        maxPlayerPerLobby: 12,
    });
}

/**
 * Update GuildOption
 * @param {*} guildId 
 * @param {*} announcementChannelId 
 * @param {*} maxPlayerPerLobby 
 * @param {*} addEveryone 
 * @returns 
 */
exports.updateGuildOption = async (guildId, announcementChannelId = null, maxPlayerPerLobby = null, addEveryone = null) => {
    const aGuildOption = this.getGuildOptionByGuildId(guildId);
    if (!aGuildOption) {
        throw new Exception(`GuildOption for ${guildId} doesn't exist.`);

    } else {
        if (announcementChannelId != null && aGuildOption.announcementChannelId != announcementChannelId) {
            aGuildOption.set({
                announcementChannelId: announcementChannelId
            });
        }

        if (maxPlayerPerLobby != null && aGuildOption.maxPlayerPerLobby != maxPlayerPerLobby) {
            aGuildOption.set({
                maxPlayerPerLobby: maxPlayerPerLobby
            });
        }
        if (addEveryone != null && aGuildOption.addEveryone != addEveryone) {
            aGuildOption.set({
                addEveryone: addEveryone
            });
        }

        // TODO: If no changed, what we do ?
        if (aGuildOption.changed() && aGuildOption.changed.length > 0) {
            return await aGuildOption.save();
        }
    }
}

/**
 * Get BOT_GuildOptions by id
 * @param {BIGINT} id 
 * @param {Boolean} withInclude 
 * @returns 
 */
exports.getGuildOptionByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_GuildOptions.findOne({ where: { guildId: guildId }, include: [BOT_GuildOptions.getModels().BOT_Guilds] });
    } else {
        return await BOT_GuildOptions.findOne({ where: { guildId: guildId } });
    }
}

// ******************************************
// BOT_GuildUser
// ******************************************

/**
 * Initialize a initGuildUser
 * @param {BIGINT} guildId (mandatory)
 * @param {BIGINT} userId  (mandatory)
 * @param {*} nickname 
 * @param {*} avatar 
 * @returns 
 */
exports.initGuildUser = async (guildId, userId, nickname = null, avatar = null) => {
    return await BOT_GuildUser.create({
        guildId: guildId,
        userId: userId,
        nickname: nickname,
        avatar: avatar,
    });
}

exports.getGuildUserByUserId = async (guildId, userId, includeGuild = false, includeUsers = false) => {
    let includeList = [];
    if (includeGuild) {
        includeList.push(BOT_GuildUser.getModels().BOT_Guilds);
    }
    if (includeUsers) {
        includeList.push(BOT_GuildUser.getModels().BOT_Users);
        // include.push({
        //     model: BOT_GuildUser.getModels().BOT_Users,
        //     include: [
        //         {
        //           model: BOT_UserDetails
        //         }
        //       ]
        // });
    }

    return await BOT_GuildUser.findAll({ where: { guildId: guildId, userId: userId }, include: includeList });
}

/**
 * Update the guildUser info
 * @param {*} guildId 
 * @param {*} userId 
 * @param {*} nickname 
 * @param {*} avatar 
 * @returns 
 */
exports.updateGuildUser = async (guildId, userId, nickname = null, avatar = null) => {
    const aGuildUser = this.getGuildUserByUserId(guildId, userId);
    if (!aGuildUser) {
        throw new Exception(`GuildUser for (${guildId}, ${userId}) doesn't exist.`);

    } else {
        if (nickname != null && aGuildUser.nickname != nickname) {
            aGuildUser.set({
                nickname: nickname
            });
        }

        if (avatar != null && aGuildUser.avatar != avatar) {
            aGuildUser.set({
                avatar: maxPlayavatarerPerLobby
            });
        }

        if (aGuildUser.changed() && aGuildUser.changed.length > 0) {
            return await aGuildUser.save();
        }
    }
}

/**
 * Change the guid user presence. 
 * @returns {BOT_GuildUser}
 */
exports.updateGuildUserStatut = async (guildId, userId, hasLeft) => {
    const aGuildUser = this.getGuildUserByUserId(guildId, userId);
    if (!aGuildUser) {
        throw new Exception(`GuildUser for (${guildId}, ${userId}) doesn't exist.`);

    } else {
        if (hasLeft == false) {
            // GuildUser comeback
            aGuildUser.set({
                joinedAt: Date.now(),
                leftAt: null,
            });
            return await aGuildUser.save();

        } else if (hasLeft == true) {
            // Guild is left
            aGuildUser.set({
                aGuildUser: Date.now(),
            });
            return await aGuildUser.save();
        }
        console.verbose(`GuildUser state change, hasLeft : ${hasLeft} for **(${guildId}, ${userId})**.`);
    }
}