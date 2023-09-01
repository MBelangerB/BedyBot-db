'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'InitialCreate_ApiAuth',

  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {

      // ******************************************
      // API_Users
      // ******************************************
      await queryInterface.createTable('API_Users', {
        // Content
      }, { transaction: t });

      // ******************************************
      // API_UserToken
      // ******************************************
      await queryInterface.createTable('API_UserToken', {
        // Content
      }, { transaction: t });

      // ******************************************
      // API_User
      // ******************************************
      await queryInterface.createTable('API_UserToken', {
        // Content
      }, { transaction: t });

    });

  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.dropTable('BOT_GuildOptions');
  },
};
