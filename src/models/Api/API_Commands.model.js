'use strict';

const { Model, Sequelize} = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

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

      API_Commands.hasMany(models.API_GuildCommands, {
        foreignKey: 'commandId', // FK name on TARGET
        sourceKey: 'commandId', // Key name on SOURCE
        onDelete: 'CASCADE',
      });
    }
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
      // primaryKey: true,
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
    commandType: {
      type: DataTypes.INTEGER,
      field: 'commandType',
      defaultValue: BedyAPIConst.BedyModuleType.GLOBAL,
      allowNull: false,    
    },
    applicationCommandType: {
      type: DataTypes.INTEGER,
      field: 'applicationCommandType',
      allowNull: false,
      defaultValue: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
    },
  },
    {
      sequelize,
      modelName: 'API_Commands',
      tableName: 'API_Commands',
    });

  return API_Commands;
};