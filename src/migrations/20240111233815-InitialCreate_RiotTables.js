'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'InitialCreate_RiotTables',

  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {

      // ******************************************
      // RIOT_Config
      // ******************************************
      await queryInterface.createTable('RIOT_Config', {
        id: {
          type: DataTypes.INTEGER,
          field: 'id',
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        currentSeasonId: {
          type: DataTypes.UUID,
          field: 'seasonId',
          allowNull: true,
        },
      }, // end queryInterface.createTable

        {
          transaction: t,
          comment: 'Riot configuration',
        });


      // ******************************************
      // RIOT_Accounts
      // ******************************************
      await queryInterface.createTable('RIOT_Accounts', {
        accountId: {
          type: DataTypes.UUID,
          field: 'accountId',
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        puuid: {
          type: DataTypes.STRING(78),
          field: 'puuid',
          unique: true,
          allowNull: false,
        },
        gameName: {
          type: DataTypes.STRING(16),
          field: 'gameName',
          allowNull: false,
        },
        tagLine: {
          type: DataTypes.STRING(5),
          field: 'tagLine',
          allowNull: false,
        },
      }, // end queryInterface.createTable

        {
          transaction: t,
          comment: 'Riot account details.',
        });

      // ******************************************
      // RIOT_Summoners
      // ******************************************
      await queryInterface.createTable('RIOT_Summoners', {
        // internal key
        summonerId: {
          type: DataTypes.UUID,
          field: 'summonerId',
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        // EncryptedSummonerId
        id: {
          type: DataTypes.STRING(63),
          field: 'id',
          allowNull: false,
          unique: true,
        },
        accountId: {
          type: DataTypes.STRING(56),
          field: 'accountId',
          // primaryKey: true,
          allowNull: false,
        },
        profileIconId: {
          type: DataTypes.INTEGER,
          field: 'profileIconId',
          allowNull: false,
        },
        revisionDate: {
          type: Sequelize.BIGINT.UNSIGNED, // ??
          field: 'revisionDate',
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(16),
          field: 'name',
          allowNull: false,
        },
        puuid: {
          type: DataTypes.STRING(78),
          field: 'puuid',
          allowNull: false,
          unique: true,
          references: {
            model: 'RIOT_Accounts', // This is a reference to another model
            key: 'puuid', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        summonerLevel: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'summonerLevel',
          allowNull: false,
        },
        // Internal
        lastUpdated: {
          type: Sequelize.DATE,
          field: 'lastUpdated',
          allowNull: false,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
      }, {
        transaction: t,
        comment: 'Riot summoner information.',
      });


      // ******************************************
      // RIOT_Seasons
      // ******************************************
      await queryInterface.createTable('RIOT_Seasons', {
        // internal key
        seasonId: {
          type: DataTypes.UUID,
          field: 'seasonId',
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        seasonName: {
          type: DataTypes.STRING(10),
          field: 'seasonName',
          allowNull: false,
        },
        splitNumber: {
          type: DataTypes.INTEGER,
          field: 'splitNumber',
          allowNull: false,
        },
        startDateTime: {
          type: Sequelize.DATE,
          field: 'startDateTime',
          allowNull: true,
        },
        endDateTime: {
          type: Sequelize.DATE,
          field: 'endDateTime',
          allowNull: true,
        },
      }, // end queryInterface.createTable

        {
          transaction: t,
          comment: 'Riot seasons details.',
        });

      // ******************************************
      // RIOT_LeagueEntries
      // ******************************************
      await queryInterface.createTable('RIOT_LeagueEntries', {
        // internal key
        leagueEntryId: {
          type: DataTypes.UUID,
          field: 'leagueEntryId',
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        leagueId: {
          type: DataTypes.STRING,
          field: 'leagueId',
          allowNull: false,
        },
        summonerId: {
          type: DataTypes.STRING(63),
          field: 'summonerId',
          allowNull: false,
          unique: true,
          references: {
            model: 'RIOT_Summoners', // This is a reference to another model
            key: 'id', // This is the column name of the referenced model
          },
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
        summonerName: {
          type: DataTypes.STRING(16),
          field: 'summonerName',
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

        hotStreak: {
          type: DataTypes.BOOLEAN,
          field: 'hotStreak',
          allowNull: false,
          defaultValue: false,
        },
        veteran: {
          type: DataTypes.BOOLEAN,
          field: 'veteran',
          allowNull: false,
          defaultValue: false,
        },
        freshBlood: {
          type: DataTypes.BOOLEAN,
          field: 'freshBlood',
          allowNull: false,
          defaultValue: false,
        },
        inactive: {
          type: DataTypes.BOOLEAN,
          field: 'inactive',
          allowNull: false,
          defaultValue: false,
        },

        // Internal
        lastUpdated: {
          type: Sequelize.DATE,
          field: 'lastUpdated',
          allowNull: false,
          defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        seasonId: {
          type: DataTypes.UUID,
          field: 'seasonId',
          allowNull: true,
          defaultValue: Sequelize.UUIDV4,
          references: {
            model: 'RIOT_Seasons', // This is a reference to another model
            key: 'seasonId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
        {
          transaction: t,
          comment: 'Summoner league entry.',
        });


    }); // End transaction


  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('RIOT_LeagueEntries');
    await queryInterface.dropTable('RIOT_Seasons');
    await queryInterface.dropTable('RIOT_Summoners');
    await queryInterface.dropTable('RIOT_Accounts');
    await queryInterface.dropTable('RIOT_Config');
  },
};
