'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {

      // ******************************************
      // BOT_Guilds
      // ******************************************
      await queryInterface.createTable('BOT_Guilds', {
        guildId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'guildId',
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        guildName: {
          type: DataTypes.STRING(100),
          field: 'guildName',
          allowNull: false,
        },
        guildIconUrl: {
          type: DataTypes.STRING,
          field: 'guildIconUrl',
          allowNull: true,
        },
        guildBannerUrl: {
          type: DataTypes.STRING,
          field: 'guildBannerUrl',
          allowNull: true,
        },
        guildOwnerId: {
          type: Sequelize.BIGINT.UNSIGNED, // DataTypes.STRING(80),
          field: 'guildOwnerId',
          allowNull: false,
        },
        guildRegion: {
          type: DataTypes.STRING(10),
          field: 'guildRegion',
          allowNull: true,
        },
        guildPreferredLocale: {
          type: DataTypes.STRING(10),
          field: 'guildPreferredLocale',
          allowNull: true,
        },
        commandIsDeployed: {
          type: DataTypes.BOOLEAN,
          field: 'commandIsDeployed',
          allowNull: false,
          defaultValue: false,
        },
        commandDeployedDate: {
          type: DataTypes.DATE,
          field: 'commandDeployedDate',
          allowNull: true,
        },
        isActive: {
          type: DataTypes.BOOLEAN,
          field: 'isActive',
          allowNull: false,
          defaultValue: true,
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
          comment: 'List of discord guilds where the bot has been installed.',
        });

      // ******************************************
      // BOT_GuildOptions
      // ******************************************
      await queryInterface.createTable('BOT_GuildOptions', {
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
        // Todo: Move to « Module » table ?
        announcementChannelId: {
          type: Sequelize.BIGINT.UNSIGNED,
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
      }, { transaction: t });

      // ******************************************
      // BOT_Roles
      // ******************************************
      await queryInterface.createTable('BOT_Roles', {
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
        roleId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'roleId',
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        roleName: {
          type: DataTypes.STRING(120),
          field: 'roleName',
          allowNull: false,
        },
        rolePermission: {
          type: DataTypes.STRING(255),
          field: 'permissionLevel',
          allowNull: false,
        },
        roleColor: {
          type: DataTypes.INTEGER,
          field: 'color',
          allowNull: true,
        },
        rolePosition: {
          type: DataTypes.INTEGER,
          field: 'position',
          allowNull: true,
        },
        type: {
          type: DataTypes.INTEGER,
          field: 'type',
          allowNull: true,
        },
        lastUpdate: {
          type: DataTypes.DATE,
          field: 'lastUpdated',
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
        {
          transaction: t,
        });
    });

  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('BOT_Roles');
    await queryInterface.dropTable('BOT_GuildOptions');
    await queryInterface.dropTable('BOT_Guilds');
  },
};
