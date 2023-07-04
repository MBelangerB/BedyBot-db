'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_GuildModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_GuildModules.belongsTo(models.BOT_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'guildId', // Key name on TARGET
      });

      API_GuildModules.belongsTo(models.API_Modules, {
        foreignKey: 'moduleId', // Key name on source
        targetKey: 'moduleId', // Key name on TARGET
      });
    }

  }

  API_GuildModules.getModels = function () {
    return this.sequelize.models;
  };

  API_GuildModules.init({
    guildId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'guildId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      // references: {
      //   model: 'BOT_Guilds', // This is a reference to another model
      //   key: 'guildId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    moduleId: {
      type: DataTypes.UUID,
      field: 'moduleId',
      allowNull: false,
      primaryKey: true,
      unique: true,
      // references: {
      //   model: 'API_Modules',
      //   key: 'id',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
    },
    isActive: {
      type: DataTypes.INTEGER,
      field: 'isActive',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'API_GuildModules',
    tableName: 'API_GuildModules',
    // indexes: [
    //   {
    //     name: 'PK_api_guildModule_id',
    //     unique: true,
    //     fields: [
    //       { name: 'id' },
    //     ],
    //   },
    //   {
    //     name: 'IDX_api_guildModule_moduleId',
    //     fields: [
    //       { name: 'moduleId' },
    //     ],
    //   },
    //   {
    //     name: 'IDX_api_guildModule_guildId',
    //     fields: [
    //       { name: 'guildId' },
    //     ],
    //   },
    // ],
  });

  return API_GuildModules;
};