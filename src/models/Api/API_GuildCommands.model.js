'use strict';

const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_GuildCommands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_GuildCommands.belongsTo(models.API_Commands, {
        foreignKey: 'commandId', // Key name on source
        targetKey: 'commandId', // Key name on TARGET
      });

      API_GuildCommands.hasMany(models.API_CommandPermissions, {
        foreignKey: 'guildCommandId', // Set FK name on TARGET
        sourceKey: 'guildCommandId', // Source Key In SOURCE
        onDelete: 'CASCADE',
    });

      API_GuildCommands.belongsTo(models.BOT_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'guildId', // Key name on TARGET
      });
    }
  }

  API_GuildCommands.getModels = function () {
    return this.sequelize.models;
  };


  API_GuildCommands.init({
    guildCommandId: {
      type: DataTypes.UUID,
      field: 'guildCommandId',
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    guildId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'guildId',
      allowNull: false,
      // references: {
      //   model: 'BOT_Guilds', // This is a reference to another model
      //   key: 'guildId', // This is the column name of the referenced model
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE',
      // },
    },
    commandId: {
      type: DataTypes.UUID,
      field: 'commandId',
      // primaryKey: true,
      // unique: true,
      allowNull: false,
      // references: {
      //   model: 'API_Commands', // This is a reference to another model
      //   key: 'commandId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    discordCommandId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'discordCommandId',
      allowNull: true,
    },
    allowFor: {
      type: DataTypes.BOOLEAN,
      field: 'allowFor',
      allowNull: false,
      defaultValue: false,
      comment: '',
    },
    deniedFor: {
      type: DataTypes.BOOLEAN,
      field: 'deniedFor',
      allowNull: false,
      defaultValue: false,
      comment: '',
    },
    isActive: {
      type: DataTypes.INTEGER,
      field: 'isActive',
      allowNull: false,
      comment: 'Permet de définir si la commande est actif pour une guilde. Gérer par les responsables de la guild.',
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
      modelName: 'API_GuildCommands',
      tableName: 'API_GuildCommands',
    });

  return API_GuildCommands;
};