'use strict';

const { Model, Sequelize } = require('sequelize');
const { BedyAPIConst } = require('../../BedyAPIConst');

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

            BOT_Roles.hasMany(models.API_CommandPermissions, {
                foreignKey: 'roleId', // Set FK name on TARGET
                sourceKey: 'roleId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });
        }
    }

    // TODO: Move ailleurs ?
    BOT_Roles.RoleTypes = {
        MANAGER: 1,
        PLAYER: 2,
    };

    BOT_Roles.init({
        guildId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'guildId',
            primaryKey: true,
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
        // https://bit-calculator.com/bit-shift-calculator
        // https://discordapi.com/permissions.html#8
        rolePermission: {
            type: DataTypes.STRING(255),
            field: 'permissionLevel',
            allowNull: false,
        },
        // INT value
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
        /**
         * User TYPE
         * @param {BedyAPIConst.BedyBotRoleType}
         */
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