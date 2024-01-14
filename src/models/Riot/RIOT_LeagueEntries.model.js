'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, DataTypes) => {
  class RIOT_LeagueEntries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      RIOT_LeagueEntries.belongsTo(models.RIOT_Summoners, {
          foreignKey: 'summonerId', // Set FK name on SOURCE
          targetKey: 'id', // Key name on TARGET
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
      });

      RIOT_LeagueEntries.belongsTo(models.RIOT_Seasons, {
        foreignKey: 'seasonId', // Set FK name on SOURCE
        targetKey: 'seasonId', // Key name on TARGET
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
    }
  }

  RIOT_LeagueEntries.getModels = function () {
    return this.sequelize.models;
  };

  // https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ
  RIOT_LeagueEntries.init({
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
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
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
      sequelize,
      modelName: 'RIOT_LeagueEntries',
      tableName: 'RIOT_LeagueEntries',
    });

  return RIOT_LeagueEntries;
};