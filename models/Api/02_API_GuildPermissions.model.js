'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class API_GuildPermissions extends Model {
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

    API_GuildPermissions.init({
        userId: {
            type: DataTypes.STRING,
            field: 'userId',
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guildId',
        },

        permissions: {
            type: DataTypes.STRING,
            field: 'permissions',
        },
        permissions_new: {
            type: DataTypes.STRING,
            field: 'permissions_new',
        },
        owner: {
            type: DataTypes.INTEGER,
            field: 'owner',
        },
    }, {
        sequelize,
        modelName: 'API_GuildUserPermissions',
        tableName: 'API_GuildUserPermissions',
    });

    return API_GuildPermissions;
};