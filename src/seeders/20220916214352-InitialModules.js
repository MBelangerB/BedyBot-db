'use strict';
// const { v4: uuidv4 } = require('uuid');
const { BedyAPIConst } = require('../BedyAPIConst');

module.exports = {
  /* eslint-disable-next-line no-unused-vars */
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('API_Modules',
     [
       {
         id: BedyAPIConst.ModuleGuid.TOURNAMENT,
         name: "Tournament",
       },
       {
        id: BedyAPIConst.ModuleGuid.ROLE,
        name: "Role",
      },
     ]);
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('API_Modules', null, {});
  },
};
