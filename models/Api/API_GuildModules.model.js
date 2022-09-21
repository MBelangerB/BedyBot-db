'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_GuildModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_GuildModules.belongsTo(models.API_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'id', // Key name on TARGET
        as: 'guildId',
      });
    }

    /**
     * Add a new guild module on DB
     * @param {integer} moduleId 
     * @param {integer} guildId 
     * @param {integer} authorizationType 
     * @param {boolean} isActive 
     * @returns {API_GuildModules}
     */
    static async addGuildModule(moduleId, guildId, authorizationType, isActive) {
      return await this.create({
        moduleId: moduleId,
        guildId: guildId,
        authorizationType: authorizationType,
        isActive: isActive,
      });
    }

    /**
     * Get a guyild module by id
     * @param {integer} id 
     * @returns {API_GuildModules}
     */
    static async findGuildModuleById(id) {
      return await this.findOne({ where: { id: id } });
    }

    /**
     * Get a guild module by module id / guild id
     * @param {integer} moduleId 
     * @param {integer} guildId 
     * @returns {API_GuildModules} 
     */
    static async findGuildModuleByGuildId(moduleId, guildId) {
      return await this.findOne({ where: { moduleId: moduleId, guildId: guildId } });
    }

  }

  API_GuildModules.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    moduleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'API_Modules',
        key: 'id',
      },
    },
    guildId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'API_Guilds',
        key: 'id',
      },
    },
    // 1:allowForAllExcept - 2:disallowForAllExcept
    authorizationType: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'API_GuildModules',
    tableName: 'API_GuildModules',
    indexes: [
      {
        name: 'PK_api_guildModule_id',
        unique: true,
        fields: [
          { name: 'id' },
        ],
      },
      {
        name: 'IDX_api_guildModule_moduleId',
        fields: [
          { name: 'moduleId' },
        ],
      },
      {
        name: 'IDX_api_guildModule_guildId',
        fields: [
          { name: 'guildId' },
        ],
      },
    ],
  });

  return API_GuildModules;
};