'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BOT_Channels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.BOT_Channels.belongsTo(models.BOT_Channels, {
        foreignKey: 'parentId',
        as: 'parent',
      });
      models.BOT_Channels.hasMany(models.BOT_Channels, {
        foreignKey: 'parentId',
        as: 'childs',
      });

      models.BOT_Channels.belongsTo(models.BOT_Sessions, {
        foreignKey: 'sessionId',
        as: 'session',
      });
    }

    /**
     * Get BOT_Guilds by discord guildId
     * @param {string} guildId
     * @param {boolean} withInclude
     * @returns {BOT_Channels}
     */
    static async getChannelByGuildId(guildId, channelId) {
      return await this.findOne({ where: { guildId: guildId, channelId: channelId } });
    }

    /**
     * Get All Channels for a GuildId and SessionId
     * @param {string} guildId
     * @param {integer} sessionId
     * @param {boolean} withLock
     * @param {*} transaction
     * @returns {BOT_Channels}
     */
    static async getAllChannelsByGuildSession(guildId, sessionId, withLock = false, transaction = null) {
      if (transaction) {
        return await this.findAll({ where: { guildId: guildId, sessionId: sessionId }, lock: withLock, transaction: transaction });
      } else {
        return await this.findAll({ where: { guildId: guildId, sessionId: sessionId } });
      }
    }


  }

  BOT_Channels.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    guildId: {
      type: DataTypes.STRING,
      field: 'guildId',
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.INTEGER,
      field: 'sessionId',
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      field: 'parentId',
      allowNull: true,
    },
    channelId: {
      type: DataTypes.STRING,
      field: 'channelId',
      allowNull: false,
      unique: true,
    },
    channelName: {
      type: DataTypes.STRING,
      field: 'channelName',
      allowNull: false,
    },
    channelType: {
      type: DataTypes.STRING,
      field: 'channelType',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BOT_Channels',
    tableName: 'BOT_Channels',
  });
  return BOT_Channels;
};