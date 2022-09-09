'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserSessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
        }
    }

    UserSessions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        SessionId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Sessions,
                key: 'id',
            },
        },
        UserId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Users,
                key: 'id',
            },
        },
        VoiceChannelId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Channels,
                key: 'id',
            },
        },
        TextChannelId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.Channels,
                key: 'id',
            },
        },
        ts: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'UserSessions',
        tableName: 'MK_UserSessions',
        indexes: [
            {
                unique: true,
                fields: ['UserId', 'SessionId'],
            },
        ],
    });
    return UserSessions;
};