'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BOT_GuildUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.BOT_GuildUsers.hasOne(models.BOT_Guilds, {
        foreignKey: 'guildId',
      });

      // models.BOT_GuildUsers.hasOne(models.BOT_Users, {
      //   foreignKey: 'userId',
      // });

      models.BOT_GuildUsers.belongsTo(models.BOT_Users, {
        foreignKey: 'userId', // Set FK name
        targetKey: 'userId', // Key name on BOT_Users
        onDelete: 'CASCADE',
      });

    }

    /**
     * Init the guild user
     * @param {string} userId
     * @returns
     */
    static async initGuildUser(guildId, userId, nickname) {
      return await this.create({
        userId: userId,
        guildId: guildId,
        nickname: nickname,
      });
    }

    /**
     * Update the guild member nickname
     * @param {string} nickname
     */
    async updateUsername(nickname) {
      if (nickname) {
        this.set({
          nickname: nickname,
        });
        await this.save();
      }
    }

    hasUsername() {
      return (this.username && this.username.length > 0);
    }
  }

  BOT_GuildUsers.init({
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
    },
    guildId: {
      type: DataTypes.STRING,
      field: 'guildId',
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      field: 'nickname',
      allowNull: true,
    },
    joinedAt: {
      type: DataTypes.DATE,
      field: 'joinedAt',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'BOT_GuildUsers',
    tableName: 'BOT_GuildUsers',
  });

  return BOT_GuildUsers;
};