'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, DataTypes) => {
  class RIOT_Summoner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      RIOT_Summoner.belongsTo(models.RIOT_Account, {
        foreignKey: 'puuid', // Set FK name on SOURCE
        targetKey: 'puuid', // Key name on TARGET
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      RIOT_Summoner.hasMany(models.RIOT_LeagueEntry, {
        foreignKey: 'summonerId', // FK name on TARGET
        sourceKey: 'id', // Key name on SOURCE
        onDelete: 'CASCADE',
      });
    }
  }

  RIOT_Summoner.getModels = function () {
    return this.sequelize.models;
  };

  // https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ
  RIOT_Summoner.init({
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
      primaryKey: true,
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
        model: 'RIOT_Account', // This is a reference to another model
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
    },
  },
    {
      sequelize,
      modelName: 'RIOT_Summoner',
      tableName: 'RIOT_Summoner',
    });

  return RIOT_Summoner;
};