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
                foreignKey: 'ownerId', // FK on source table
                targetKey: 'id', // Key name on target table
                as: 'owner', // lors FindOne/FindALl pour include Sequelize il faut utiliser l'alias et nom la table
                onDelete: 'set NULL',
            });

            BOT_Tournaments.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'set NULL',
                onUpdate: 'CASCADE',
            });

            BOT_Tournaments.belongsTo(models.BOT_Users, {
                foreignKey: 'ownerId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'set NULL',
                onUpdate: 'CASCADE',
            });

            BOT_Tournaments.hasMany(models.BOT_Sessions, {
                foreignKey: 'tournamentId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

        }

        static models() {
            return this.sequelize.models;
        }

        /**
         * Create a tournament in DB
         * @param {integer} guildId
         * @param {string} discordChannelId
         * @param {string} discordMessageId
         * @param {integer} ownerId
         * @param {datetime} startTime
         * @param {integer} nbSession
         * @param {integer} status
         * @param {*} transaction
         * @returns
         */
        static async createTournamentOnDB(guildId, discordChannelId, discordMessageId, ownerId, startTime, nbSession, status, transaction) {
            if (transaction) {
                return await BOT_Tournaments.create({
                    guildId: guildId,
                    announcementChannelId: discordChannelId,
                    announcementMessageId: discordMessageId,
                    ownerId: ownerId,
                    startDateTime: startTime,
                    sessionCount: nbSession,
                    status: status,
                    ts: Date.now(),
                }, { transaction: transaction });

            } else {
                return await BOT_Tournaments.create({
                    guildId: guildId,
                    announcementChannelId: discordChannelId,
                    announcementMessageId: discordMessageId,
                    ownerId: ownerId,
                    startDateTime: startTime,
                    sessionCount: nbSession,
                    status: status,
                    ts: Date.now(),
                });
            }
        }

        /**
         * Get the BOT_Tournaments for a guild who are attach to a discord message
         * @param {string} guildId
         * @param {string} messageId
         * @returns {BOT_Tournaments}
         */
        static async getTournamentByMessageId(guildId, messageId) {
            return await this.findOne({ where: { guildId: guildId, announcementMessageId: messageId } });
        }

        /**
         * Return a BOT_Tournaments by tournamentId
         * @param {string} guildId
         * @param {integer} tournamentId
         * @returns {BOT_Tournaments}
         */
        static async getTournamentById(guildId, tournamentId, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { guildId: guildId, id: tournamentId }, include: 'owner' }); // [this.models().BOT_Users] });
            } else {
                return await this.findOne({ where: { guildId: guildId, id: tournamentId } });
            }
        }

        /**
         * Return All Tournamenet for a guild by a status
         * @param {string} guildId
         * @param {integer} status
         * @param {boolean} withInclude
         * @returns {BOT_Tournaments}
         */
        static async getTournamentsByGuildAndStatus(guildId, status, withInclude = true) {
            if (withInclude) {
                return await this.findAll({ where: { guildId: guildId, status: status }, include: 'owner' }); // [this.models().BOT_Users] });
            } else {
                return await this.findAll({ where: { guildId: guildId, status: status } });
            }
        }


        /**
         * Update the tournament status
         * @param {BOT_Tournaments.TournamentStatus} newStatut
         */
        async updateStatut(newStatut) {
            // On update pour raison X
            this.set({
                status: newStatut,
            });
            await this.save();
        }
    }

    BOT_Tournaments.TournamentStatus = {
        Active: 1,
        InProgress: 2,
        Closed: 3,
    };

    BOT_Tournaments.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.INTEGER,
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
        createAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'createAt',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'BOT_Tournaments',
        tableName: 'BOT_Tournaments',
    });
    return BOT_Tournaments;
};