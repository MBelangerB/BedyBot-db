'use strict';
const { Model } = require('sequelize');

/*
    belongTo    -> 1..1     (inverse direction hasOne)
    hasOne      -> 1..1

    BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
    HasOne associations are associations where the foreign key for the one-to-one relation exists on the target model.

    Man has only one right arm (hasOne)
    Right arm belongs to one man (belongTo)
 */

module.exports = (sequelize, DataTypes) => {
    class BOT_GuildOptions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
        }

        static async initOptionForGuildId(guildId) {
            return await this.create({
                guildId: guildId,
            });
        }
    }

    BOT_GuildOptions.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        guildId: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'guildId',
        },
        announcementChannelId: {
            type: DataTypes.STRING,
            field: 'announcementChannelId',
            allowNull: true,
        },
        maxPlayerPerLobby: {
            type: DataTypes.INTEGER,
            field: 'maxPlayerPerLobby',
            allowNull: false,
            defaultValue: 12,
        },
        addEveryone: {
            type: DataTypes.BOOLEAN,
            field: 'addEveryone',
            allowNull: true,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: 'BOT_GuildOptions',
        tableName: 'BOT_GuildOptions',
    });
    return BOT_GuildOptions;
};