'use strict';

const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('API_Users', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      externalId: {
        type: DataTypes.STRING(80),
        field: 'externalId',
        allowNull: false,
      },
      // 1 => Discord - 2 => Twitch
      source: {
        type: DataTypes.INTEGER,
        field: 'source',
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING(32),
        field: 'username',
        allowNull: false,
      },
      discriminator: {
        type: DataTypes.STRING(10),
        field: 'discriminator',
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: true,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('API_Users', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_users_id',
    });

    await queryInterface.addIndex('API_Users', {
      fields: ['externalId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_api_users_externalId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    await queryInterface.removeIndex('BOT_Guilds', 'PK_api_users_id');
    await queryInterface.removeIndex('BOT_Guilds', 'UQ_api_users_externalId');
    await queryInterface.dropTable('API_Users');
  },
};
