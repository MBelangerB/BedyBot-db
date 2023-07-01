'use strict';
const { Op, Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_UserSessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            BOT_UserSessions.belongsTo(models.BOT_Channels, {
                foreignKey: 'textChannelId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });
            BOT_UserSessions.belongsTo(models.BOT_Channels, {
                foreignKey: 'voiceChannelId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });
        }

        /**
         * Return the BOT_UserSessions attach at userSessionId
         * @param {integer} userSessionId
         * @returns {BOT_UserSessions}
         */
        static async getUserSessionById(userSessionId) {
            return await this.findOne({ where: { id: userSessionId } });
        }

        /**
         * Remove the channelId reference in BOT_UserSessions
         * @param {id} channelId
         * @param {*} transaction
         * @returns
         */
        static async cleanChannelInfoByChannelId(channelId, transaction = null) {
            if (transaction) {
                return await this.update({ textChannelId: null, voiceChannelId: null },
                    {
                        where: {
                            [Op.or]: [{ textChannelId: channelId }, { voiceChannelId: channelId }],
                        },
                        transaction: transaction,
                    });
            } else {
                return await this.update({ textChannelId: null, voiceChannelId: null },
                    {
                        where: {
                            [Op.or]: [{ textChannelId: channelId }, { voiceChannelId: channelId }],
                        },
                    });
            }
        }
    }

    BOT_UserSessions.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        sessionId: {
            allowNull: false,
            field: 'sessionId',
            type: DataTypes.INTEGER,
            references: {
                model: sequelize.models.BOT_Sessions,
                key: 'id',
            },
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'userId',
            references: {
                model: sequelize.models.BOT_Users,
                key: 'id',
            },
        },
        voiceChannelId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'voiceChannelId',
            // references: {
            //     model: sequelize.models.BOT_Channels,
            //     key: 'id',
            // },
        },
        textChannelId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            field: 'textChannelId',
            // references: {
            //     model: sequelize.models.BOT_Channels,
            //     key: 'id',
            // },
        },
        ts: {
            type: DataTypes.DATE,
            field: 'ts',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'BOT_UserSessions',
        tableName: 'BOT_UserSessions',
        indexes: [
            {
                unique: true,
                fields: ['userId', 'sessionId'],
            },
        ],
    });
    return BOT_UserSessions;
};