'use strict';

const Sequelize = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  name: 'InitalCreate_NotificationModule',

  async up(queryInterface, DataTypes) {
    return queryInterface.sequelize.transaction(async (t) => {

      // ******************************************
      // MOD_Notification
      // ******************************************
      await queryInterface.createTable('MOD_Notifications', {
        notificationId: {
          type: DataTypes.UUID,
          field: 'notificationId',
          primaryKey: true,
          unique: true,
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
        },
        guildId: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'guildId',
          allowNull: true,
          references: {
            model: 'BOT_Guilds', // This is a reference to another model
            key: 'guildId', // This is the column name of the referenced model
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        channelId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'channelId',
            allowNull: true,
            references: {
              model: 'BOT_Channels', // This is a reference to another model
              key: 'channelId', // This is the column name of the referenced model
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        notificationMessage: {
          type: DataTypes.TEXT,
          field: 'notificationMessage',
          allowNull: false,
        },
        // BedyAPIConst.NotificationType
        notificationType: {
          type: DataTypes.INTEGER,
          field: 'notificationType',
          allowNull: false,
        },
        // Pas sur de comment le gérer (nom de la chaine)
        notificationTarget: {
          type: DataTypes.STRING(100),
          field: 'notificationTarget',
          allowNull: false,
        },
        enabled: {
          type: DataTypes.BOOLEAN,
          field: 'enabled',
          allowNull: false,
          defaultValue: true,
        },
      }, { transaction: t });

    });

  },

  /* eslint-disable-next-line no-unused-vars */
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('MOD_Notifications');
  },
};
