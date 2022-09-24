'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_Guilds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_Guilds.belongsToMany(models.API_Users, {
        through: {
          model: models.API_GuildUserPermissions,
          unique: false,
        },
        foreignKey: 'guildId',
      });

      API_Guilds.hasMany(models.API_Roles, {
        foreignKey: 'guildId', // FK name on TARGET
        sourceKey: 'id', // Key name on SOURCE
        onDelete: 'CASCADE',
      });

      API_Guilds.hasMany(models.API_Tokens, {
        foreignKey: 'guildId', // FK name on TARGET
        sourceKey: 'id', // Key name on SOURCE
        onDelete: 'CASCADE',
      });

      API_Guilds.hasMany(models.API_GuildModules, {
        foreignKey: 'guildId', // FK name on TARGET
        sourceKey: 'id', // Key name on SOURCE
        onDelete: 'CASCADE',
      });
    }

    /**
     * Add a new guild in DB
     * @param {string} guildId 
     * @param {string} guildName 
     * @param {string} guildIcon 
     * @param {string} guildOwnerId 
     * @param {string} region 
     * @param {string} preferred_locale 
     * @returns {API_Guilds}
     */
    static async addGuild(guildId, guildName, guildIcon, guildOwnerId, region, preferred_locale) {
      return await this.create({
        discordGuildId: guildId,
        name: guildName,
        icon: guildIcon,
        ownerId: guildOwnerId,
        region: region,
        preferred_locale: preferred_locale
      });
    }

    /**
     * 
     * @param {*} guildId 
     * @param {*} guildName 
     * @param {*} guildIcon 
     * @param {*} guildOwnerId 
     * @param {*} region 
     * @param {*} preferred_locale 
     * @returns 
     */
    static async addGuild(guildId, guildName, guildIcon) {
      return await this.create({
        discordGuildId: guildId,
        name: guildName,
        icon: guildIcon,
      });
    }

    /**
     * Get a guild by id
     * @param {*} id 
     * @returns {API_Guilds} 
     */
    static async findGuildById(id) {
      return await this.findOne({ where: { id: id } });
    }

    /**
     * GEt a guild by discord id
     * @param {string} discordGuildId 
     * @returns {API_Guilds} 
     */
    static async findGuildByGuildId(discordGuildId) {
      return await this.findOne({ where: { discordGuildId: discordGuildId } });
    }

    async updateGuildInfo(guildName, guildIcon) {
      this.set({
        name: guildName,
        icon: guildIcon,
      });
      await this.save();
    }
  }

  API_Guilds.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    discordGuildId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ownerId: {
      type: DataTypes.STRING(80),
      allowNull: true,
    },
    region: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    preferred_locale: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'API_Guilds',
    tableName: 'API_Guilds',
    indexes: [
      {
        name: 'PK_api_guilds_id',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'UQ_api_guilds_guildId',
        unique: true,
        fields: [{ name: 'discordGuildId' }],
      },
    ],
  });

  return API_Guilds;
};