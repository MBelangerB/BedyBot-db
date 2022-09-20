'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_Channels', {
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
        allowNull: true,
        references: {
          model: 'BOT_Sessions',
          key: 'id',
          // onUpdate: 'CASCADE',
          // onDelete: 'set NULL',
        },
      },
      parentId: {
        type: DataTypes.INTEGER,
        field: 'parentId',
        allowNull: true,
        references: {
          model: 'BOT_Channels',
          key: 'id',
          // onDelete: 'CASCADE',
        },
      },
      discordChannelId: {
        type: DataTypes.STRING(80),
        field: 'discordChannelId',
        allowNull: false,
        unique: true,
      },
      discordChannelName: {
        type: DataTypes.STRING(120),
        field: 'discordChannelName',
        allowNull: false,
      },
      discordChannelType: {
        type: DataTypes.INTEGER,
        field: 'discordChannelType',
        allowNull: false,
      },
    },
      {
        comment: 'Discord channels information who are create for a tournament.',
      });

    await queryInterface.addIndex('BOT_Channels', {
      fields: ['sessionId'],
      name: 'IDX_channels_sessionId',
    });

    await queryInterface.addIndex('BOT_Channels', {
      fields: ['discordChannelId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_channels_discordChannelId',
    });

    await queryInterface.addIndex('BOT_Channels', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_channels_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Channels', 'IDX_channels_sessionId');
    await queryInterface.removeIndex('BOT_Channels', 'UQ_channels_discordChannelId');
    await queryInterface.removeIndex('BOT_Channels', 'PK_channels_id');
    await queryInterface.dropTable('BOT_Channels');
  },
};
