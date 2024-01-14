'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, DataTypes) => {
    class RIOT_Config extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
        }
    }

    RIOT_Config.getModels = function () {
        return this.sequelize.models;
    };

    // https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ
    RIOT_Config.init({
        // internal key
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        seasonId: {
            type: DataTypes.UUID,
            field: 'seasonId',
            allowNull: true,
        },
    },
        {
            sequelize,
            modelName: 'RIOT_Config',
            tableName: 'RIOT_Config',
        });

    return RIOT_Config;
};