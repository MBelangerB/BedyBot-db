import { QueryInterface, DataTypes, literal } from 'sequelize';
import { BedyAPIConst } from '../BedyAPIConst';

/** @type {import('sequelize-cli').Migration} */
  export async function up(queryInterface: QueryInterface) {
    return queryInterface.sequelize.transaction(async (t) => {

      // ******************************************
      // BOT_Guilds
      // ******************************************
      await queryInterface.createTable('BOT_Guilds', {
        guildId: {
          type: DataTypes.BIGINT.UNSIGNED,
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
          type: DataTypes.BIGINT.UNSIGNED,
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
          defaultValue: literal('CURRENT_TIMESTAMP'),
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

      // ******************************************
      // BOT_GuildOptions
      // ******************************************
      await queryInterface.createTable('BOT_GuildOptions', {
        guildId: {
          type: DataTypes.BIGINT.UNSIGNED,
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
          type: DataTypes.BIGINT.UNSIGNED,
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
          type: DataTypes.BIGINT.UNSIGNED,
          field: 'guildId',
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        roleId: {
          type: DataTypes.BIGINT.UNSIGNED,
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
          defaultValue: literal('CURRENT_TIMESTAMP'),
        },
      },
        {
          transaction: t,
        });

      // ******************************************
      // BOT_Channels
      // ******************************************
      await queryInterface.createTable('BOT_Channels', {
        channelId: {
          type: DataTypes.BIGINT.UNSIGNED,
          field: 'guildId',
          primaryKey: true,
          unique: true,
          allowNull: false,
        },
        guildId: {
          type: DataTypes.BIGINT.UNSIGNED,
          field: 'guildId',
          allowNull: true,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        channelParentId: {
          type: DataTypes.BIGINT.UNSIGNED,
          field: 'channelParentId',
          allowNull: false,
          comment:'A parent category can contains max 50 channels'
        },
        /**
         * @param {BedyAPIConst.DiscordChannelTypes}
         */
        channelType: {
          type: DataTypes.INTEGER,
          field: 'channelType',
          allowNull: false,
        },
        channelName: {
          type: DataTypes.STRING(100),
          field: 'channelName',
          allowNull: true,
        },
        channelTopic: {
          type: DataTypes.STRING(4096),
          field: 'channelTopic',
          allowNull: true,
        },
        channelPermission: {
          type: DataTypes.STRING(255),
          field: 'channelPermission',
          allowNull: true,
        }, 
      },
        {
          transaction: t
        });

    }); // End transaction

  }

export async function down(queryInterface: QueryInterface) {
  return queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('BOT_Channels', { transaction });
    await queryInterface.dropTable('BOT_Roles', { transaction });
    await queryInterface.dropTable('BOT_GuildOptions', { transaction });
    await queryInterface.dropTable('BOT_Guilds', { transaction });
  });
}