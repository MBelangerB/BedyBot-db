'use strict';

const Sequelize = require('sequelize');

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('API_DiscordUsers', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'userId',
        allowNull: false,
        references: {
          model: 'API_Users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      },
      // 1 => Discord - 2 => Twitch
      discriminator: {
        type: DataTypes.STRING(10),
        field: 'discriminator',
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        field: 'avatar',
        allowNull: true,
      },
      banner: {
        type: DataTypes.STRING,
        field: 'banner',
        allowNull: true,
      },
      bannerColor: {
        type: DataTypes.STRING,
        field: 'bannerColor',
        allowNull: true,   
      },
      accentColor: {
        type: DataTypes.INTEGER,
        field: 'accentColor',
        allowNull: true,
      },    
    });

    await queryInterface.addIndex('API_DiscordUsers', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_api_discordUser_id',
    });

    await queryInterface.addIndex('API_DiscordUsers', {
      fields: ['userId'],
      unique: true,
      type: 'UNIQUE',
      name: 'UQ_api_discordUser_externalId',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, dataType) {
    await queryInterface.removeIndex('BOT_Guilds', 'PK_api_discordUser_id');
    await queryInterface.removeIndex('BOT_Guilds', 'UQ_api_discordUser_externalId');
    await queryInterface.dropTable('API_DiscordUsers');
  },
};
