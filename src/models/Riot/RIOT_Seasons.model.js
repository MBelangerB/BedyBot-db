'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, DataTypes) => {
    class RIOT_Seasons extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            RIOT_Seasons.hasOne(models.RIOT_LeagueEntries, {
                foreignKey: 'seasonId', // Set FK name on TARGET
                sourceKey: 'seasonId', // Source Key In SOURCE
                onDelete: 'CASCADE',
                // hooks: true,
            });
        }
    }

    RIOT_Seasons.getModels = function () {
        return this.sequelize.models;
    };

    // https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ
    RIOT_Seasons.init({
        // internal key
        seasonId: {
            type: DataTypes.UUID,
            field: 'seasonId',
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        seasonName: {
            type: DataTypes.STRING(10),
            field: 'seasonName',
            allowNull: false,
        },
        splitNumber: {
            type: DataTypes.INTEGER,
            field: 'splitNumber',
            allowNull: false,
        },
        startDateTime: {
            type: Sequelize.DATE,
            field: 'startDateTime',
            allowNull: true,
        },
        endDateTime: {
            type: Sequelize.DATE,
            field: 'endDateTime',
            allowNull: true,
        },
    },
        {
            sequelize,
            modelName: 'RIOT_Seasons',
            tableName: 'RIOT_Seasons',
        });

    return RIOT_Seasons;
};