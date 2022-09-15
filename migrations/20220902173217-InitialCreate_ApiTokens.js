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
      apiUserId: {
        type: DataTypes.STRING,
        field: 'apiUserId',
        allowNull: false,
        // references: {
        //   model: 'API_Users',
        //   key: 'externalId',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE',
        // },
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: true,
        // references: {
        //   model: 'API_Guilds',
        //   key: 'guildId',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE',
        // },
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

    await queryInterface.addIndex('API_Tokens', ['apiUserId']);
    await queryInterface.addIndex('API_Tokens', ['guildId']);
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('API_Tokens', ['guildId']);
    await queryInterface.removeIndex('API_Tokens', ['apiUserId']);
    await queryInterface.dropTable('API_Tokens');
  },
};
