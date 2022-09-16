'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      models.API_Tokens.hasOne(models.API_Guilds, {
        foreignKey: 'guildId', // Set FK name
        sourceKey: 'guildId', // Source Key In API_Tokens
        onDelete: 'CASCADE',
      });

      models.API_Tokens.hasOne(models.API_Users, {
        foreignKey: 'externalId', // Set FK name in API_Users
        sourceKey: 'apiUserId', // Source Key In API_Tokens
        onDelete: 'CASCADE',
      });
    }

    /**
     * Return the token for a specified token for a source
     * @param {string} token
     * @param {integer} source
     * @returns {API_Tokens}
     */
    static async getTokenByAccessToken(token, source) {
      return await this.findOne({ where: { accessToken: token, source: source } });
    }

    /**
     * Return the token for a specified user id
     * @todo Add source in param
     * @param {string} externalUserId External User id
     * @returns {API_Tokens}
     */
    static async getTokenByExternalUserId(externalUserId) {
      return await this.findOne({ where: { apiUserId: externalUserId } });
    }
  }

  API_Tokens.init({
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    apiUserId: {
      type: DataTypes.STRING,
      field: 'apiUserId',
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      field: 'guildId',
      allowNull: true,
    },
    source: {
      type: DataTypes.INTEGER,
      field: 'source',
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      field: 'accessToken',
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      field: 'refreshToken',
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING,
      field: 'scope',
      allowNull: false,
    },
    tokenType: {
      type: DataTypes.STRING,
      field: 'tokenType',
      allowNull: false,
      defaultValue: 'Bearer',
    },
    expireAt: {
      type: DataTypes.DATE,
      field: 'expireAt',
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'API_Tokens',
    tableName: 'API_Tokens',
  });

  return API_Tokens;
};