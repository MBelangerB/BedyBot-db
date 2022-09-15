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
    await queryInterface.createTable('BOT_Guilds', {
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
        unique: true,
      },
      guildName: {
        type: DataTypes.STRING,
        field: 'guildName',
        allowNull: false,
      },
      guildIconUrl: {
        type: DataTypes.STRING,
        field: 'guildIconUrl',
        allowNull: true,
      },
      guildOwnerId: {
        type: DataTypes.STRING,
        field: 'guildOwnerId',
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        field: 'isActive',
        allowNull: false,
        defaultValue: true,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      leftAt: {
        type: DataTypes.DATE,
        field: 'leftAt',
        allowNull: true,
      },
    },
      {
        comment: 'List of discord guilds where the bot has been installed.',
      });

    await queryInterface.addIndex('BOT_Guilds', ['guildId']);
  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * await queryInterface.removeColumn('users', 'linkedin'),
     */
    await queryInterface.removeIndex('BOT_Guilds', ['guildId']);
    await queryInterface.dropTable('BOT_Guilds');
  },
};
