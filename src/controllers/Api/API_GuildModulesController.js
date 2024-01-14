const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class API_GuildModulesController {

        // Create
        static createGuildModule = async (guildId, moduleId, isActive = true) => {
            return await context.models.API_GuildModules.create({
                guildId: guildId,
                moduleId: moduleId,
                isActive: isActive,
            });
        };

        // Update
        static getGuildModuleById = async (moduleId, guildId, includeModule = false) => {
            const includes = [];
            includes.push(context.models.BOT_Guilds);

            if (includeModule) {
                includes.push(context.models.API_Modules);
            }

            return await context.models.API_GuildModules.findOne({ where: { moduleId: moduleId, guildId: guildId }, include: includes });
        };

        // Create
        static updateGuildModule = async (guildId, moduleId, isActive = true) => {
            const aGuildModule = this.getGuildModuleById(guildId, moduleId, true);
            if (!aGuildModule) {
                throw new InvalidEntityException([guildId, moduleId], 'API_GuildModules', 'Guild modules doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                aGuildModule.set({
                    isActive: isActive,
                });

                if (aGuildModule.changed() && aGuildModule.changed.length > 0) {
                    await aGuildModule.save();
                }
            }
        };

    } // End Class

    return API_GuildModulesController;
}; // End export
