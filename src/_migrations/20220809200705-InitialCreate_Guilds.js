'use strict';

const Sequelize = require('sequelize');

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_Guilds', {
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
      discordGuildName: {
        type: DataTypes.STRING(120),
        field: 'discordGuildName',
        allowNull: false,
      },
      discordGuildIconUrl: {
        type: DataTypes.STRING,
        field: 'discordGuildIconUrl',
        allowNull: true,
      },
      discordGuildOwnerId: {
        type: DataTypes.STRING(80),
        field: 'discordGuildOwnerId',
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'isActive',
        allowNull: false,
        defaultValue: true,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      leftAt: {
        type: DataTypes.DATE,
        field: 'leftAt',
        allowNull: true,
      },
    },
      {
        comment: 'List of discord guilds where the bot has been installed.',
      });

    // Index
    await queryInterface.addIndex('BOT_Guilds', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_bot_guilds_id',
    });

    await queryInterface.addIndex('BOT_Guilds', {
      fields: ['discordGuildId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_bot_guilds_discordGuildId',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Guilds', 'UQ_bot_guilds_discordGuildId');
    await queryInterface.removeIndex('BOT_Guilds', 'PK_bot_guilds_id');
    await queryInterface.dropTable('BOT_Guilds');
  },
};
