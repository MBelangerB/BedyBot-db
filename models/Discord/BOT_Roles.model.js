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

        /**
         * Get BOT_Roles by id
         * @param {integer} id
         * @returns {BOT_Roles}
         */
        static async getRoleById(id, roleType = BOT_Roles.RoleTypes.MANAGER) {
            return await this.findOne({ where: { id: id, type: roleType } });
        }

        /**
         * Get BOT_Roles by discord guildId
         * @param {string} guildId
         * @param {BOT_Roles.RoleTypes} roleType
         * @returns {BOT_Roles}
         */
        static async getRoleByGuildId(guildId, roleType = BOT_Roles.RoleTypes.MANAGER) {
            return await this.findOne({ where: { guildId: guildId, type: roleType } });
        }

        /**
         * Get BOT_Roles by roleName
         * @param {string} guildId
         * @param {string} roleName
         * @returns {BOT_Roles}
         */
        static async getRoleByRoleName(guildId, roleName) {
            return await this.findOne({ where: { guildId: guildId, roleName: roleName } });
        }
    }

    BOT_Roles.RoleTypes = {
        MANAGER: 1,
        PLAYER: 2,
    };

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