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

    await queryInterface.createTable('Channels', {
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
      parentId: {
        type: DataTypes.INTEGER,
        field: 'parentId',
        allowNull: true,
      },
      sessionId: {
        type: DataTypes.INTEGER,
        field: 'sessionId',
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
    await queryInterface.dropTable('Channels');
  },
};
