'use strict';

// const Sequelize = require('sequelize');

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
        type: DataTypes.STRING,
        field: 'id',
        primaryKey: true,
        allowNull: false,
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
    });

    await queryInterface.createTable('API_GuildUserPermissions', {
      userId: {
        type: DataTypes.STRING,
        field: 'userId',
        allowNull: false,
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        field: 'permissions',
        allowNull: false,
      },
      permissions_new: {
        type: DataTypes.STRING,
        field: 'permissions_new',
        allowNull: true,
      },
      owner: {
        type: DataTypes.INTEGER,
        field: 'owner',
        allowNull: false,
      },
      ts: {
        type: DataTypes.DATE,
        field: 'ts',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('API_GuildUserPermissions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'GuildUserPermissions_userId_fkey',
      references: {
        table: 'API_Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('API_GuildUserPermissions', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildUserPermissions_guildId_fkey',
      references: {
        table: 'API_Guilds',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, dataType) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_userId_fkey');
     await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_guildId_fkey');
     await queryInterface.dropTable('API_Guilds');
     await queryInterface.dropTable('API_GuildUserPermissions');
  },
};
