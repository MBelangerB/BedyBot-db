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
    }
  }

  API_Tokens.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tokenType: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Bearer',
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: true,
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