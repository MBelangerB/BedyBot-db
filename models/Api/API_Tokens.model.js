'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_Tokens.belongsTo(models.API_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'id', // Key name on TARGET
        as: 'guildId',
      });

      API_Tokens.belongsTo(models.API_Users, {
        foreignKey: 'userId', // Key name on source
        targetKey: 'id', // Key name on TARGET
        onDelete: 'CASCADE',
      });
    }

    /**
     * Add a new access token in DB
     * @param {string} userId 
     * @param {string} accessToken 
     * @param {string} refreshToken 
     * @param {integer} source 
     * @param {string} scope 
     * @param {string} tokenType 
     * @param {datetime} expireAt 
     * @returns {API_Tokens}
     */
    static async addAccessToken(userId, accessToken, refreshToken, source, scope, tokenType, expireAt) {
      return await this.create({
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        source: source,
        scope: scope,
        tokenType: tokenType,
        expireAt: expireAt,
      });
    }

    /**
     * Add a new access token for a specific guild in DB
     * @param {string} userId 
     * @param {string} guildId 
     * @param {string} accessToken 
     * @param {string} refreshToken 
     * @param {integer} source 
     * @param {string} scope 
     * @param {string} tokenType 
     * @param {datetime} expireAt 
     * @returns {API_Tokens}
     */
    static async addGuildAccessToken(userId, guildId, accessToken, refreshToken, source, scope, tokenType, expireAt) {
      return await this.create({
        guildId: guildId,
        userId: userId,
        accessToken: accessToken,
        refreshToken: refreshToken,
        source: source,
        scope: scope,
        tokenType: tokenType,
        expireAt: expireAt,
      });
    }

    /**
     * Find a token by id
     * @param {integer} id 
     * @returns {API_Tokens} 
     */
    static async findTokenById(id) {
      return await this.findOne({ where: { id: id } });
    }

    /**
     * Find a token by userId
     * @param {integer} userId 
     * @returns {API_Tokens} 
     */
    static async findTokenByUserId(userId) {
      return await this.findOne({ where: { userId: userId } });
    }

    /**
     * Find a token by a guild id and user Id
     * @param {integer} guildId 
     * @param {integer} userId 
     * @returns {API_Tokens} 
     */
    static async findTokenByGuildIdUserId(guildId, userId) {
      return await this.findOne({ where: { guildId: guildId, userId: userId } });
    }

    /**
     * Return the token for a specified token for a source
     * @param {string} token
     * @param {integer} source
     * @returns {API_Tokens}
     */
    static async findTokenByToken(token, source) {
      return await this.findOne({ where: { accessToken: token, source: source } });
    }

  }

  API_Tokens.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'API_Users',
        key: 'id',
      },
    },
    guildId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'API_Guilds',
        key: 'id',
      },
    },
    source: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    scope: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tokenType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: 'Bearer',
    },
    expireAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'API_Tokens',
    tableName: 'API_Tokens',
    indexes: [
      {
        name: 'PK_api_tokens_id',
        unique: true,
        fields: [{ name: 'id' }],
      },
      {
        name: 'IDX_api_tokens_userId',
        fields: [{ name: 'userId' }],
      },
      {
        name: 'IDX_api_tokens_userIdGuildId',
        fields: [
          { name: 'userId' },
          { name: 'guildId' },
        ],
      },
    ],
  });

  return API_Tokens;
};