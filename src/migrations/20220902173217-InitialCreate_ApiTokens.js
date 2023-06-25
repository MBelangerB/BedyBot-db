'use strict';

const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('API_Tokens', {
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
          model: 'API_Users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      guildId: {
        type: DataTypes.INTEGER,
        field: 'guildId',
        allowNull: true,
        references: {
          model: 'API_Guilds',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      // 1 => Discord - 2 => Twitch
      source: {
        type: DataTypes.INTEGER,
        field: 'source',
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        field: 'accessToken',
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.STRING,
        field: 'refreshToken',
        allowNull: false,
      },
      scope: {
        type: DataTypes.STRING,
        field: 'scope',
        allowNull: false,
      },
      tokenType: {
        type: DataTypes.STRING,
        field: 'tokenType',
        allowNull: false,
        defaultValue: 'Bearer',
      },
      expireAt: {
        type: DataTypes.DATE,
        field: 'expireAt',
        allowNull: false,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('API_Tokens', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_tokens_id',
    });

    await queryInterface.addIndex('API_Tokens', {
      fields: ['userId'],
      name: 'IDX_api_tokens_userId',
    });

    await queryInterface.addIndex('API_Tokens', {
      fields: ['userId', 'guildId'],
      name: 'IDX_api_tokens_userIdGuildId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    await queryInterface.removeIndex('API_Tokens', 'PK_api_tokens_id');
    await queryInterface.removeIndex('API_Tokens', 'IDX_api_tokens_userId');
    await queryInterface.removeIndex('API_Tokens', 'IDX_api_tokens_userIdGuildId');
    await queryInterface.dropTable('API_Tokens');
  },
};
