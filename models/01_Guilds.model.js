'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Guilds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Guilds.hasOne(models.GuildOptions, {
                foreignKey: 'guildId',
                onDelete: 'CASCADE',
            });
        }
    }

    Guilds.init({
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
        guildName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        guildIconUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        guildOwnerId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        joinedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        leftAt: {
            allowNull: true,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Guilds',
        tableName: 'MK_Guilds'
    });
    return Guilds;
};