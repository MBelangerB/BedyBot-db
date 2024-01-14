'use strict';
const { BedyAPIConst } = require('../BedyAPIConst');

module.exports = {
  /* eslint-disable-next-line no-unused-vars */
  up: async (queryInterface, Sequelize) => {
    // https://www.leagueoflegends.com/fr-fr/news/dev/dev-ranked-schedule-changes/
    await queryInterface.bulkInsert('RIOT_Seasons',
      [
        {
          seasonId: BedyAPIConst.LeagueOfLegendSeasons.S2024.Split1,
          seasonName: '2024',
          splitNumber: 1,
          startDateTime: '2024-01-10 12:00:00',
          endDateTime: null,
        },
        {
          seasonId: BedyAPIConst.LeagueOfLegendSeasons.S2024.Split2,
          seasonName: '2024',
          splitNumber: 2,
          startDateTime: null,
          endDateTime: null,
        },
        {
          seasonId: BedyAPIConst.LeagueOfLegendSeasons.S2024.Split3,
          seasonName: '2024',
          splitNumber: 3,
          startDateTime: null,
          endDateTime: null,
        },
      ]);

      await queryInterface.bulkInsert('RIOT_Config',
      [
        {
          id: 1,
          seasonId: BedyAPIConst.LeagueOfLegendSeasons.S2024.Split1,
        },
      ]);
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RIOT_Seasons', null, {});
  },
};
