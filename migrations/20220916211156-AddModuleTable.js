'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    // *************************
    // Modules
    // *************************
    await queryInterface.createTable('API_Modules', {
      id: {
        type: DataTypes.UUID,
        field: 'id',
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
    });

    await queryInterface.addIndex('API_Modules', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_modules_id',
    });

    // *************************
    // Commands
    // *************************
    await queryInterface.createTable('API_Commands', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      moduleId: {
        type: DataTypes.UUID,
        field: 'moduleId',
        allowNull: false,
        references: {
          model: 'API_Modules',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      // applicationCommand (Global) - applicationGuildCommands
      commandType: {
        type: DataTypes.INTEGER,
        field: 'commandType',
        allowNull: false,
      },
    });

    await queryInterface.addIndex('API_Commands', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_commands_id',
    });
    await queryInterface.addIndex('API_Commands', {
      fields: ['moduleId'],
      name: 'IDX_api_commands_id',
    });

    // *************************
    // Guild Modules
    // *************************
    await queryInterface.createTable('API_GuildModules', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      moduleId: {
        type: DataTypes.UUID,
        field: 'moduleId',
        allowNull: false,
        references: {
          model: 'API_Modules',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      guildId: {
        type: DataTypes.INTEGER,
        field: 'guildId',
        allowNull: false,
        references: {
          model: 'API_Guilds',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      // 1allowForAllExcept - 2:disallowForAllExcept
      authorizationType: {
        type: DataTypes.INTEGER,
        field: 'authorizationType',
        allowNull: false,
      },
      isActive: {
        type: DataTypes.INTEGER,
        field: 'isActive',
        allowNull: false,
        comment: 'Permet de définir si le module est actif pour une guilde. Gérer par les responsables de la guild',
      },
    });
    await queryInterface.addIndex('API_GuildModules', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_guildModule_id',
    });
    await queryInterface.addIndex('API_GuildModules', {
      fields: ['moduleId'],
      name: 'IDX_api_guildModule_moduleId',
    });
    await queryInterface.addIndex('API_GuildModules', {
      fields: ['guildId'],
      name: 'IDX_api_guildModule_guildId',
    });


    // *************************
    // GuildModuleRoles
    // *************************
    await queryInterface.createTable('API_GuildModuleRoles', {
      guildModuleId: {
        type: DataTypes.INTEGER,
        field: 'guildModuleId',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'API_GuildModules',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        field: 'roleId',
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'API_Roles',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
    },
      {
        comment: 'Définir les roles qui ont le droit d\'utiliser les commandes du modules.',
      });

    // await queryInterface.addIndex('API_GuildModuleRoles', {
    //   fields: ['guildModuleId', 'roleId'],
    //   unique: true,
    //   type: 'UNIQUE',
    //   name: 'PK_api_guildModuleRoles_idRoleId',
    // });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeIndex('API_Modules', 'PK_api_modules_id');
    await queryInterface.removeIndex('API_Commands', 'PK_api_roles_id');
    await queryInterface.removeIndex('API_Commands', 'IDX_api_commands_id');
    await queryInterface.removeIndex('API_Roles', 'PK_api_roles_id');
    await queryInterface.removeIndex('API_Roles', 'PK_api_roles_id');
    await queryInterface.removeIndex('API_Roles', 'PK_api_roles_id');
    await queryInterface.removeIndex('API_GuildModules', 'PK_api_guildModule_id');
    await queryInterface.removeIndex('API_GuildModules', 'IDX_api_guildModule_moduleId');
    await queryInterface.removeIndex('API_GuildModules', 'IDX_api_guildModule_guildId');
    // await queryInterface.removeIndex('API_GuildModuleRoles', 'PK_api_guildModuleRoles_idRoleId');
    await queryInterface.removeIndex('API_GuildModuleRoles', ['guildModuleId', 'roleId']);


    await queryInterface.dropTable('API_GuildModuleRoles');
    await queryInterface.dropTable('API_GuildModules');
    await queryInterface.dropTable('API_Commands');
    await queryInterface.dropTable('API_Modules');
  },
};
