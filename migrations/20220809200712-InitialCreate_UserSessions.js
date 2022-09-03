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

    await queryInterface.createTable('UserSessions', {
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
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNull: false,
      },
      voiceChannelId: {
        type: DataTypes.INTEGER,
        field: 'voiceChannelId',
      },
      textChannelId: {
        type: DataTypes.INTEGER,
        field: 'textChannelId',
      },
      ts: {
        type: DataTypes.DATE,
        field: 'ts',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      // sessionsId: {
      //   type: DataTypes.INTEGER,
      //   field: 'sessionsId'
      // },
      // usersId: {
      //   type: DataTypes.INTEGER,
      //   field: 'usersId'
      // }
    });

    await queryInterface.addIndex('UserSessions', ['UserId', 'SessionId']);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * await queryInterface.removeColumn('users', 'linkedin'),
     */
    await queryInterface.removeIndex('UserSessions', ['UserId', 'SessionId']);
    await queryInterface.dropTable('UserSessions');
  },
};
