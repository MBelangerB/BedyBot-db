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
      BOT_Channels.belongsTo(models.BOT_Channels, {
        foreignKey: 'parentId', // FK on source table
        targetKey: 'id', // Key name on target table
        as: 'parent',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      BOT_Channels.hasMany(models.BOT_Channels, {
        foreignKey: 'parentId',
        as: 'childs',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      BOT_Channels.belongsTo(models.BOT_Sessions, {
        foreignKey: 'sessionId', // FK on source table
        targetKey: 'id', // Key name on target table
        // as: 'session',
        onUpdate: 'CASCADE',
        onDelete: 'set NULL',
      });
    }

    /**
     * Add a new discord channel on DB
     * @param {string} discordChannelId
     * @param {string} discordChannelName
     * @param {integer} discordChannelType
     * @param {integer} parentId
     * @param {integer} sessionId
     * @returns
     */
    static async createChannelOnDB(discordChannelId, discordChannelName, discordChannelType, parentId, sessionId) {
      return await this.create({
        discordChannelId: discordChannelId,
        discordChannelName: discordChannelName,
        discordChannelType: discordChannelType,
        parentId: parentId,
        sessionId: sessionId,
      });
    }

    /**
      * Update the discord channel name
      * @param {string} discordChannelName
      */
    async updateChannelName(discordChannelName) {
      this.set({
        discordChannelName: discordChannelName,
      });
      await this.save();
    }


    /**
     * Get BOT_Guilds by discord guildId
     * @param {string} guildId
     * @param {boolean} withInclude
     * @returns {BOT_Channels}
     */
    static async getChannelByGuildChannelId(discordChannelId) {
      return await this.findOne({ where: { discordChannelId: discordChannelId } });
    }
    static async getChannelById(channelId) {
      return await this.findOne({ where: { id: channelId } });
    }

    /**
     * Get All Channels for a GuildId and SessionId
     * @param {string} guildId
     * @param {integer} sessionId
     * @param {boolean} withLock
     * @param {*} transaction
     * @returns {BOT_Channels}
     */
    static async getAllChannelsByGuildSession(sessionId, withLock = false, transaction = null) {
      if (transaction) {
        return await this.findAll({ where: { sessionId: sessionId }, lock: withLock, transaction: transaction });
      } else {
        return await this.findAll({ where: { sessionId: sessionId } });
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
    sessionId: {
      type: DataTypes.INTEGER,
      field: 'sessionId',
      allowNull: true, // Peut-être null, car le parent n'a pas de session
    },
    parentId: {
      type: DataTypes.INTEGER,
      field: 'parentId',
      allowNull: true,
    },
    discordChannelId: {
      type: DataTypes.STRING,
      field: 'discordChannelId',
      allowNull: false,
      unique: true,
    },
    discordChannelName: {
      type: DataTypes.STRING,
      field: 'discordChannelName',
      allowNull: false,
    },
    discordChannelType: {
      type: DataTypes.STRING,
      field: 'discordChannelType',
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'BOT_Channels',
    tableName: 'BOT_Channels',
  });
  return BOT_Channels;
};