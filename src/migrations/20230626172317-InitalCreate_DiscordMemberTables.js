'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {
      // ******************************************
      // BOT_Users
      // ******************************************
      await queryInterface.createTable('BOT_Users', {
        userId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'userId',
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(32),
          field: 'username',
          allowNull: false,
        },
        globalUsername: {
          type: DataTypes.STRING(32),
          field: 'globalUsername',
          allowNull: true,
        },
        discriminator: {
          type: DataTypes.STRING(10),
          field: 'discriminator',
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          field: 'email',
          allowNull: true,
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
        accentColor: {
          type: DataTypes.INTEGER,
          field: 'accentColor',
          allowNull: true,
        },
      },
        {
          transaction: t,
        });

      // ******************************************
      // BOT_UserDetails
      // ******************************************
      await queryInterface.createTable('BOT_UserDetails', {
        userId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'userId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          references: {
            model: 'BOT_Users', // This is a reference to another model
            key: 'userId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
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
          transaction: t,
        });

      // ******************************************
      // BOT_GuildUser
      // ******************************************
      await queryInterface.createTable('BOT_GuildUser', {
        guildId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'guildId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        userId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'userId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          references: {
            model: 'BOT_Users', // This is a reference to another model
            key: 'userId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        nickname: {
          type: DataTypes.STRING(120),
          field: 'nickname',
          allowNull: true,
        },
        avatar: {
          type: DataTypes.STRING,
          field: 'avatar',
          allowNull: true,
        },
        joinedAt: {
          type: DataTypes.DATE,
          field: 'joinedAt',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        leftAt: {
          type: DataTypes.DATE,
          field: 'leftAt',
          allowNull: true,
        },
      },
        {
          transaction: t,
        });
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('BOT_GuildUser');
    await queryInterface.dropTable('BOT_UserDetails');
    await queryInterface.dropTable('BOT_Users');
  },
};
