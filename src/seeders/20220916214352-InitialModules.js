'use strict';
const { BedyAPIConst } = require('../BedyAPIConst');

module.exports = {
  /* eslint-disable-next-line no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('API_Modules',
      [
        {
          moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
          name: 'Global',
        },
        {
          moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
          name: 'Tournament',
        },
        {
          moduleId: BedyAPIConst.ModuleGuid.ROLE,
          name: 'Role',
        },
      ]);
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('API_Modules', null, {});
  },
};
