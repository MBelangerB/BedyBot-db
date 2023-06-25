'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class API_Modules extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        /* eslint-disable-next-line no-unused-vars */
        static associate(models) {
            // define association here
            API_Modules.hasMany(models.API_Commands, {
                foreignKey: 'moduleId', // FK name on TARGET
                sourceKey: 'id', // Key name on SOURCE
                onDelete: 'CASCADE',
            });

            API_Modules.hasMany(models.API_GuildModules, {
                foreignKey: 'moduleId', // FK name on TARGET
                sourceKey: 'id', // Key name on SOURCE
                onDelete: 'CASCADE',
            });
        }

        /**
         * Add a new module in db
         * @param {string} moduleName
         * @param {boolean} isEnabled
         * @param {boolean} isPremium
         * @returns {API_Modules}
         */
        static async addModule(moduleName, isEnabled, isPremium) {
            return await this.create({
                name: moduleName,
                isEnabled: isEnabled,
                isPremium: isPremium,
            });
        }

        /**
         * Get a module by Id
         * @param {*} id
         * @returns {API_Modules}
         */
        static async findModuleById(id) {
            return await this.findOne({ where: { id: id } });
        }
    }

    API_Modules.init({
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        isEnabled: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        isPremium: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        sequelize,
        modelName: 'API_Modules',
        tableName: 'API_Modules',
        indexes: [
            {
                name: 'sqlite_autoindex_API_Modules_1',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
            {
                name: 'PK_api_modules_id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
        ],
    });

    return API_Modules;
};