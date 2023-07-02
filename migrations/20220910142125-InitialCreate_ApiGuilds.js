'use strict';

/* eslint-disable-next-line no-unused-vars */
const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('API_Guilds', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      discordGuildId: {
        type: DataTypes.STRING(80),
        field: 'discordGuildId',
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(120),
        field: 'name',
        allowNull: false,
      },
      icon: {
        type: DataTypes.STRING,
        field: 'icon',
        allowNull: true,
      },
      ownerId: {
        type: DataTypes.STRING(80),
        field: 'ownerId',
        allowNull: true,
      },
      region: {
        type: DataTypes.STRING(10),
        field: 'region',
        allowNull: true,
      },
      preferred_locale: {
        type: DataTypes.STRING(10),
        field: 'preferred_locale',
        allowNull: true,
      },
    });

    await queryInterface.addIndex('API_Guilds', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_guilds_id',
    });

    await queryInterface.addIndex('API_Guilds', {
      fields: ['discordGuildId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_api_guilds_guildId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, dataType) => {
    await queryInterface.removeIndex('API_Guilds', 'PK_api_guilds_id');
    await queryInterface.removeIndex('API_Guilds', 'UQ_api_guilds_guildId');
    await queryInterface.dropTable('API_Guilds');
  },
};
