'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class RIOT_SummonerHistory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RIOT_SummonerHistory.hasMany(models.RIOT_Summoner, {
                foreignKey: 'id', // Set FK name on TARGET
                sourceKey: 'riotSummonerId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });
        }

        /**
         * Add a change history for a summoner
         * @param {*} riotSummonerId 
         * @param {*} name 
         * @param {*} level 
         * @returns 
         */
         /* eslint-disable-next-line no-dupe-class-members */
         static async addSummonerHistory(riotSummonerId, name, level) {
            return await this.create({
                id: uuidv4(),
                riotSummonerId: riotSummonerId,
                riotSummonerName: name,
                riotSummonerLevel: level,
            });
        }
    }

    RIOT_SummonerHistory.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.UUIDV4,
          },
          riotSummonerId: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //   model: 'RIOT_Summoner',
            //   key: 'id',
            //   onDelete: 'CASCADE',
            //   onUpdate: 'CASCADE',
            // },
          },
          riotSummonerName: {
            type: DataTypes.STRING,
            allowNull: false,
          }, 
          updateAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          },
    }, {
        sequelize, 
        modelName: 'RIOT_SummonerHistory',
        tableName: 'RIOT_SummonerHistory',
        indexes: [
            {
                name: 'IDX_riot_SummonerHistory_summonerName',
                fields: [
                    { name: 'riotSummonerName' },
                ],
            },
            {
                name: 'PK_riot_SummonerHistory_Id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
    return RIOT_SummonerHistory;
};