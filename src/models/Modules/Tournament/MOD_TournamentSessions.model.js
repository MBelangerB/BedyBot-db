'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class MOD_TournamentSessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MOD_TournamentSessions.belongsTo(models.MOD_Tournaments, {
                foreignKey: 'tournamentId', // FK on source table
                targetKey: 'tournamentId', // Key name on target table
                // as: 'tournament',
                onDelete: 'Set NULL',
                onUpdate: 'CASCADE',
            });

            MOD_TournamentSessions.belongsToMany(models.BOT_Users, {
                through: {
                    model: models.MOD_SessionUserRegistrations,
                    unique: false,
                },
                foreignKey: 'sessionId',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            MOD_TournamentSessions.hasMany(models.MOD_SessionChannels, {
                foreignKey: 'sessionId', // Set FK name on TARGET
                sourceKey: 'sessionId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

        }

        // /**
        //  * Create a new session in DB for a tournament
        //  * @param {*} tournamentId
        //  * @param {*} sessionNumber
        //  * @param {*} startDateTime
        //  * @param {*} durations
        //  * @param {*} status
        //  * @param {*} transaction
        //  * @returns
        //  */
        // static async createSessionOnDB(tournamentId, sessionNumber, startDateTime, durations, status, transaction) {
        //     if (transaction) {
        //         return await this.create({
        //             tournamentId: tournamentId,
        //             sessionNumber: sessionNumber,
        //             startDateTime: startDateTime,
        //             duration: durations,
        //             status: status,
        //         }, { transaction: transaction });
        //     } else {
        //         return await this.create({
        //             tournamentId: tournamentId,
        //             sessionNumber: sessionNumber,
        //             startDateTime: startDateTime,
        //             duration: durations,
        //             status: status,
        //         });
        //     }
        // }

        // /**
        //  * Return a session array by tournament Id
        //  * @param {integer} tournamentId
        //  * @param {boolean} withInclude
        //  * @returns  {MOD_TournamentSessions[]}
        //  */
        // static async getSessionsById(tournamentId, withInclude = true) {
        //     if (withInclude) {
        //         return await this.findAll({ where: { tournamentId: tournamentId }, include: [this.models().BOT_Users] });
        //     } else {
        //         return await this.findAll({ where: { tournamentId: tournamentId } });
        //     }
        // }

        // /**
        //  * Return a session by tournament and session
        //  * @param {integer} tournamentId
        //  * @param {integer} sessionNumber
        //  * @param {booolean} withInclude
        //  * @returns {MOD_TournamentSessions}
        //  */
        // static async getSessionByIdAndSession(tournamentId, sessionNumber, withInclude = true) {
        //     if (withInclude) {
        //         return await this.findOne({ where: { tournamentId: tournamentId, sessionNumber: sessionNumber }, include: [this.models().BOT_Users] });
        //     } else {
        //         return await this.findOne({ where: { tournamentId: tournamentId, sessionNumber: sessionNumber } });
        //     }
        // }

        // /**
        //  * Get nb participants are register in the session
        //  * @returns {integer}
        //  */
        // getParticipantsCount() {
        //     let nbUser = 0;
        //     if (this.BOT_Users) {
        //         nbUser = this.BOT_Users.length;
        //     }
        //     return nbUser ? nbUser : 0;
        // }

        // /**
        //  * Get nb lobby for this session
        //  * @param {integer} maxPlayerPerLobby
        //  * @returns {integer}
        //  */
        // getNbLobby(maxPlayerPerLobby = 12) {
        //     let maxParticipant = 12;
        //     if (maxPlayerPerLobby && Number.isInteger(maxPlayerPerLobby)) {
        //         maxParticipant = maxPlayerPerLobby;
        //     }
        //     const nbTeam = Math.ceil(this.getParticipantsCount() / maxParticipant);
        //     return nbTeam;
        // }
    }

    // MOD_TournamentSessions.SessionStatus = {
    //     Active: 1,
    //     InProgress: 2,
    //     Closed: 3,
    // };

    MOD_TournamentSessions.init({
        sessionId: {
            type: DataTypes.UUID,
            field: 'sessionId',
            primaryKey: true,
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        tournamentId: {
            type: DataTypes.UUID,
            field: 'tournamentId',
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            references: {
                model: 'MOD_Tournament', // This is a reference to another model
                key: 'tournamentId', // This is the column name of the referenced model
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        sessionNumber: {
            type: DataTypes.INTEGER,
            field: 'sessionNumber',
            allowNull: false,
        },
        sessionDuration: {
            type: DataTypes.INTEGER,
            field: 'sessionDuration',
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            field: 'startDateTime',
            allowNull: false,
        },
        status: {
            // Valeur jamais modifié lors du close ?
            type: DataTypes.INTEGER,
            field: 'status',
            allowNull: false,
            defaultValue: 1,
        },
    }, {
        sequelize,
        modelName: 'MOD_TournamentSessions',
        tableName: 'MOD_TournamentSessions',
    });
    return MOD_TournamentSessions;
};