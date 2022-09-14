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

    await queryInterface.createTable('BOT_Roles', {
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
          onUpdate: 'CASCADE',
        },
      },
      roleId: {
        type: DataTypes.STRING,
        field: 'roleId',
        allowNull: false,
      },
      roleName: {
        type: DataTypes.STRING,
        field: 'roleName',
        allowNull: false,
      },
      roleColor: {
        type: DataTypes.STRING,
        field: 'roleColor',
        allowNull: false,
      },
      // Manager - PLayer
      type: {
        type: DataTypes.INTEGER,
        field: 'type',
        allowNull: false,
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
    await queryInterface.dropTable('BOT_Roles');
  },
};
