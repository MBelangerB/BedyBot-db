const { sequelize } = require('../../dbSchema');
const { API_Commands, API_GuildCommands, API_CommandPermissions } = sequelize.models;
const API_ModulesController = require('./API_ModulesController');

// ******************************************
// API_Commands
// ******************************************
exports.createCommands = async(moduleId, commandId, name, description, commandType, applicationCommandType) => {

}

exports.updateCommands = async(moduleId, commandId, name, description, commandType, applicationCommandType) => {
    
}

exports.getCommandById = async(commandId, includeModule, includeGuildCommand) => {
    let includes = [];
    if (includeModule) {
        includes.push(API_Modules.getModels().API_Modules)
    }
    if (includeGuildCommand) {
        includes.push(API_Modules.getModels().API_GuildCommands)
    }

    return await API_Commands.findOne({ where: { commandId: commandId }, include: includes });   
}

exports.deleteCommandId = async(commandId) => {
    const aCommand = await this.getCommandById(commandId);
    if (!aCommand) {
        throw new Error(`Command ${commandId} doesn't exist.`);

    } else {
        await aCommand.destroy();
    } 
}



// ******************************************
// API_GuildCommands
// ******************************************

// ******************************************
// API_CommandPermissions
// ******************************************