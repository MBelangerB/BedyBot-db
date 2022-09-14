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
            models.BOT_Sessions.belongsTo(models.BOT_Tournaments, {
                foreignKey: 'TournamentId',
                as: 'tournament',
            });
            models.BOT_Sessions.belongsToMany(models.BOT_Users, {
                through: {
                    model: models.BOT_UserSessions,
                    unique: false,
                },
                foreignKey: 'SessionId',
            });
        }

        getParticipantsCount() {
            let nbUser = 0;
            if (this.BOT_Users) {
                nbUser = this.BOT_Users.length;
            }
            return nbUser ? nbUser : 0;
        }

        getNbTeam(nbUserPerTeam = 12) {
            return Math.ceil(this.nbUser / nbUserPerTeam);
        }
    }

    BOT_Sessions.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
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
        tournamentId: {
            type: DataTypes.INTEGER,
            field: 'tournamentId',
        },

        // nbUser: {
        //     type: DataTypes.VIRTUAL,
        //     get() {
        //         let nbUser = 0;
        //         if (this.Users) {
        //             nbUser = this.Users.length;
        //         }
        //         return nbUser ? nbUser : 0;
        //     },
        // },
        // nbTeam: {
        //     type: DataTypes.VIRTUAL,
        //     get() {
        //         // TODO: dans .env ou autre pour le nombre de participant
        //         const nbTeam = Math.ceil(this.nbUser / 12);
        //         return nbTeam;
        //     },
        // },
        //
    }, {
        sequelize,
        modelName: 'BOT_Sessions',
        tableName: 'BOT_Sessions',
    });
    return BOT_Sessions;
};