'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class API_Guilds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            models.API_Guilds.belongsToMany(models.API_Users, {
                through: {
                    model: models.API_GuildUserPermissions,
                    unique: false,
                },
                foreignKey: 'userId',
            });

            models.API_Guilds.hasOne(models.API_GuildRoles, {
                foreignKey: 'guildId',
                onDelete: 'CASCADE',
            });

            models.API_Guilds.belongsTo(models.API_Tokens, {
                foreignKey: 'guildId', // Set FK name
                targetKey: 'guildId', // Key name on API_Tokens
                onDelete: 'CASCADE',
            });
        }

        /**
         * Return API Guild for a ID (PK)
         * @param {integer} id
         * @returns {API_Guilds}
         */
        static async getApiGuildById(id) {
            return await this.findOne({ where: { id: id } });
        }

        /**
         * Return API Guild for a guild id
         * @param {string} guildId Discord guild id
         * @returns {API_Guilds}
         */
        static async getApiGuildByGuildId(guildId) {
            return await this.findOne({ where: { guildId: guildId } });
        }

    }

    API_Guilds.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guildId',
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            field: 'name',
            allowNull: false,
        },
        icon: {
            type: DataTypes.STRING,
            field: 'icon',
            allowNull: true,
        },
        ownerId: {
            type: DataTypes.STRING,
            field: 'ownerId',
            allowNull: true,
        },
        region: {
            type: DataTypes.STRING,
            field: 'region',
            allowNull: true,
        },
        preferred_locale: {
            type: DataTypes.STRING,
            field: 'preferred_locale',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'API_Guilds',
        tableName: 'API_Guilds',
    });

    return API_Guilds;
};