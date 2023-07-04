'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BOT_GuildUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BOT_GuildUser.belongsTo(models.BOT_Guilds, {
        foreignKey: 'guildId', // FK in source
        targetKey: 'guildId', // Key name in target
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      BOT_GuildUser.belongsTo(models.BOT_Users, {
        foreignKey: 'userId', // Set FK name on SOURCE
        targetKey: 'userId', // Key name on TARGET
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

    }

    // /**
    //  * Init the guild user
    //  * @param {string} userId
    //  * @returns
    //  */
    // static async initGuildUser(guildId, userId, nickname) {
    //   return await this.create({
    //     userId: userId,
    //     guildId: guildId,
    //     nickname: nickname,
    //   });
    // }

    // /**
    //  * Update the guild member nickname
    //  * @param {string} nickname
    //  */
    // async updateUsername(nickname) {
    //   if (nickname) {
    //     this.set({
    //       nickname: nickname,
    //     });
    //     await this.save();
    //   }
    // }

    // hasUsername() {
    //   return (this.nickname && this.nickname.length > 0);
    // }
  }

  BOT_GuildUser.getModels = function () {
    return this.sequelize.models;
  };

  BOT_GuildUser.init({
    guildId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'guildId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      // references: {
      //   model: 'BOT_Guilds', // This is a reference to another model
      //   key: 'guildId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    userId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'userId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      // references: {
      //   model: 'BOT_Users', // This is a reference to another model
      //   key: 'userId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    nickname: {
      type: DataTypes.STRING(120),
      field: 'nickname',
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      field: 'avatar',
      allowNull: true,
    },
    joinedAt: {
      type: DataTypes.DATE,
      field: 'joinedAt',
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    leftAt: {
      type: DataTypes.DATE,
      field: 'leftAt',
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'BOT_GuildUser',
    tableName: 'BOT_GuildUser',
  });

  return BOT_GuildUser;
};