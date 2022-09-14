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

    await queryInterface.createTable('BOT_Channels', {
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
      sessionId: {
        type: DataTypes.INTEGER,
        field: 'sessionId',
        allowNull: true,
        references: {
          model: 'BOT_Sessions',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'set NULL',
        },
      },
      parentId: {
        type: DataTypes.INTEGER,
        field: 'parentId',
        allowNull: true,
        references: {
          model: 'BOT_Channels',
          key: 'id',
          onDelete: 'CASCADE',
        },
      },
      channelId: {
        type: DataTypes.STRING,
        field: 'channelId',
        allowNull: false,
        unique: true,
      },
      channelName: {
        type: DataTypes.STRING,
        field: 'channelName',
        allowNull: false,
      },
      channelType: {
        type: DataTypes.STRING,
        field: 'channelType',
        allowNull: false,
      },
    },
      {
        comment: 'Discord channels information who are create for a tournament.',
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
    await queryInterface.dropTable('BOT_Channels');
  },
};
