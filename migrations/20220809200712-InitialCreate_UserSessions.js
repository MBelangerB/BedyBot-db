'use strict';

const Sequelize = require('sequelize');

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_UserSessions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        field: 'sessionId',
        allowNull: false,
        references: {
          model: 'BOT_Sessions',
          key: 'id',
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
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
      voiceChannelId: {
        type: DataTypes.INTEGER,
        field: 'voiceChannelId',
        allowNull: true,
        references: {
          model: 'BOT_Channels',
          key: 'id',
        },
      },
      textChannelId: {
        type: DataTypes.INTEGER,
        field: 'textChannelId',
        allowNull: true,
        references: {
          model: 'BOT_Channels',
          key: 'id',
        },
      },
      ts: {
        type: DataTypes.DATE,
        field: 'ts',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('BOT_UserSessions', {
      fields: ['userId', 'sessionId'],
      name: 'IDX_userSession_userIdSessionId',
    });

    await queryInterface.addIndex('BOT_UserSessions', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_userSession_id',
    });

  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Sessions', 'IDX_userSession_userIdSessionId');
    await queryInterface.removeIndex('BOT_Sessions', 'PK_userSession_id');
    await queryInterface.dropTable('BOT_UserSessions');
  },
};
