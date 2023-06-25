'use strict';

const Sequelize = require('sequelize');

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_GuildUsers', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNull: false,
        references: {
          model: 'BOT_Users',
          key: 'id',
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
      },
      guildId: {
        type: DataTypes.INTEGER,
        field: 'guildId',
        allowNull: false,
        references: {
          model: 'BOT_Guilds',
          key: 'id',
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
      },
      nickname: {
        type: DataTypes.STRING(120),
        field: 'nickname',
        allowNull: true,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('BOT_GuildUsers', {
      fields: ['userId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_bot_guildUsers_userId',
    });

    await queryInterface.addIndex('BOT_GuildUsers', {
      fields: ['guildId'],
      name: 'IDX_bot_guildUsers_guildId',
    });

    await queryInterface.addIndex('BOT_GuildUsers', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_bot_guildUsers_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_GuildUsers', 'UQ_bot_guildUsers_userId');
    await queryInterface.removeIndex('BOT_GuildUsers', 'IDX_bot_guildUsers_guildId');
    await queryInterface.removeIndex('BOT_GuildUsers', 'PK_bot_guildUsers_id');
    await queryInterface.dropTable('BOT_GuildUsers');
  },
};
