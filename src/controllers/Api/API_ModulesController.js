const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class API_ModulesController {

        /**
         * @NotImplemented
         */
        static async createModule() {
            throw new Error('createModule isn\'t implemented.');
        }

        /**
         * Get All enabled modules
         * @param {context.models[]} includeModels
         * @returns {context.models.API_Modules[]}
         */
        static async GetAllModules(includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.API_Modules.findAll({ where: { isEnabled: true }, include: includeModels });
            } else {
                return await context.models.API_Modules.findAll({ where: { isEnabled: true } });
            }
        }

        /**
         * Get module details by ModuleId
         * @param {*} moduleId
         * @param {*} includeCommands
         * @param {*} includeGuildModule
          * @returns {context.models.API_Modules}
         */
        static async getModuleById(moduleId, includeCommands = false, includeGuildModule = false) {
            const includes = [];
            if (includeCommands) {
                includes.push(context.models.API_Commands);
            }
            if (includeGuildModule) {
                includes.push(context.models.API_GuildModules);
            }

            return await context.models.API_Modules.findOne({ where: { moduleId: moduleId }, include: includes });
        }

        /**
         * @NotImplemented
         */
        static async updateModule() {
            throw new Error('updateModule isn\'t implemented.');
        }

        /**
         * @NotImplemented
         */
        static async deleteModule() {
            throw new Error('deleteModule isn\'t implemented.');
        }

    } // End Class

    return API_ModulesController;
}; // End export