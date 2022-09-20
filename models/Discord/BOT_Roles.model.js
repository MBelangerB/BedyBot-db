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
            BOT_Roles.belongsTo(models.BOT_Guilds, {
                foreignKey: 'guildId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }


        /**
         * Add a new discord role on DB
         * @param {string} guildId
         * @param {string} discordRoleId
         * @param {string} discordRoleName
         * @param {integer} discordColor
         * @param {integer} type
         * @returns
         */
        static async createRoleOnDB(guildId, discordRoleId, discordRoleName, discordColor, type) {
            return await this.create({
                guildId: guildId,
                discordRoleId: discordRoleId,
                discordRoleName: discordRoleName,
                discordRoleColor: discordColor,
                type: type,
            });
        }

        /**
         * Update DB Role
         * @param {string} discordRoleId
         * @param {string} discordRoleName
         * @param {integer} discordColor
         */
        async updateRole(discordRoleId, discordRoleName, discordColor) {
            if (discordRoleId !== this.discordRoleId) {
                this.set({
                    discordRoleId: discordRoleId,
                });
            }
            if (discordRoleName !== this.discordRoleName) {
                this.set({
                    discordRoleName: discordRoleName,
                });
            }
            if (discordColor !== this.discordRoleColor) {
                this.set({
                    discordRoleColor: discordColor,
                });
            }

            if (this.changed() && this.changed.length > 0) {
                await this.save();
            }
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
         * Get BOT_Roles by guildId
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
        static async getRoleByRoleName(guildId, discordRoleName) {
            return await this.findOne({ where: { guildId: guildId, discordRoleName: discordRoleName } });
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
            type: DataTypes.INTEGER,
            field: 'guildId',
            allowNull: false,
        },
        discordRoleId: {
            type: DataTypes.STRING,
            field: 'discordRoleId',
            allowNull: false,
        },
        discordRoleName: {
            type: DataTypes.STRING,
            field: 'discordRoleName',
            allowNull: false,
        },
        discordRoleColor: {
            type: DataTypes.STRING,
            field: 'discordRoleColor',
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