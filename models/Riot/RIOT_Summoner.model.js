'use strict';
const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class RIOT_Summoner extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            RIOT_Summoner.hasMany(models.RIOT_SummonerHistory, {
                foreignKey: 'riotSummonerId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });
        }


        /* eslint-disable-next-line no-dupe-class-members */
        static async addSummoner(riotId, accountId, puuid, name, level, region) {
            return await this.create({
                id: uuidv4(),
                riotAccountId: accountId,
                riotId: riotId,
                riotPuuid: puuid,
                riotSummonerName: name,
                riotSummonerLevel: level,
                region: region
            });
        }

        /**
         * Get Summone by Summoner name for a specific region
         * @param {*} id 
         * @returns 
         */
         static async findSummonerBySummonerName(name, region) {
            return await this.findOne({ where: { riotSummonerName: name, region: region } });
        }

        /**
         * Get Summone by RiotId
         * @param {*} id 
         * @returns 
         */
        static async findSummonerByRiotId(id) {
            return await this.findOne({ where: { riotId: id } });
        }

        /**
        * Get Summone by riot account id
        * @param {*} id 
        * @returns 
        */
        static async findSummonerByAccountId(accountId) {
            return await this.findOne({ where: { riotAccountId: accountId } });
        }

        async updateSummonerInfo(summonerName, summonerLevel) {
              // Create History
              this.set({
                riotSummonerName: summonerName,
                riotSummonerLevel: summonerLevel,
                updateAt: sequelize.literal('CURRENT_TIMESTAMP'),
            });
          
            await this.save();
          }

          async getSummonerInfo(isJson = false) {
            if (!isJson) {
                let returnValue = `${this.riotSummonerName} (Niv. ${this.riotSummonerLevel})`;
                return returnValue.trimEnd(); 
            } else {
                return this;
            }
          }
    }

    RIOT_Summoner.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
            defaultValue: sequelize.UUIDV4,
        },
        riotAccountId: {
            type: DataTypes.STRING(56),
            allowNull: false,
        },
        riotId: {
            type: DataTypes.STRING(63),
            allowNull: false,
        },
        riotPuuid: {
            type: DataTypes.STRING(78),
            allowNull: false,
        },
        riotSummonerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        riotSummonerLevel: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: true,
        },
        region: {
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
        modelName: 'RIOT_Summoner',
        tableName: 'RIOT_Summoner',
        indexes: [      
            {
                name: 'sqlite_autoindex_RIOT_Summoner_1',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
            {
                name: 'IDX_riot_summoner_SummonerNameRegion',
                fields: [
                    { name: 'riotSummonerName' },
                ],
            },
            {
                name: 'PK_riot_summoner_SummonerId',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ]
    });

    return RIOT_Summoner;
};