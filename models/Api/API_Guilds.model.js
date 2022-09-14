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
        }
    }

    API_Guilds.init({
        id: {
            type: DataTypes.STRING,
            field: 'id',
            primaryKey: true,
            allowNull: false,
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