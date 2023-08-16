const { sequelize } = require('../../dbSchema');
const { API_Modules, API_GuildModules } = sequelize.models;

// ******************************************
// API_Modules
// ******************************************

/**
 * @NotImplemented
 */
exports.createModule = async () => {
    throw new Error('createModule isn\'t implemetend.')
}

exports.getModuleById = async (moduleId, includeCommands = false, includeGuildModule = false) => {
    let includes = [];
    if (includeCommands) {
        includes.push(API_Modules.getModels().API_Commands)
    }
    if (includeGuildModule) {
        includes.push(API_Modules.getModels().API_GuildModules)
    }

    return await API_Modules.findOne({ where: { moduleId: moduleId }, include: includes });
}

/**
 * @NotImplemented
 */
exports.updateModule = async () => {
    throw new Error('updateModule isn\'t implemetend.')
}

/**
 * @NotImplemented
 */
exports.deleteModule = async () => {
    throw new Error('deleteModule isn\'t implemetend.')
}

// ******************************************
// API_GuildModules
// ******************************************

// Create
exports.createGuildModule = async (guildId, moduleId, isActive = true) => {
    return await API_GuildModules.create({
        guildId: guildId,
        moduleId: moduleId,
        isActive: isActive
    });
}

// Update
exports.getGuildModuleById = async (moduleId, guildId, includeModule = false) => {
    let includes = [];
    includes.push(API_GuildModules.getModels().BOT_Guilds);

    if (includeModule) {
        includes.push(API_GuildModules.getModels().API_Modules);
    }

    return await API_GuildModules.findOne({ where: { moduleId: moduleId, guildId: guildId }, include: includes });
}

// Create
exports.updateGuildModule = async (guildId, moduleId, isActive = true) => {
    let aGuildModule = this.getGuildModuleById(guildId, moduleId, true);
    if (!aGuildModule) {
        throw new Error(`Guild module (${guildId}, ${moduleId}) doesn't exist.`);
    } else {
        aGuildModule.set({
            isActive: isActive,
        });

        if (aGuildModule.changed() && aGuildModule.changed.length > 0) {
            await aGuildModule.save();
        }
    }
}
