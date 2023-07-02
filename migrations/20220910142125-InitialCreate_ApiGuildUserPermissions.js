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
    await queryInterface.createTable('API_GuildUserPermissions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNull: false,
        references: {
          model: 'API_Users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
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

    await queryInterface.addIndex('API_GuildUserPermissions', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_guildUserPermissions_id',
    });

    await queryInterface.addIndex('API_GuildUserPermissions', {
      fields: ['guildId', 'userId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_api_guildUserPermissions_guildIdUserId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, dataType) => {
    await queryInterface.removeIndex('API_GuildUserPermissions', 'PK_api_guildUserPermissions_id');
    await queryInterface.removeIndex('API_GuildUserPermissions', 'UQ_api_guildUserPermissions_guildIdUserId');
    await queryInterface.dropTable('API_GuildUserPermissions');
  },
};
