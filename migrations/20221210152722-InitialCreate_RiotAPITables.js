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
      riotAccountId: {
        type: DataTypes.STRING(56),
        field: 'riotAccountId',
        allowNull: false,
      },
      riotId: {
        type: DataTypes.STRING(63),
        field: 'riotId',
        allowNull: false,
      },
      riotPuuid: {
        type: DataTypes.STRING(78),
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
        defaultValue: true,
      },
      region: {
        type: DataTypes.STRING,
        field: 'region',
        allowNull: false,     
      },
      updateAt: {
        type: DataTypes.DATE,
        field: 'updateAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // LastUpdate   (mettre a jour le niveau et vérifier si le pseudo a été modifié)
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

    //

  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeIndex('RIOT_Summoner', 'PK_riot_summoner_SummonerId');
    await queryInterface.removeIndex('RIOT_Summoner', 'IDX_riot_summoner_SummonerNameRegion');

    await queryInterface.removeIndex('RIOT_SummonerHistory', 'PK_riot_SummonerHistory_Id');
    await queryInterface.removeIndex('RIOT_SummonerHistory', 'IDX_riot_SummonerHistory_summonerName');

    await queryInterface.dropTable('RIOT_SummonerHistory');
    await queryInterface.dropTable('RIOT_Summoner');
  },
};
