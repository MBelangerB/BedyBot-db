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
            models.API_GuildUserPermissions.belongsTo(models.API_Guilds, {
                foreignKey: 'guildId', // FK in current table
                targetKey: 'guildId', // Key name on API_Guilds
                // as: 'guild',
            });
            // TODO:
            // models.API_GuildUserPermissions.belongsTo(models.API_Users, {
            //     foreignKey: 'externalId',
            //     as: 'user',
            // });
        }

        static models() {
            return this.sequelize.models;
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
    }

    API_GuildUserPermissions.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            field: 'userId',
            allowNull: false,
            references: {
                model: sequelize.models.API_Users,
                key: 'externalId',
            },
        },
        guildId: {
            type: DataTypes.STRING,
            field: 'guildId',
            allowNull: false,
            // references: {
            //     model: sequelize.models.API_Guilds,
            //     key: 'guildId',
            // },
        },
        permissions: {
            type: DataTypes.STRING,
            field: 'permissions',
            allowNull: false,
        },
        permissionsNew: {
            type: DataTypes.STRING,
            field: 'permissionsNew',
            allowNull: true,
        },
        isOwner: {
            type: DataTypes.INTEGER,
            field: 'isOwner',
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
    });

    return API_GuildUserPermissions;
};