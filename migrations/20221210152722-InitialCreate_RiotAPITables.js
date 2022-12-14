'use strict';
/** @type {import('sequelize-cli').Migration} */

const Sequelize = require('sequelize');

//TODO: Une config dans la BD pour intervalle entre les update pour le Summoner, par défaut il sera a 24hrs atm

module.exports = {
  up: async (queryInterface, DataTypes) => {
    // *************************
    // SummonerInfo
    // *************************
    await queryInterface.createTable('RIOT_Summoner', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      riotId: {
        type: DataTypes.STRING(63),
        field: 'riotId',
        allowNull: false,
      },
      riotAccountId: {
        type: DataTypes.STRING(56),
        field: 'riotAccountId',
        allowNull: false,
      },
      riotProfileIconId: {
        type: DataTypes.INTEGER,
        field: 'riotProfileIconId',
        allowNull: true,
      },
      riotPuuid: {
        type: DataTypes.UUID, // STRING(78),
        field: 'riotPuuid',
        allowNull: false,
      },
      riotSummonerName: {
        type: DataTypes.STRING,
        field: 'riotSummonerName',
        allowNull: false,
      },
      riotSummonerLevel: {
        type: DataTypes.INTEGER,
        field: 'riotSummonerLevel',
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        field: 'region',
        allowNull: false,
      },
      expiredAPIKey: {
        type: DataTypes.BOOLEAN,
        field: 'expiredAPIKey',
        defaultValue: false,
        allowNull: false,
      },
      updateAt: {
        type: DataTypes.DATE,
        field: 'updateAt',
        allowNull: false
      },
    });

    await queryInterface.addIndex('RIOT_Summoner', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_riot_summoner_SummonerId',
    });

    await queryInterface.addIndex('RIOT_Summoner', {
      fields: ['riotSummonerName', 'region'],
      name: 'IDX_riot_summoner_SummonerNameRegion',
    });

    // *************************
    // SummonerInfo History
    // *************************
    await queryInterface.createTable('RIOT_SummonerHistory', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      riotSummonerId: {
        type: DataTypes.UUID,
        field: 'riotSummonerId',
        allowNull: false,
        references: {
          model: 'RIOT_Summoner',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      riotSummonerName: {
        type: DataTypes.STRING,
        field: 'riotSummonerName',
        allowNull: false,
      },
      updateAt: {
        type: DataTypes.DATE,
        field: 'updateAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('RIOT_SummonerHistory', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_riot_SummonerHistory_Id',
    });

    await queryInterface.addIndex('RIOT_SummonerHistory', {
      fields: ['riotSummonerName'],
      name: 'IDX_riot_SummonerHistory_summonerName',
    });

    // *************************
    // SummonerLeague
    // *************************
    await queryInterface.createTable('RIOT_SummonerLeague', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      // One to One
      riotSummonerId: {
        type: DataTypes.UUID,
        field: 'riotSummonerId',
        allowNull: false,
        references: {
          model: 'RIOT_Summoner',
          key: 'id'
        },
      },
      riotLeagueId: {
        type: DataTypes.STRING,
        field: 'riotLeagueId',
        allowNull: false,
      },
      // Same riotId on table RIOT_Summoner
      riotSummonerId: {
        type: DataTypes.STRING,
        field: 'riotSummonerId',
        allowNull: false,
      },
      riotSummonerName: {
        type: DataTypes.STRING,
        field: 'riotSummonerName',
        allowNull: false,
      },
      queueType: {
        type: DataTypes.STRING,
        field: 'queueType',
        allowNull: false,
      },
      tier: {
        type: DataTypes.STRING,
        field: 'tier',
        allowNull: false,
      },
      rank: {
        type: DataTypes.STRING,
        field: 'rank',
        allowNull: false,
      },
      leaguePoints: {
        type: DataTypes.INTEGER,
        field: 'leaguePoints',
        allowNull: false,
      },
      wins: {
        type: DataTypes.INTEGER,
        field: 'wins',
        allowNull: false,
      },
      losses: {
        type: DataTypes.INTEGER,
        field: 'losses',
        allowNull: false,
      },
      riotHotStreak: {
        type: DataTypes.BOOLEAN,
        field: 'riotHotStreak',
        defaultValue: false,
        allowNull: false,
      },
      riotVeteran: {
        type: DataTypes.BOOLEAN,
        field: 'riotVeteran',
        defaultValue: false,
        allowNull: false,
      },
      riotFreshBlood: {
        type: DataTypes.BOOLEAN,
        field: 'riotFreshBlood',
        defaultValue: false,
        allowNull: false,
      },
      riotInactive: {
        type: DataTypes.BOOLEAN,
        field: 'riotInactive',
        defaultValue: false,
        allowNull: false,
      },
      // One To One
      riotSummonerMiniSeriesId: {
        type: DataTypes.UUID,
        field: 'riotSummonerMiniSeriesId',
        allowNull: false,
        references: {
          model: 'RIOT_SummonerMiniSeries',
          key: 'id'
        },
      },
      // Last update
      updateAt: {
        type: DataTypes.DATE,
        field: 'updateAt',
        allowNull: false
      },
    });

    await queryInterface.addIndex('RIOT_SummonerLeague', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_riot_SummonerLeague_Id',
    });

    await queryInterface.addIndex('RIOT_SummonerLeague', {
      fields: ['riotSummonerId'],
      name: 'IDX_riot_SummonerLeague_riotSummonerId',
    });
    
    await queryInterface.addIndex('RIOT_SummonerLeague', {
      fields: ['riotSummonerName'],
      name: 'IDX_riot_SummonerLeague_riotSummonerName',
    });

    // *************************
    // SummonerLeague MiniSeries
    // *************************
    await queryInterface.createTable('RIOT_SummonerMiniSeries', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      wins: {
        type: DataTypes.INTEGER,
        field: 'wins',
        allowNull: false,
      },
      losses: {
        type: DataTypes.INTEGER,
        field: 'losses',
        allowNull: false,
      },
      target: {
        type: DataTypes.INTEGER,
        field: 'target',
        allowNull: false,
      },
      progress: {
        type: DataTypes.STRING(10),
        field: 'progress',
        allowNull: false,
      },
    });

    await queryInterface.addIndex('RIOT_SummonerMiniSeries', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_riot_SummonerMiniSeries_Id',
    });

    // *************************
    // SummonerLeague History
    // *************************

    // *************************
    // StaticInfo (??)
    // *************************

    // *************************
    // SeasonInfo (??)
    // *************************

    //


  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeIndex('RIOT_SummonerMiniSeries', 'PK_riot_SummonerMiniSeries_Id');
    await queryInterface.removeIndex('RIOT_SummonerLeague', 'IDX_riot_SummonerLeague_riotSummonerName');
    await queryInterface.removeIndex('RIOT_SummonerLeague', 'IDX_riot_SummonerLeague_riotSummonerId');
    await queryInterface.removeIndex('RIOT_SummonerLeague', 'PK_riot_SummonerLeague_Id');
    await queryInterface.removeIndex('RIOT_SummonerHistory', 'PK_riot_SummonerHistory_Id');
    await queryInterface.removeIndex('RIOT_SummonerHistory', 'IDX_riot_SummonerHistory_summonerName');
    await queryInterface.removeIndex('RIOT_Summoner', 'PK_riot_summoner_SummonerId');
    await queryInterface.removeIndex('RIOT_Summoner', 'IDX_riot_summoner_SummonerNameRegion');


    await queryInterface.dropTable('RIOT_SummonerMiniSeries');
    await queryInterface.dropTable('RIOT_SummonerLeague');
    await queryInterface.dropTable('RIOT_SummonerHistory');
    await queryInterface.dropTable('RIOT_Summoner');
  },
};
