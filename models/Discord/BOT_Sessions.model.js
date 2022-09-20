'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Sessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_Sessions.belongsTo(models.BOT_Tournaments, {
                foreignKey: 'tournamentId', // FK on source table
                targetKey: 'id', // Key name on target table
                // as: 'tournament',
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });
            BOT_Sessions.belongsToMany(models.BOT_Users, {
                through: {
                    model: models.BOT_UserSessions,
                    unique: false,
                },
                foreignKey: 'sessionId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            BOT_Sessions.hasMany(models.BOT_Channels, {
                foreignKey: 'sessionId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

        }

        static models() {
            return this.sequelize.models;
        }

        /**
         * Create a new session in DB for a tournament
         * @param {*} tournamentId
         * @param {*} sessionNumber
         * @param {*} startDateTime
         * @param {*} durations
         * @param {*} status
         * @param {*} transaction
         * @returns
         */
        static async createSessionOnDB(tournamentId, sessionNumber, startDateTime, durations, status, transaction) {
            if (transaction) {
                return await this.create({
                    tournamentId: tournamentId,
                    sessionNumber: sessionNumber,
                    startDateTime: startDateTime,
                    duration: durations,
                    status: status,
                }, { transaction: transaction });
            } else {
                return await this.create({
                    tournamentId: tournamentId,
                    sessionNumber: sessionNumber,
                    startDateTime: startDateTime,
                    duration: durations,
                    status: status,
                });
            }
        }

        /**
         * Return a session array by tournament Id
         * @param {integer} tournamentId
         * @param {boolean} withInclude
         * @returns  {BOT_Sessions[]}
         */
        static async getSessionsById(tournamentId, withInclude = true) {
            if (withInclude) {
                return await this.findAll({ where: { tournamentId: tournamentId }, include: [this.models().BOT_Users] });
            } else {
                return await this.findAll({ where: { tournamentId: tournamentId } });
            }
        }

        /**
         * Return a session by tournament and session
         * @param {integer} tournamentId
         * @param {integer} sessionNumber
         * @param {booolean} withInclude
         * @returns {BOT_Sessions}
         */
        static async getSessionByIdAndSession(tournamentId, sessionNumber, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { tournamentId: tournamentId, sessionNumber: sessionNumber }, include: [this.models().BOT_Users] });
            } else {
                return await this.findOne({ where: { tournamentId: tournamentId, sessionNumber: sessionNumber } });
            }
        }

        /**
         * Get nb participants are register in the session
         * @returns {integer}
         */
        getParticipantsCount() {
            let nbUser = 0;
            if (this.BOT_Users) {
                nbUser = this.BOT_Users.length;
            }
            return nbUser ? nbUser : 0;
        }

        /**
         * Get nb lobby for this session
         * @param {integer} maxPlayerPerLobby
         * @returns {integer}
         */
        getNbLobby(maxPlayerPerLobby = 12) {
            let maxParticipant = 12;
            if (maxPlayerPerLobby && Number.isInteger(maxPlayerPerLobby)) {
                maxParticipant = maxPlayerPerLobby;
            }
            const nbTeam = Math.ceil(this.getParticipantsCount() / maxParticipant);
            return nbTeam;
        }
    }

    BOT_Sessions.SessionStatus = {
        Active: 1,
        InProgress: 2,
        Closed: 3,
    };

    BOT_Sessions.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        tournamentId: {
            type: DataTypes.INTEGER,
            field: 'tournamentId',
        },
        sessionNumber: {
            type: DataTypes.INTEGER,
            field: 'sessionNumber',
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            field: 'startDateTime',
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            field: 'duration',
            allowNull: false,
        },
        status: {
            // Valeur jamais modifié lors du close
            type: DataTypes.INTEGER,
            field: 'status',
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: 'BOT_Sessions',
        tableName: 'BOT_Sessions',
    });
    return BOT_Sessions;
};