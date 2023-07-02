'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Guilds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_Guilds.hasOne(models.BOT_GuildOptions, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'guildId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.BOT_GuildUser, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'guildId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.BOT_Roles, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'guildId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.API_GuildModules, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'guildId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            // BOT_Guilds.hasMany(models.BOT_Tournaments, {
            //     foreignKey: 'guildId', // Set FK name on TARGET
            //     sourceKey: 'id', // Source Key In SOURCE
            //     onDelete: 'CASCADE',
            // });

        } // End associate
    }

    BOT_Guilds.getModels = function () {
        return this.sequelize.models;
    }

    BOT_Guilds.init({
        guildId: {
            type: DataTypes.BIGINT.UNSIGNED,
            field: 'guildId',
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        guildName: {
            type: DataTypes.STRING(100),
            field: 'guildName',
            allowNull: false,
        },
        guildIconUrl: {
            type: DataTypes.STRING,
            field: 'guildIconUrl',
            allowNull: true,
        },
        guildBannerUrl: {
            type: DataTypes.STRING,
            field: 'guildBannerUrl',
            allowNull: true,
        },
        guildOwnerId: {
            type: DataTypes.BIGINT.UNSIGNED, // DataTypes.STRING(80),
            field: 'guildOwnerId',
            allowNull: false,
        },
        guildRegion: {
            type: DataTypes.STRING(10),
            field: 'guildRegion',
            allowNull: true,
        },
        guildPreferredLocale: {
            type: DataTypes.STRING(10),
            field: 'guildPreferredLocale',
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'isActive',
            allowNull: false,
            defaultValue: true,
        },
        joinedAt: {
            type: DataTypes.DATE,
            field: 'joinedAt',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        leftAt: {
            type: DataTypes.DATE,
            field: 'leftAt',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'BOT_Guilds',
        tableName: 'BOT_Guilds',
    });

    return BOT_Guilds;
};