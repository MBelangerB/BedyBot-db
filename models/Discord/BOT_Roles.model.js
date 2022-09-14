'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Roles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            models.BOT_Roles.hasOne(models.BOT_Guilds, {
                foreignKey: 'guildId',
            });
        }
    }

    BOT_Roles.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guildId',
            allowNull: false,
        },
        roleId: {
            type: DataTypes.STRING,
            field: 'roleId',
            allowNull: false,
        },
        roleName: {
            type: DataTypes.STRING,
            field: 'roleName',
            allowNull: false,
        },
        roleColor: {
            type: DataTypes.STRING,
            field: 'roleColor',
            allowNull: false,
        },
        // Manager - PLayer
        type: {
            type: DataTypes.INTEGER,
            field: 'type',
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'BOT_Roles',
        tableName: 'BOT_Roles',
    });
    return BOT_Roles;
};