'use strict';

const Sequelize = require('sequelize');

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_Tournaments', {
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
          model: 'BOT_Guilds',
          key: 'id',
          // onDelete: 'set NULL',
          // onUpdate: 'CASCADE',
        },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: 'ownerId',
        references: {
          model: 'BOT_Users',
          key: 'id',
          // onDelete: 'set NULL',
          // onUpdate: 'CASCADE',
        },
      },
      announcementChannelId: {
        type: DataTypes.STRING(80),
        field: 'announcementChannelId',
        allowNull: false,
      },
      announcementMessageId: {
        type: DataTypes.STRING(80),
        field: 'announcementMessageId',
        allowNull: false,
      },
      startDateTime: {
        type: DataTypes.DATE,
        field: 'startDateTime',
        allowNull: false,
      },
      sessionCount: {
        type: DataTypes.INTEGER,
        field: 'sessionCount',
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: false,
      },
      createAt: {
        type: DataTypes.DATE,
        field: 'createAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('BOT_Tournaments', {
      fields: ['guildId'],
      name: 'IDX_tournaments_guildId',
    });

    await queryInterface.addIndex('BOT_Tournaments', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_tournaments_id',
    });

  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Tournaments', 'IDX_tournaments_guildId');
    await queryInterface.removeIndex('BOT_Tournaments', 'PK_tournaments_id');
    await queryInterface.dropTable('BOT_Tournaments');
  },
};
