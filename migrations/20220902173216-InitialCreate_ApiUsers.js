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
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      externalId: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
        unique: true,
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

    await queryInterface.addIndex('API_Users', ['externalId']);
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeIndex('API_Users', ['externalId']);
    await queryInterface.dropTable('API_Users');
  },
};
