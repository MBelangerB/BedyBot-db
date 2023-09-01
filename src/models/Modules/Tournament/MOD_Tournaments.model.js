'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MOD_Tournaments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MOD_Tournaments.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on SOURCE
                targetKey: 'guildId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            MOD_Tournaments.belongsTo(models.BOT_Users, {
                foreignKey: 'ownerId', // Set FK name on SOURCE
                targetKey: 'userId', // Key name on TARGET
                onDelete: 'set NULL',
                onUpdate: 'CASCADE',
            });

            MOD_Tournaments.hasMany(models.MOD_TournamentSessions, {
                foreignKey: 'tournamentId', // Set FK name on TARGET
                sourceKey: 'tournamentId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

        }

        // /**
        //  * Create a tournament in DB
        //  * @param {integer} guildId
        //  * @param {string} discordChannelId
        //  * @param {string} discordMessageId
        //  * @param {integer} ownerId
        //  * @param {datetime} startTime
        //  * @param {integer} nbSession
        //  * @param {integer} status
        //  * @param {*} transaction
        //  * @returns
        //  */
        // static async createTournamentOnDB(guildId, discordChannelId, discordMessageId, ownerId, startTime, nbSession, status, transaction) {
        //     if (transaction) {
        //         return await BOT_Tournaments.create({
        //             guildId: guildId,
        //             announcementChannelId: discordChannelId,
        //             announcementMessageId: discordMessageId,
        //             ownerId: ownerId,
        //             startDateTime: startTime,
        //             sessionCount: nbSession,
        //             status: status,
        //             ts: Date.now(),
        //         }, { transaction: transaction });

        //     } else {
        //         return await BOT_Tournaments.create({
        //             guildId: guildId,
        //             announcementChannelId: discordChannelId,
        //             announcementMessageId: discordMessageId,
        //             ownerId: ownerId,
        //             startDateTime: startTime,
        //             sessionCount: nbSession,
        //             status: status,
        //             ts: Date.now(),
        //         });
        //     }
        // }

        // /**
        //  * Get the BOT_Tournaments for a guild who are attach to a discord message
        //  * @param {string} guildId
        //  * @param {string} messageId
        //  * @returns {BOT_Tournaments}
        //  */
        // static async getTournamentByMessageId(guildId, messageId) {
        //     return await this.findOne({ where: { guildId: guildId, announcementMessageId: messageId } });
        // }

        // /**
        //  * Return a BOT_Tournaments by tournamentId
        //  * @param {string} guildId
        //  * @param {integer} tournamentId
        //  * @returns {BOT_Tournaments}
        //  */
        // static async getTournamentById(guildId, tournamentId, withInclude = true) {
        //     if (withInclude) {
        //         return await this.findOne({ where: { guildId: guildId, id: tournamentId }, include: 'owner' }); // [this.models().BOT_Users] });
        //     } else {
        //         return await this.findOne({ where: { guildId: guildId, id: tournamentId } });
        //     }
        // }

        // /**
        //  * Return All Tournamenet for a guild by a status
        //  * @param {string} guildId
        //  * @param {integer} status
        //  * @param {boolean} withInclude
        //  * @returns {BOT_Tournaments}
        //  */
        // static async getTournamentsByGuildAndStatus(guildId, status, withInclude = true) {
        //     if (withInclude) {
        //         return await this.findAll({ where: { guildId: guildId, status: status }, include: 'owner' }); // [this.models().BOT_Users] });
        //     } else {
        //         return await this.findAll({ where: { guildId: guildId, status: status } });
        //     }
        // }


        // /**
        //  * Update the tournament status
        //  * @param {BOT_Tournaments.TournamentStatus} newStatut
        //  */
        // async updateStatut(newStatut) {
        //     // On update pour raison X
        //     this.set({
        //         status: newStatut,
        //     });
        //     await this.save();
        // }
    }

    // MOD_Tournaments.TournamentStatus = {
    //     Active: 1,
    //     InProgress: 2,
    //     Closed: 3,
    // };

    MOD_Tournaments.init({
        tournamentId: {
            type: DataTypes.UUID,
            field: 'tournamentId',
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
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        ownerId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'ownerId',
            allowNull: false,
            references: {
                model: 'BOT_Users', // This is a reference to another model
                key: 'userId', // This is the column name of the referenced model
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
        },
        // announcementChannelId: {
        //     type: Sequelize.BIGINT.UNSIGNED,
        //     field: 'announcementChannelId',
        //     allowNull: false,
        // },
        announcementMessageId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'messageId',
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
        createAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'createAt',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'MOD_Tournaments',
        tableName: 'MOD_Tournaments',
    });

    return MOD_Tournaments;
};