// const { sequelize, models } = require('../../BedyContext');
// const { API_Commands, API_GuildCommands, API_CommandPermissions } = sequelize.models;
// const API_ModulesController = require('./API_ModulesController');

const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class API_CommandsController {

        static createCommands = async(moduleId, commandId, name, description, commandType, applicationCommandType) => {

        };

        static updateCommands = async(moduleId, commandId, name, description, commandType, applicationCommandType) => {

        };

        static getCommandById = async(commandId, includeModule, includeGuildCommand) => {
            const includes = [];
            if (includeModule) {
                includes.push(context.models.API_Modules);
            }
            if (includeGuildCommand) {
                includes.push(context.models.API_GuildCommands);
            }

            return await context.models.API_Commands.findOne({ where: { commandId: commandId }, include: includes });
        };

        static deleteCommandId = async(commandId) => {
            const aCommand = await this.getCommandById(commandId);
            if (!aCommand) {
                throw new InvalidEntityException(commandId, 'API_Commands', 'Commands doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                await aCommand.destroy();
            }
        };

    } // End Class

    return API_CommandsController;
}; // End export

// ******************************************
// API_GuildCommands
// ******************************************

// ******************************************
// API_CommandPermissions
// ******************************************