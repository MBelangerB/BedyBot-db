'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_Roles', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      guildId: {
        type: DataTypes.INTEGER,
        field: 'guildId',
        allowNull: false,
        references: {
          model: 'BOT_Guilds',
          key: 'id',
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
      },
      discordRoleId: {
        type: DataTypes.STRING(80),
        field: 'discordRoleId',
        allowNull: false,
        // unique: true,
      },
      discordRoleName: {
        type: DataTypes.STRING(120),
        field: 'discordRoleName',
        allowNull: false,
      },
      discordRoleColor: {
        type: DataTypes.STRING,
        field: 'discordRoleColor',
        allowNull: false,
      },
      // Manager - PLayer
      type: {
        type: DataTypes.INTEGER,
        field: 'type',
        allowNull: false,
      },
    });

    await queryInterface.addIndex('BOT_Roles', {
      fields: ['guildId'],
      name: 'IDX_bot_roles_guildId',
    });

    await queryInterface.addIndex('BOT_Roles', {
      fields: ['discordRoleId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_bot_roles_discordRoleId',
    });

    await queryInterface.addIndex('BOT_Roles', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_bot_roles_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Roles', 'IDX_bot_roles_guildId');
    await queryInterface.removeIndex('BOT_Roles', 'UQ_bot_roles_discordRoleId');
    await queryInterface.removeIndex('BOT_Roles', 'PK_bot_roles_id');
    await queryInterface.dropTable('BOT_Roles');
  },
};
