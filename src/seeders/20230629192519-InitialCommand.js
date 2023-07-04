'use strict';
const { BedyAPIConst } = require('../BedyAPIConst');
const Sequelize = require('sequelize');

// const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {

      // *******************************************
      // ADD GLOBAL MODULE COMMANDS
      // *******************************************
      await queryInterface.bulkInsert('API_Commands',
        [
          {
            commandId: BedyAPIConst.CommandGuid.GLOBAL.HELP,
            moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
            name: "help",
            description: "Obtenir la liste des commandes disponibles.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.GLOBAL
          },

          {
            commandId: BedyAPIConst.CommandGuid.GLOBAL.CONTACT_US,
            moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
            name: "contactus",
            description: "Contactez l\'équipe de développement.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.GLOBAL
          },
          {
            commandId: BedyAPIConst.CommandGuid.GLOBAL.USERINFO,
            moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
            name: "userinfo",
            description: "Obtenir les informations sur le profile de l'utilisateur.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.GLOBAL
          },
          {
            commandId: BedyAPIConst.CommandGuid.GLOBAL.SET_USER,
            moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
            name: "setUser",
            description: "Permet à l'utilisateur de paramétrer son profile.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.GLOBAL
          },
        ], { transaction: t })

      // *******************************************
      // ADD TOURNAMENT MODULE COMMANDS
      // *******************************************
      await queryInterface.bulkInsert('API_Commands',
        [
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.CREATE,
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "create",
            description: "Permet de créer un nouveau tournoi.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_GUILD_COMMANDS,
            commandType:  BedyAPIConst.BedyModuleType.TOURNAMENT_MODULE
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.CLOSE,
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "close",
            description: "Permet de clore un tournoi existant.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_GUILD_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.TOURNAMENT_MODULE
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.TOURNAMENT,
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "tournament",
            description: "Permet de lancer un tournoi.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_GUILD_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.TOURNAMENT_MODULE
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.SET_CONFIGURATION,
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "set",
            description: "Permet à l'utilisateur de configurer son profile.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_GUILD_COMMANDS,
            commandType: BedyAPIConst.BedyModuleType.TOURNAMENT_MODULE
          }
        ], { transaction: t })

      // *******************************************
      // ADD ROLE MODULE COMMANDS
      // *******************************************
      await queryInterface.bulkInsert('API_Commands',
        [
          {
            commandId: BedyAPIConst.CommandGuid.ROLE.ROLE,
            moduleId: BedyAPIConst.ModuleGuid.ROLE,
            name: "role",
            description: "Permet à l'utilisateur de sélectionner un rôle.",
            applicationCommandType: BedyAPIConst.ApplicationCommandType.APPLICATION_GUILD_COMMANDS,
            commandType:BedyAPIConst.BedyModuleType.ROLE_MODULE
          },
        ], { transaction: t })
      // End Transaction
    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('API_Commands', null, {});
  }
};
