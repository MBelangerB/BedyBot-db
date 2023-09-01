'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MOD_Notifications extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            MOD_Notifications.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on SOURCE
                targetKey: 'guildId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            MOD_Notifications.belongsTo(models.BOT_Channels, {
                foreignKey: 'channelId', // Set FK name on SOURCE
                targetKey: 'channelId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    MOD_Notifications.init({
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
            unique: true,
            allowNull: false,
            // references: {
            //     model: 'BOT_Guilds', // This is a reference to another model
            //     key: 'guildId', // This is the column name of the referenced model
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            //   },
        },
        channelId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'channelId',
            allowNull: true,
            // references: {
            //     model: 'BOT_Channels', // This is a reference to another model
            //     key: 'channelId', // This is the column name of the referenced model
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            // },
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
    }, {
        sequelize,
        modelName: 'MOD_Notifications',
        tableName: 'MOD_Notifications',
    });

    return MOD_Notifications;
};