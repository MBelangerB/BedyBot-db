'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
        isEnabled: { // TODO a ajouté
          type: DataTypes.INTEGER,
          field: 'isEnabled',
          allowNull: false,
          defaultValue: true,
          comment: 'Permet de définir si le module est disponible de manière globale',
        },
        isPremium: {
          type: DataTypes.INTEGER,
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
        // applicationCommand (Global) - applicationGuildCommands
        isApplicationCommand: {
          type: DataTypes.BOOLEAN,
          field: 'isApplicationCommand',
          allowNull: false,
          defaultValue: true,
          comment: 'If True, it\'s a global command for the bot.'
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
          unique: true,
          allowNull: false,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
      });

      // ******************************************
      // API_CommandRoles
      // ******************************************
      await queryInterface.createTable('API_CommandRoles', {
        commandId: {
          type: DataTypes.UUID,
          field: 'commandId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          references: {
            model: 'API_Commands', // This is a reference to another model
            key: 'commandId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
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
        }
      });

    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('API_CommandRoles');
    await queryInterface.dropTable('API_GuildModules');
    await queryInterface.dropTable('API_Commands');
    await queryInterface.dropTable('API_Modules');
  }
};
