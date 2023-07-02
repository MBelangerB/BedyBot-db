'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class API_GuildUserPermissions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            API_GuildUserPermissions.belongsTo(models.API_Guilds, {
                foreignKey: 'guildId', // Key name on source
                targetKey: 'id', // Key name on TARGET
                // as: 'guildId',
            });

            API_GuildUserPermissions.belongsTo(models.API_Users, {
                foreignKey: 'userId', // Key name on source
                targetKey: 'id', // Key name on TARGET
            });
        }

        static models() {
            return this.sequelize.models;
        }

        static async addGuildUserPermission(userId, guildId, isOwner, permissions, permissions_new) {
           return await this.create({
                userId: userId,
                guildId: guildId,
                permissions: permissions,
                permissionsNew: permissions_new,
                isOwner: isOwner
            });     
        }

        /**
         * Return user permission for a guild
         * @param {string} guildId Discord guild id
         * @param {string} userId  Discord user id
         * @returns {API_GuildUserPermissions}
         */
        static async getUserPermissionByUserId(guildId, userId) {
            return await this.findOne({ where: { guildId: guildId, userId: userId } });
        }

        /**
         * Return all permissions for a user
         * @param {string} userId  Discord user id
         * @param {boolean} withInclude
         * @returns {API_GuildUserPermissions[]}
         */
        static async getAllPermissionUserByUserId(userId, withInclude = true) {
            if (withInclude) {
                // return await this.findAll({ where: { userId: userId }, include: ['guild'] });
                return await this.findAll({ where: { userId: userId }, include: [this.models().API_Guilds] });
            } else {
                return await this.findAll({ where: { userId: userId } });
            }
        }

        async updateGuildUserPermission(isOwner, permissions, permissions_new) {
            this.set({
                permissions: permissions,
                permissionsNew: permissions_new,
                isOwner: isOwner,
                ts: Date.now()
            });
            await this.save();
        } 
    }

    API_GuildUserPermissions.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
        },
        guildId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'API_Guilds',
                key: 'id',
            },
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'API_Users',
                key: 'id',
            },
            unique: true,
        },
        permissions: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        permissionsNew: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        isOwner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        lastUpdate: {
            type: DataTypes.DATE,
            field: 'lastUpdate',
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        sequelize,
        modelName: 'API_GuildUserPermissions',
        tableName: 'API_GuildUserPermissions',
        indexes: [
            {
                name: 'PK_api_guildUserPermissions_id',
                unique: true,
                fields: [{ name: 'id' }],
            },
            {
                name: 'UQ_api_guildUserPermissions_guildIdUserId',
                unique: true,
                fields: [
                    { name: 'guildId' },
                    { name: 'userId' },
                ],
            },
        ],
    });

    return API_GuildUserPermissions;
};