'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Sessions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Sessions.belongsTo(models.Tournaments, {
                foreignKey: 'TournamentId',
                as: 'tournament',
            });
            models.Sessions.belongsToMany(models.Users, {
                through: {
                    model: models.UserSessions,
                    unique: false,
                },
                foreignKey: 'SessionId',
            });
        }
    }

    Sessions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        sessionNumber: {
            type: DataTypes.INTEGER,
        },
        // Id du Discord
        startDateTime: {
            type: DataTypes.DATE,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        status: {
            // TODO: La valeur n'est jamais modifié
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
        nbUser: {
            type: DataTypes.VIRTUAL,
            get() {
                let nbUser = 0;
                if (this.Users) {
                    nbUser = this.Users.length;
                }
                return nbUser ? nbUser : 0;
            },
        },
        nbTeam: {
            type: DataTypes.VIRTUAL,
            get() {
                // TODO: dans .env ou autre pour le nombre de participant
                const nbTeam = Math.ceil(this.nbUser / 12);
                return nbTeam;
            },
        },
        //
        tournamentId: {
            type: DataTypes.INTEGER,
            field: 'tournamentId',
          },
    }, {
        sequelize, 
        modelName: 'Sessions',
        tableName: 'MK_Sessions'
    });
    return Sessions;
};