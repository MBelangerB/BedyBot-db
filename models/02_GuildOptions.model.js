'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class GuildOptions extends Model {
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

    GuildOptions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        guildId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        announcementChannelId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        maxPlayerPerLobby: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 12,
        },
        addEveryone: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'GuildOptions',
        tableName: 'MK_GuildOptions',
    });
    return GuildOptions;
};