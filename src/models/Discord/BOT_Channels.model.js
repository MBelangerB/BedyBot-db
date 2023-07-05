'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Channels extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_Channels.hasOne(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'guildId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });
        } // End associate
    }

    BOT_Channels.getModels = function () {
        return this.sequelize.models;
    };

    BOT_Channels.init({
        channelId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'guildId',
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        guildId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'guildId',
            allowNull: true,
            // references: {
            //   model: 'BOT_Guilds', // This is a reference to another model
            //   key: 'guildId', // This is the column name of the referenced model
            //   onDelete: 'CASCADE',
            //   onUpdate: 'CASCADE',
            // },
          },
        channelParentId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'channelParentId',
            allowNull: false,
            comment: 'A parent category can contains max 50 channels'
        },
        channelType: {
            type: DataTypes.INTEGER,
            field: 'channelType',
            allowNull: false,
        },
        channelName: {
            type: DataTypes.STRING(100),
            field: 'channelName',
            allowNull: true,
        },
        channelTopic: {
            type: DataTypes.STRING(4096),
            field: 'channelTopic',
            allowNull: true,
        },
        channelPermission: {
            type: DataTypes.STRING(255),
            field: 'channelPermission',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'BOT_Channels',
        tableName: 'BOT_Channels',
    });

    return BOT_Channels;
};