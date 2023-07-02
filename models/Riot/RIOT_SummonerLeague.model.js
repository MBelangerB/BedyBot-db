'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class RIOT_SummonerLeague extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RIOT_SummonerLeague.hasOne(models.RIOT_Summoner, {
                foreignKey: 'id', // Set FK name on TARGET
                sourceKey: 'riotSummonerId', // Source Key In SOURCE
            });
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

    RIOT_SummonerLeague.init({
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
          riotLeagueId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          // Same riotId on table RIOT_Summoner
          riotSummonerId: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          riotSummonerName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          queueType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          tier: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          rank: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          leaguePoints: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          wins: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          losses: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          riotHotStreak: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          riotVeteran: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          riotFreshBlood: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          riotInactive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
          },
          // One To One
          riotSummonerMiniSeriesId: {
            type: DataTypes.UUID,
            allowNull: false,
            // references: {
            //   model: 'RIOT_SummonerMiniSeries',
            //   key: 'id'
            // },
          },
          updateAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
          },
    }, {
        sequelize, 
        modelName: 'RIOT_SummonerLeague',
        tableName: 'RIOT_SummonerLeague',
        indexes: [
            {
                name: 'IDX_riot_SummonerLeague_riotSummonerName',
                fields: [
                    { name: 'riotSummonerName' },
                ],
            },
            {
                name: 'IDX_riot_SummonerLeague_riotSummonerId',
                fields: [
                    { name: 'riotSummonerId' },
                ],
            },
            {
                name: 'PK_riot_SummonerLeague_Id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });
    return RIOT_SummonerLeague;
};