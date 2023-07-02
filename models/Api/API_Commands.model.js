'use strict';

const { Model } = require('sequelize');

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
        targetKey: 'id', // Key name on TARGET
      });
    }

    /**
     * Add a new command in DB
     * @param {UUID} moduleId 
     * @param {string} commandName 
     * @param {integer} commandType 
     * @returns {API_Commands}
     */
    static async addCommand(moduleId, commandName, commandType) {
      return await this.create({
        moduleId: moduleId,
        name: commandName,
        commandType: commandType,
        parentId: parentId,
        sessionId: sessionId,
      });
    }

    /**
     * Find a command by id
     * @param {integer} id 
     * @returns {API_Commands}
     */
    static async findCommandById(id) {
      return await this.findOne({ where: { id: id } });
    }

    /**
     * Find all command for a module 
     * @param {UUID} moduleId 
     * @returns {API_Commands}
     */
    static async findAllCommandByModuleId(moduleId) {
      return await this.findAll({ where: { moduleId: moduleId } });
    }

  }

  API_Commands.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'API_Modules',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // applicationCommand (Global) - applicationGuildCommands
    commandType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
    {
      sequelize,
      modelName: 'API_Commands',
      tableName: 'API_Commands',
      indexes: [
        {
          name: 'PK_api_commands_id',
          unique: true,
          fields: [
            { name: 'id' },
          ],
        },
        {
          name: 'IDX_api_commands_id',
          fields: [
            { name: 'moduleId' },
          ],
        },
      ],
    });

  return API_Commands;
};