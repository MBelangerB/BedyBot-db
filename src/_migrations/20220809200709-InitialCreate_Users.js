'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    // Common discord value and Shared user info
    await queryInterface.createTable('BOT_Users', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      discordUserId: {
        type: DataTypes.STRING(80),
        field: 'discordUserId',
        allowNull: false,
        // unique: true,
      },
      defaultUsername: {
        type: DataTypes.STRING(32),
        field: 'defaultUsername',
        allowNull: false,
      },
      discriminator: {
        type: DataTypes.STRING(10),
        field: 'discriminator',
        allowNull: false,
      },
      // Custom user info. Shared with all guilds
      switchFriendCode: {
        type: DataTypes.STRING(20),
        field: 'switchFriendCode',
        allowNull: true,
      },
      switchUsername: {
        type: DataTypes.STRING(32),
        field: 'switchUsername',
        allowNull: true,
      },
      twitchUsername: {
        type: DataTypes.STRING(32),
        field: 'twitchUsername',
        allowNull: true,
      },
    },
      {
        comment: 'BOT_Users has discord user information + shared information',
      });

    await queryInterface.addIndex('BOT_Users', {
      fields: ['discordUserId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_bot_users_discordUserId',
    });

    await queryInterface.addIndex('BOT_Users', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_bot_users_id',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_Users', 'PK_bot_users_id');
    await queryInterface.removeIndex('BOT_Users', 'UQ_bot_users_discordUserId');
    await queryInterface.dropTable('BOT_Users');
  },
};
