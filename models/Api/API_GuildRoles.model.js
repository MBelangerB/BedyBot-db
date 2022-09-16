'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_GuildRoles extends Model {
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

  API_GuildRoles.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'id',
      allowNull: false,
    },
    guildId: {
      type: DataTypes.STRING,
      field: 'guildId',
      allowNull: false,
      // references: {
      //   model: 'API_Guilds',
      //   key: 'guildId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING,
      field: 'permissions',
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      field: 'position',
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      field: 'color',
      allowNull: false,
    },
    lastUpdate: {
      type: DataTypes.DATE,
      field: 'lastUpdate',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'API_GuildRoles',
    tableName: 'API_GuildRoles',
  });

  return API_GuildRoles;
};