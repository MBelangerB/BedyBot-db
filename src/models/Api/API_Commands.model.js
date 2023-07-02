'use strict';

const { Model, Sequelize} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_Commands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_Commands.belongsTo(models.API_Modules, {
        foreignKey: 'moduleId', // Key name on source
        targetKey: 'moduleId', // Key name on TARGET
      });

      API_Commands.hasMany(models.API_CommandRoles, {
        foreignKey: 'commandId', // FK name on TARGET
        sourceKey: 'commandId', // Key name on SOURCE
        onDelete: 'CASCADE',
      });
    }

    // /**
    //  * Add a new command in DB
    //  * @param {UUID} moduleId
    //  * @param {string} commandName
    //  * @param {integer} commandType
    //  * @returns {API_Commands}
    //  */
    // static async addCommand(moduleId, commandName, commandType) {
    //   return await this.create({
    //     moduleId: moduleId,
    //     name: commandName,
    //     commandType: commandType,
    //   });
    // }

    // /**
    //  * Find a command by id
    //  * @param {integer} id
    //  * @returns {API_Commands}
    //  */
    // static async findCommandById(id) {
    //   return await this.findOne({ where: { id: id } });
    // }

    // /**
    //  * Find all command for a module
    //  * @param {UUID} moduleId
    //  * @returns {API_Commands}
    //  */
    // static async findAllCommandByModuleId(moduleId) {
    //   return await this.findAll({ where: { moduleId: moduleId } });
    // }

  }

  API_Commands.getModels = function () {
    return this.sequelize.models;
  }


  API_Commands.init({
    commandId: {
      type: DataTypes.UUID,
      field: 'commandId',
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    moduleId: {
      type: DataTypes.UUID,
      field: 'moduleId',
      allowNull: false,
      primaryKey: true,
      // references: {
      //   model: 'API_Modules',
      //   key: 'id',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
    },
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      allowNull: false,
    },
    // applicationCommand (Global) - applicationGuildCommands
    isApplicationCommand: {
      type: DataTypes.BOOLEAN,
      field: 'isApplicationCommand',
      allowNull: false,
      defaultValue: true,
      comment: 'If True, it\'s a global command for the bot.'
    },
  },
    {
      sequelize,
      modelName: 'API_Commands',
      tableName: 'API_Commands',
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

  return API_Commands;
};