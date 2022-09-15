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

        /**
         * Get the BOT_Tournaments for a guild who are attach to a discord message
         * @param {string} guildId
         * @param {string} messageId
         * @returns {BOT_Tournaments}
         */
        static async getTournamentByMessageId(guildId, messageId) {
            return await this.findOne({ where: { guildId: guildId, messageId: messageId } });
        }

        /**
         * Return a BOT_Tournaments by tournamentId
         * @param {string} guildId
         * @param {integer} tournamentId
         * @returns {BOT_Tournaments}
         */
        static async getTournamentById(guildId, tournamentId, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { guildId: guildId, tournamentId: tournamentId }, include: 'owner' }); // [this.models().BOT_Users] });
            } else {
                return await this.findOne({ where: { guildId: guildId, tournamentId: tournamentId } });
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