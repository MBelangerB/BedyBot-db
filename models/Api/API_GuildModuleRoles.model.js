'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class API_GuildModuleRoles extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            API_GuildModuleRoles.belongsTo(models.API_GuildModules, {
              foreignKey: 'guildModuleId', // Key name on source
              targetKey: 'id', // Key name on TARGET
            });

            API_GuildModuleRoles.belongsTo(models.API_Roles, {
              foreignKey: 'roleId', // Key name on source
              targetKey: 'id', // Key name on TARGET
            });
        }
    }

    API_GuildModuleRoles.init({
        guildModuleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'API_GuildModules',
              key: 'id',
            },
            unique: true,
          },
          roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'API_Roles',
              key: 'id',
            },
            unique: true,
          },
    }, {
        sequelize,
        modelName: 'API_GuildModuleRoles',
        tableName: 'API_GuildModuleRoles', indexes: [
            {
              name: 'sqlite_autoindex_API_GuildModuleRoles_1',
              unique: true,
              fields: [
                { name: 'guildModuleId' },
                { name: 'roleId' },
              ],
            },
          ],
    });

    return API_GuildModuleRoles;
};