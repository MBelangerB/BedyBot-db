'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_CommandPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_CommandPermissions.belongsTo(models.API_GuildCommands, {
        foreignKey: 'guildCommandId', // Key name on source
        targetKey: 'guildCommandId', // Key name on TARGET
      });

      API_CommandPermissions.belongsTo(models.BOT_Roles, {
        foreignKey: 'roleId', // Key name on source
        targetKey: 'roleId', // Key name on TARGET
      });
    }

  }

  API_CommandPermissions.getModels = function () {
    return this.sequelize.models;
  };

  API_CommandPermissions.init({
    guildCommandId: {
      type: DataTypes.UUID,
      field: 'guildCommandId',
      primaryKey: true,
      allowNull: false,
      // references: {
      //   model: 'API_GuildCommands', // This is a reference to another model
      //   key: 'guildCommandId', // This is the column name of the referenced model
      // },
      defaultValue: Sequelize.UUIDV4,
    },
    roleId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'roleId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      references: {
        model: 'BOT_Roles', // This is a reference to another model
        key: 'roleId', // This is the column name of the referenced model
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    ts: {
      type: DataTypes.DATE,
      field: 'ts',
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'API_CommandPermissions',
    tableName: 'API_CommandPermissions',
  });

  return API_CommandPermissions;
};