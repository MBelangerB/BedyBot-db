'use strict';

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

    await queryInterface.createTable('BOT_GuildOptions', {
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
        references: {
          model: 'BOT_Guilds',
          key: 'guildId',
          onDelete: 'CASCADE',
        },
      },
      announcementChannelId: {
        type: DataTypes.STRING,
        field: 'announcementChannelId',
        allowNull: true,
      },
      maxPlayerPerLobby: {
        type: DataTypes.INTEGER,
        field: 'maxPlayerPerLobby',
        allowNull: false,
        defaultValue: 12,
      },
      addEveryone: {
        type: DataTypes.BOOLEAN,
        field: 'addEveryone',
        defaultValue: false,
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
    await queryInterface.dropTable('BOT_GuildOptions');
  },
};
