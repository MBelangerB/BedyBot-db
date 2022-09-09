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
    await queryInterface.createTable('API_Users', {
      id: {
        type: DataTypes.STRING,
        field: 'id',
        primaryKey: true,
        // autoIncrement: true,
        allowNull: false,
      },
      // 1 => Discord - 2 => Twitch
      source: {
        type: DataTypes.INTEGER,
        field: 'source',
        allowNull: false,
      },
      // userId: {
      //   type: DataTypes.STRING,
      //   field: 'userId',
      //   allowNull: false,
      //   unique: true,
      // },
      avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
        allowNull: true,
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
        unique: true,
      },
      discriminator: {
        type: DataTypes.STRING(4),
        field: 'discriminator',
        allowNull: false,
      },
      // password: {
      //   type: DataTypes.STRING,
      //   field: 'password',
      //   allowNull: false,
      // },
      email: {
        type: DataTypes.STRING,
        field: 'email',
        allowNull: false,
      },
      // salt: {
      //   type: DataTypes.STRING,
      //   field: 'salt',
      //   allowNull: true,
      // },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });


    await queryInterface.createTable('API_Tokens', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        field: 'userId',
        allowNull: false,
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
      // scope: {
      //   type: DataTypes.STRING,
      //   field: 'scope',
      //   allowNull: false,
      // },
      tokenType: {
        type: DataTypes.STRING,
        field: 'tokenType',
        allowNull: false,
      },
      // expireAt: {
      //   type: DataTypes.DATE,
      //   field: 'expireAt',
      //   allowNull: false,
      // },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('API_Tokens');
    await queryInterface.dropTable('API_Users');
    // await queryInterface.dropTable('API_Clients');
  },
};
