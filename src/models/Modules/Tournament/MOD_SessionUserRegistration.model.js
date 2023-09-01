'use strict';
const { Op, Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MOD_SessionUserRegistrations extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            MOD_SessionUserRegistrations.belongsTo(models.BOT_Users, {
                foreignKey: 'userId', // FK on source table
                targetKey: 'userId', // Key name on target table
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });
            MOD_SessionUserRegistrations.belongsTo(models.MOD_TournamentSessions, {
                foreignKey: 'sessionId', // FK on source table
                targetKey: 'sessionId', // Key name on target table
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });

            // define association here
            // MOD_SessionUserRegistrations.belongsTo(models.BOT_Channels, {
            //     foreignKey: 'textChannelId', // Set FK name on SOURCE
            //     targetKey: 'id', // Key name on TARGET
            //     onDelete: 'Set NULL',
            //     onUpdate: 'CASCADE',
            // });
            // MOD_SessionUserRegistrations.belongsTo(models.BOT_Channels, {
            //     foreignKey: 'voiceChannelId', // Set FK name on SOURCE
            //     targetKey: 'id', // Key name on TARGET
            //     onDelete: 'Set NULL',
            //     onUpdate: 'CASCADE',
            // });
        }

        // /**
        //  * Return the MOD_SessionUserRegistrations attach at userSessionId
        //  * @param {integer} userSessionId
        //  * @returns {MOD_SessionUserRegistrations}
        //  */
        // static async getUserSessionById(userSessionId) {
        //     return await this.findOne({ where: { id: userSessionId } });
        // }

        // /**
        //  * Remove the channelId reference in MOD_SessionUserRegistrations
        //  * @param {id} channelId
        //  * @param {*} transaction
        //  * @returns
        //  */
        // static async cleanChannelInfoByChannelId(channelId, transaction = null) {
        //     if (transaction) {
        //         return await this.update({ textChannelId: null, voiceChannelId: null },
        //             {
        //                 where: {
        //                     [Op.or]: [{ textChannelId: channelId }, { voiceChannelId: channelId }],
        //                 },
        //                 transaction: transaction,
        //             });
        //     } else {
        //         return await this.update({ textChannelId: null, voiceChannelId: null },
        //             {
        //                 where: {
        //                     [Op.or]: [{ textChannelId: channelId }, { voiceChannelId: channelId }],
        //                 },
        //             });
        //     }
        // }
    }

    MOD_SessionUserRegistrations.init({
        sessionId: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            field: 'sessionId',
            // references: {
            //     model: 'MOD_TournamentSessions', // This is a reference to another model
            //     key: 'sessionId', // This is the column name of the referenced model
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            // }
        },
        userId: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'userId',
            // references: {
            //     model: 'BOT_Users', // This is a reference to another model
            //     key: 'userId', // This is the column name of the referenced model
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            // },
        },
        // voiceChannelId: {
        //     allowNull: true,
        //     type: Sequelize.BIGINT.UNSIGNED,
        //     field: 'voiceChannelId',
        //     // references: {
        //     //     model: sequelize.models.BOT_Channels,
        //     //     key: 'id',
        //     // },
        // },
        // textChannelId: {
        //     allowNull: true,
        //     type: Sequelize.BIGINT.UNSIGNED,
        //     field: 'textChannelId',
        //     // references: {
        //     //     model: sequelize.models.BOT_Channels,
        //     //     key: 'id',
        //     // },
        // },
        ts: {
            type: DataTypes.DATE,
            field: 'ts',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        // sessionId: {
        //     allowNull: false,
        //     field: 'sessionId',
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: sequelize.models.BOT_Sessions,
        //         key: 'id',
        //     },
        // },
       
    }, {
        sequelize,
        modelName: 'MOD_SessionUserRegistrations',
        tableName: 'MOD_SessionUserRegistrations',
    });
    return MOD_SessionUserRegistrations;
};