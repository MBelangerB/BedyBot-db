'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_CommandRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_CommandRoles.belongsTo(models.API_Commands, {
        foreignKey: 'commandId', // Key name on source
        targetKey: 'commandId', // Key name on TARGET
      });

      API_CommandRoles.belongsTo(models.BOT_Roles, {
        foreignKey: 'roleId', // Key name on source
        targetKey: 'roleId', // Key name on TARGET
      });

      API_CommandRoles.belongsTo(models.BOT_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'guildId', // Key name on TARGET
      });
    }
  }

  API_CommandRoles.getModels = function () {
    return this.sequelize.models;
  }


  API_CommandRoles.init({
    commandId: {
      type: DataTypes.UUID,
      field: 'commandId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      // references: {
      //   model: 'API_Commands', // This is a reference to another model
      //   key: 'id', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    guildId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'guildId',
      allowNull: true,
      // J'aime pas ça, la boucle ...
      // references: {
      //   model: 'BOT_Guilds', // This is a reference to another model
      //   key: 'guildId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    roleId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'roleId',
      allowNull: true,
      // references: {
      //   model: 'BOT_Roles',
      //   key: 'roleId',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
    },
    forEveryone: {
      type: DataTypes.BOOLEAN,
      field: 'forEveryone',
      allowNull: false,
      defaultValue: true,
      comment: 'If True, the commands not require a Role.'
    },
    isDeployed: {
      type: DataTypes.BOOLEAN,
      field: 'isDeployed',
      allowNull: false,
      defaultValue: false,
    },
    deployedDate: {
      type: DataTypes.DATE,
      field: 'deployedDate',
      allowNull: true,
    },
  },
    {
      sequelize,
      modelName: 'API_CommandRoles',
      tableName: 'API_CommandRoles',
      // indexes: [
      //   {
      //     name: 'PK_api_commands_id',
      //     unique: true,
      //     fields: [
      //       { name: 'id' },
      //     ],
      //   },
      //   {
      //     name: 'IDX_api_commands_id',
      //     fields: [
      //       { name: 'moduleId' },
      //     ],
      //   },
      // ],
    });

  return API_CommandRoles;
};