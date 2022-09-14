'use strict';

const Sequelize = require('sequelize');

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     *
     * Add Column:
     * await queryInterface.addColumn('users', // table name
        'twitter', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
     */

    // Common discord value and Shared user info
    await queryInterface.createTable('BOT_Users', {
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
      defaultUsername: {
        type: DataTypes.STRING,
        field: 'defaultUsername',
        allowNull: false,
      },
      discriminator: {
        type: DataTypes.STRING(10),
        field: 'discriminator',
        allowNull: false,
      },
      // Custom user info. Shared with all guilds
      switchFriendCode: {
        type: DataTypes.STRING,
        field: 'switchFriendCode',
        allowNull: true,
      },
      switchUsername: {
        type: DataTypes.STRING,
        field: 'switchUsername',
        allowNull: true,
      },
      twitchUsername: {
        type: DataTypes.STRING,
        field: 'twitchUsername',
        allowNull: true,
      },
    });

  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * await queryInterface.removeColumn('users', 'linkedin'),
     */
    await queryInterface.dropTable('BOT_Users');
  },
};
