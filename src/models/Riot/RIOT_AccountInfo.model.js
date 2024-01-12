'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, DataTypes) => {
    class RIOT_Account extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            RIOT_Account.hasOne(models.RIOT_Summoner, {
                foreignKey: 'puuid', // Set FK name on TARGET
                sourceKey: 'puuid', // Source Key In SOURCE
                onDelete: 'CASCADE',
                // hooks: true,
            });
        }
    }

    RIOT_Account.getModels = function () {
        return this.sequelize.models;
    };

    // https://support-leagueoflegends.riotgames.com/hc/en-us/articles/360041788533-Riot-ID-FAQ
    RIOT_Account.init({
        // internal key
        accountId: {
            type: DataTypes.UUID,
            field: 'accountId',
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        puuid: {
            type: DataTypes.STRING(78),
            field: 'puuid',
            unique: true,
            allowNull: false,
        },
        gameName: {
            type: DataTypes.STRING(16),
            field: 'gameName',
            allowNull: false,
        },
        tagLine: {
            type: DataTypes.STRING(5),
            field: 'tagLine',
            allowNull: false,
        },
    },
        {
            sequelize,
            modelName: 'RIOT_Account',
            tableName: 'RIOT_Account',
        });

    return RIOT_Account;
};