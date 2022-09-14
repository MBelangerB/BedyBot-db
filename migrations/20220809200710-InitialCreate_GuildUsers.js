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

    await queryInterface.createTable('BOT_GuildUsers', {
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
        references: {
          model: 'BOT_Users',
          key: 'userId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
        references: {
          model: 'BOT_Guilds',
          key: 'guildId',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      username: {
        type: DataTypes.STRING,
        field: 'username',
        allowNull: false,
      },
      joinedAt: {
        type: DataTypes.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
    await queryInterface.dropTable('BOT_GuildUsers');
  },
};
