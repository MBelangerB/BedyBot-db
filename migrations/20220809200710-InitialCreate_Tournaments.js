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

    await queryInterface.createTable('Tournaments', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
      },
      channelId: {
        type: DataTypes.STRING,
        field: 'channelId',
        allowNull: false,
      },
      messageId: {
        type: DataTypes.STRING,
        field: 'messageId',
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
      ts: {
        type: DataTypes.DATE,
        field: 'ts',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: 'ownerId',
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
    await queryInterface.dropTable('Tournaments');
  },
};
