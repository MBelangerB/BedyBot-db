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
    await queryInterface.createTable('API_Roles', {
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
      discordRoleId: {
        type: DataTypes.STRING(80),
        field: 'discordRoleId',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(120),
        field: 'name',
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        field: 'permissions',
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        field: 'position',
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        field: 'color',
        allowNull: false,
      },
      lastUpdate: {
        type: DataTypes.DATE,
        field: 'lastUpdate',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });


    await queryInterface.addIndex('API_Roles', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_roles_id',
    });

    await queryInterface.addIndex('API_Roles', {
      fields: ['guildId', 'discordRoleId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_api_roles_guildIdRoleId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeIndex('API_Roles', 'PK_api_roles_id');
    await queryInterface.removeIndex('API_Roles', 'UQ_api_roles_guildIdRoleId');
    await queryInterface.dropTable('API_Roles');
  },
};
