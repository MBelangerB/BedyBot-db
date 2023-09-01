'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MOD_SessionChannels extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            MOD_SessionChannels.belongsTo(models.MOD_TournamentSessions, {
                foreignKey: 'sessionId', // Set FK name on SOURCE
                targetKey: 'sessionId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            MOD_SessionChannels.belongsTo(models.BOT_Channels, {
                foreignKey: 'channelId', // Set FK name on SOURCE
                targetKey: 'channelId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            MOD_SessionChannels.belongsTo(models.MOD_SessionChannels, {
                foreignKey: 'parentId', // Set FK name on SOURCE
                targetKey: 'sessionChannelId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    MOD_SessionChannels.init({
        sessionChannelId: {
            type: DataTypes.UUID,
            field: 'sessionChannelId',
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        sessionId: {
            type: DataTypes.UUID,
            allowNull: false,
            // primaryKey: true,
            field: 'sessionId',
            references: {
                model: 'MOD_TournamentSessions', // This is a reference to another model
                key: 'sessionId', // This is the column name of the referenced model
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }
        },
        channelId: {
            allowNull: false,
            // primaryKey: true,
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'channelId',
            references: {
                model: 'BOT_Channels', // This is a reference to another model
                key: 'channelId', // This is the column name of the referenced model
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        parentId: {
            type: DataTypes.UUID,
            field: 'parentId',
            allowNull: true,
            references: {
                model: 'MOD_SessionChannel', // This is a reference to another model
                key: 'sessionChannelId', // This is the column name of the referenced model
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        channelType: {
            type: DataTypes.INTEGER,
            field: 'channelType',
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'MOD_SessionChannels',
        tableName: 'MOD_SessionChannels',
    });

    return MOD_SessionChannels;
};