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

    await queryInterface.createTable('BOT_Tournaments', {
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
        // references: {
        //   model: 'BOT_Guilds',
        //   key: 'guildId',
        //   onDelete: 'set NULL',
        //   onUpdate: 'CASCADE',
        // },
      },
      ownerId: {
        type: DataTypes.INTEGER,
        field: 'ownerId',
        // references: {
        //   model: 'BOT_Users',
        //   key: 'id',
        //   onDelete: 'set NULL',
        //   onUpdate: 'CASCADE',
        // },
      },
      announcementChannelId: {
        type: DataTypes.STRING,
        field: 'announcementChannelId',
        allowNull: false,
      },
      announcementMessageId: {
        type: DataTypes.STRING,
        field: 'announcementMessageId',
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
    });

    await queryInterface.addIndex('BOT_Tournaments', ['guildId']);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * await queryInterface.removeColumn('users', 'linkedin'),
     */
    await queryInterface.removeIndex('BOT_Tournaments', ['guildId']);
    await queryInterface.dropTable('BOT_Tournaments');
  },
};
