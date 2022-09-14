'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Tournaments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.BOT_Tournaments.belongsTo(models.BOT_Users, {
                foreignKey: 'ownerId',
                as: 'owner',
                // lors FindOne/FindALl pour include Sequelize il faut utiliser l'alias et nom la table
            });

            models.BOT_Tournaments.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId',
            });
        }
    }

    BOT_Tournaments.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guildId',
            allowNull: false,
        },
        ownerId: {
            type: DataTypes.INTEGER,
            field: 'ownerId',
        },
        announcementChannelId: {
            type: DataTypes.STRING,
            field: 'announcementChannelId',
            allowNull: false,
        },
        announcementMessageId: {
            type: DataTypes.STRING,
            field: 'announcementMessageId',
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            field: 'startDateTime',
            allowNull: false,
        },
        sessionCount: {
            type: DataTypes.INTEGER,
            field: 'sessionCount',
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            field: 'status',
            allowNull: false,
        },
        ts: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'BOT_Tournaments',
        tableName: 'BOT_Tournaments',
    });
    return BOT_Tournaments;
};