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
    }, {
        sequelize,
        modelName: 'API_Guilds',
        tableName: 'API_Guilds',
    });

    return API_Guilds;
};