'use strict';

const { Model } = require('sequelize');
const { uuid } = require('uuidv4');


module.exports = (sequelize, DataTypes) => {
    class APIClients extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    APIClients.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        clientId: {
            type: DataTypes.STRING(36),
            allowNull: false,
            unique: true,
            default: uuid(),
        },
        clientSecret: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'API_Clients',
        tableName: 'API_Clients',
    });

    return APIClients;
};