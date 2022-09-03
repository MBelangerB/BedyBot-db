'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Tournaments extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Tournaments.belongsTo(models.Users, {
                foreignKey: 'ownerId',
                as: 'owner',
                // lors FindOne/FindALl pour include Sequelize il faut utiliser l'alias et nom la table
            });
        }
    }

    Tournaments.init({
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
        channelId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        messageId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        startDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sessionCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ts: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        //
        ownerId: {
            type: DataTypes.INTEGER,
            field: 'ownerId',
          },
    }, {
        sequelize, 
        modelName: 'Tournaments',
        tableName: 'MK_Tournaments'
    });
    return Tournaments;
};