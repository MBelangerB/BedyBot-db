'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_Sessions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        field: 'tournamentId',
        references: {
          model: 'BOT_Tournaments',
          key: 'id',
          // onDelete: 'Set NULL',
          // onUpdate: 'CASCADE',
        },
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
    });

    await queryInterface.addIndex('BOT_Sessions', {
      fields: ['tournamentId'],
      name: 'IDX_bot_sessions_tournamentId',
    });

    await queryInterface.addIndex('BOT_Sessions', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_bot_sessions_id',
    });

  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Sessions', 'IDX_bot_sessions_tournamentId');
    await queryInterface.removeIndex('BOT_Sessions', 'PK_bot_sessions_id');
    await queryInterface.dropTable('BOT_Sessions');
  },
};
