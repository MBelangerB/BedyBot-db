'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Channels.belongsTo(models.Channels, {
        foreignKey: 'parentId',
        as: 'parent',
      });
      models.Channels.hasMany(models.Channels, {
        foreignKey: 'parentId',
        as: 'childs',
      });

      models.Channels.belongsTo(models.Sessions, {
        foreignKey: 'sessionId',
        as: 'session',
      });
    }
  }

  Channels.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    guildId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    channelName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelType: {
      // 0 -> Category | 1 -> Text | 2 -> Vocal
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Channels',
    tableName: 'MK_Channels',
  });
  return Channels;
};