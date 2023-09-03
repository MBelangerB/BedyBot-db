
module.exports = (sequelize, context) => {
    class API_ModulesController {

        /**
         * @NotImplemented
         */
        static createModule = async () => {
            throw new Error('createModule isn\'t implemetend.');
        };

        static getModuleById = async (moduleId, includeCommands = false, includeGuildModule = false) => {
            const includes = [];
            if (includeCommands) {
                includes.push(context.models.API_Commands);
            }
            if (includeGuildModule) {
                includes.push(context.models.API_GuildModules);
            }

            return await context.models.API_Modules.findOne({ where: { moduleId: moduleId }, include: includes });
        };

        /**
         * @NotImplemented
         */
        static updateModule = async () => {
            throw new Error('updateModule isn\'t implemetend.');
        };

        /**
         * @NotImplemented
         */
        static deleteModule = async () => {
            throw new Error('deleteModule isn\'t implemetend.');
        };

    } // End Class

    return API_ModulesController;
}; // End export