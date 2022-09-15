'use strict';

const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('API_Guilds', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        field: 'icon',
        allowNull: true,
      },
      ownerId: {
        type: DataTypes.STRING,
        field: 'ownerId',
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING,
        field: 'region',
        allowNull: true,
      },
      preferred_locale: {
        type: DataTypes.STRING,
        field: 'preferred_locale',
        allowNull: true,
      },
    });

    await queryInterface.createTable('API_GuildUserPermissions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        field: 'userId',
        allowNull: false,
        // references: {
        //   model: 'API_Users',
        //   key: 'externalId',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE',
        // },
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
        // references: {
        //   model: 'API_Guilds',
        //   key: 'guildId',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE',
        // },
      },
      permissions: {
        type: DataTypes.STRING,
        field: 'permissions',
        allowNull: false,
      },
      permissionsNew: {
        type: DataTypes.STRING,
        field: 'permissionsNew',
        allowNull: true,
      },
      isOwner: {
        type: DataTypes.INTEGER,
        field: 'isOwner',
        allowNull: false,
      },
      lastUpdate: {
        type: DataTypes.DATE,
        field: 'lastUpdate',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('API_Guilds', ['guildId']);
    await queryInterface.addIndex('API_GuildUserPermissions', ['guildId', 'userId']);

    // await queryInterface.addConstraint('API_GuildUserPermissions', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'GuildUserPermissions_userId_fkey',
    //   references: {
    //     table: 'API_Users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('API_GuildUserPermissions', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'GuildUserPermissions_guildId_fkey',
    //   references: {
    //     table: 'API_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });


    // await queryInterface.addConstraint('API_Tokens', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'Tokens_guildId_fkey',
    //   references: {
    //     table: 'API_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });
    // await queryInterface.addConstraint('API_Tokens', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'Tokens_userId_fkey',
    //   references: {
    //     table: 'API_Users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });


  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, dataType) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //  await queryInterface.removeConstraint('API_GuildUserPermissions', 'Tokens_guildId_fkey');
    //  await queryInterface.removeConstraint('API_GuildUserPermissions', 'Tokens_userId_fkey');
    //  await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_userId_fkey');
    //  await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_guildId_fkey');
    await queryInterface.removeIndex('API_Guilds', ['guildId']);
    await queryInterface.removeIndex('API_GuildUserPermissions', ['guildId', 'userId']);
    await queryInterface.dropTable('API_Guilds');
    await queryInterface.dropTable('API_GuildUserPermissions');
  },
};
