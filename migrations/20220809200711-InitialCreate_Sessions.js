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

    await queryInterface.createTable('Sessions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sessionNumber: {
        type: DataTypes.INTEGER,
        field: 'sessionNumber',
        allowNull: false,
      },
      startDateTime: {
        type: DataTypes.DATE,
        field: 'startDateTime',
        allowNull: false,
      },
      duration: {
        type: DataTypes.INTEGER,
        field: 'duration',
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER,
        field: 'status',
        allowNull: false,
        defaultValue: 1,
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        field: 'tournamentId',
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
    await queryInterface.dropTable('Sessions');
  },
};
