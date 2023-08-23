'use strict';

const Sequelize = require('sequelize');
const { BedyAPIConst } = require('../BedyAPIConst');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'InitalCreate_ApiModules',

  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {
      // TODO: Lien -> GuildModules

      // ******************************************
      // API_Modules
      // ******************************************
      await queryInterface.createTable('API_Modules', {
        moduleId: {
          type: DataTypes.UUID,
          field: 'moduleId',
          primaryKey: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          field: 'name',
          allowNull: false,
        },
        isEnabled: {
          type: DataTypes.BOOLEAN,
          field: 'isEnabled',
          allowNull: false,
          defaultValue: true,
          comment: 'Permet de définir si le module est disponible de manière globale',
        },
        isPremium: {
          type: DataTypes.BOOLEAN,
          field: 'isPremium',
          allowNull: false,
          defaultValue: false,
          comment: 'Permet de définir si le module est une option premium',
        },
      }, { transaction: t });

      // ******************************************
      // API_ModuleCommands
      // ******************************************
      await queryInterface.createTable('API_Commands', {
        commandId: {
          type: DataTypes.UUID,
          field: 'commandId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        moduleId: {
          type: DataTypes.UUID,
          field: 'moduleId',
          allowNull: false,
          references: {
            model: 'API_Modules',
            key: 'moduleId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
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
        // applicationCommand (Global) - applicationGuildCommands
        applicationCommandType: {
          type: DataTypes.INTEGER,
          field: 'applicationCommandType',
          allowNull: false,
          defaultValue: BedyAPIConst.ApplicationCommandType.APPLICATION_COMMANDS,
        },
      }, { transaction: t });

      // ******************************************
      // API_GuildModules
      // ******************************************
      await queryInterface.createTable('API_GuildModules', {
        guildId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'guildId',
          primaryKey: true,
          // unique: true, // Maybe false
          allowNull: false,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        moduleId: {
          type: DataTypes.UUID,
          field: 'moduleId',
          allowNull: false,
          primaryKey: true,
          unique: true,
          references: {
            model: 'API_Modules',
            key: 'moduleId',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        isActive: {
          type: DataTypes.INTEGER,
          field: 'isActive',
          allowNull: false,
          comment: 'Permet de définir si le module est actif pour une guilde. Gérer par les responsables de la guild.',
        },
      }, { transaction: t });

      // ******************************************
      // API_GuildCommands
      // ******************************************
      await queryInterface.createTable('API_GuildCommands', {
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
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        },
        commandId: {
          type: DataTypes.UUID,
          field: 'commandId',
          // primaryKey: true,
          // unique: true,
          allowNull: false,
          references: {
            model: 'API_Commands', // This is a reference to another model
            key: 'commandId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
      }, { transaction: t });

      // ******************************************
      // API_CommandPermissions
      // ******************************************
      await queryInterface.createTable('API_CommandPermissions', {
        guildCommandId: {
          type: DataTypes.UUID,
          field: 'guildCommandId',
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'API_GuildCommands', // This is a reference to another model
            key: 'guildCommandId', // This is the column name of the referenced model
          },
          defaultValue: Sequelize.UUIDV4,
        },
        roleId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'roleId',
          primaryKey: true,
          // unique: true,
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
      }, { transaction: t });
    }); // End transaction
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('API_CommandPermissions');
    await queryInterface.dropTable('API_GuildCommands');
    await queryInterface.dropTable('API_GuildModules');
    await queryInterface.dropTable('API_Commands');
    await queryInterface.dropTable('API_Modules');
  },
};
