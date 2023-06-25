'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class RIOT_SummonerMiniSeries extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // RIOT_SummonerMiniSeries.hasOne(models.RIOT_Summoner, {
            //     foreignKey: 'id', // Set FK name on TARGET
            //     sourceKey: 'riotSummonerId', // Source Key In SOURCE
            // });
        }

        // /**
        //  * Add a change history for a summoner
        //  * @param {*} riotSummonerId 
        //  * @param {*} name 
        //  * @param {*} level 
        //  * @returns 
        //  */
        //  /* eslint-disable-next-line no-dupe-class-members */
        //  static async addSummonerHistory(riotSummonerId, name, level) {
        //     return await this.create({
        //         id: uuidv4(),
        //         riotSummonerId: riotSummonerId,
        //         riotSummonerName: name,
        //         riotSummonerLevel: level,
        //     });
        // }
    }

    RIOT_SummonerMiniSeries.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.UUIDV4,
          },
          wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          target: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          progress: {
            type: DataTypes.STRING(10),
            allowNull: false,
          },
    }, {
        sequelize, 
        modelName: 'RIOT_SummonerMiniSeries',
        tableName: 'RIOT_SummonerMiniSeries',
        indexes: [
            {
                name: 'PK_riot_SummonerMiniSeries_Id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
    return RIOT_SummonerMiniSeries;
};