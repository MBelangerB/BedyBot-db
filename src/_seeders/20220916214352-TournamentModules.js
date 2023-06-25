'use strict';

module.exports = {
  /* eslint-disable-next-line no-unused-vars */
  up: async (queryInterface, Sequelize) => {
     const moduleId = 'A10F66AB-99AA-46FF-AFE7-640BCE139187';
     const moduleName = 'tournament';

     await queryInterface.bulkInsert('API_Modules',
     [
       {
         id: moduleId,
         name: moduleName,
       },
     ]);
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('API_Modules', null, {});
  },
};
