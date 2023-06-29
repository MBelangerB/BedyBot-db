'use strict';

const { Model, Sequelize } = require('sequelize');

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
            BOT_Roles.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on SOURCE
                targetKey: 'guildId', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }
    }

    BOT_Roles.RoleTypes = {
        MANAGER: 1,
        PLAYER: 2,
    };


    BOT_Roles.init({
        guildId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'guildId',
            primaryKey: true,
            unique: true,
            allowNull: false,
            references: {
                model: 'BOT_Guilds', // This is a reference to another model
                key: 'guildId', // This is the column name of the referenced model
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        roleId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'roleId',
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        roleName: {
            type: DataTypes.STRING(120),
            field: 'roleName',
            allowNull: false,
        },
        rolePermission: {
            type: DataTypes.STRING(255),
            field: 'permissionLevel',
            allowNull: false,
        },
        roleColor: {
            type: DataTypes.INTEGER,
            field: 'color',
            allowNull: true,
        },
        rolePosition: {
            type: DataTypes.INTEGER,
            field: 'position',
            allowNull: true,
        },
        type: {
            type: DataTypes.INTEGER,
            field: 'type',
            allowNull: true,
        },
        lastUpdate: {
            type: DataTypes.DATE,
            field: 'lastUpdated',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'BOT_Roles',
        tableName: 'BOT_Roles',
    });

    return BOT_Roles;
};