'use strict';
const { BedyAPIConst } = require('../BedyAPIConst');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (t) => {

      await queryInterface.bulkInsert('API_Commands',
        [
          {
            id: uuidv4(),
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "create",
            description: "Permet de créer un nouveau tournoi.",
            isApplicationCommand: false
          },
          {
            id: uuidv4(),
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "close",
            description: "Permet de clore un tournoi existant.",
            isApplicationCommand: false
          },
          {
            id: uuidv4(),
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "tournament",
            description: "Permet de lancer un tournoi.",
            isApplicationCommand: false
          },
          {
            id: uuidv4(),
            moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
            name: "set",
            description: "Permet a l'utilisateur de setter ses informations",
            isApplicationCommand: false
          },
          {
            id: uuidv4(),
            moduleId: BedyAPIConst.ModuleGuid.ROLE,
            name: "role",
            description: "Permet a l'utilisateur de sélectionner une rôle.",
            isApplicationCommand: false
          },
        ], { transaction: t })


      await queryInterface.bulkInsert('API_CommandRoles',
        [
          {
            commandId: BedyAPIConst.CommandGuid.ROLE.ROLE,
            roleId: null,
            forEveryone: false
          },

          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.CREATE,
            roleId: null,
            forEveryone: false
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.TOURNAMENT,
            roleId: null,
            forEveryone: false
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.CLOSE,
            roleId: null,
            forEveryone: false
          },
          {
            commandId: BedyAPIConst.CommandGuid.TOURNAMENT.SET,
            roleId: null,
            forEveryone: true
          },
        ], { transaction: t })

    });
  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('API_CommandRoles', null, {});
    await queryInterface.bulkDelete('API_Modules', null, {});
  }
};
