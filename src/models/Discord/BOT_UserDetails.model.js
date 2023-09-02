'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_UserDetails extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_UserDetails.belongsTo(models.BOT_Users, {
              foreignKey: 'userId', // Set FK name on SOURCE
              targetKey: 'userId', // Key name on TARGET
              onDelete: 'CASCADE',
              onUpdate: 'CASCADE',
            });

        }

        // static async createUserOnDB(discordUserId, discordUsername, discordDiscriminator) {
        //     return await this.create({
        //         discordUserId: discordUserId,
        //         defaultUsername: discordUsername,
        //         discriminator: discordDiscriminator,
        //     });
        // }

        // /**
        //  * Get the BOT_Users for a guildId (db) and userId
        //  * @param {string} guildId
        //  * @param {string} userId
        //  * @returns {BOT_Users}
        //  */
        // static async getUserByUserId(guildId, userId, withInclude = false) {
        //     if (withInclude) {
        //         // return await this.findOne({ where: { userId: userId, 'BOT_GuildUser.guildId': guildId }, include: [this.models().BOT_GuildUser] });
        //         return await this.findOne({
        //             where: { discordUserId: userId },
        //             include: {
        //                 model: this.models().BOT_GuildUsers,
        //                 where: {
        //                     guildId: guildId,
        //                 },
        //                 required: false,
        //             },
        //         });
        //     } else {
        //         return await this.findOne({ where: { discordUserId: userId } });
        //     }

        // }


        // getTwitchUsername() {
        //     return this.twitchUsername ? this.twitchUsername : 'N/A';
        // }
        // getSwitchUsername() {
        //     return this.switchUsername ? this.switchUsername : 'N/A';
        // }
        // getSwitchFriendCode() {
        //     return this.switchFriendCode ? this.switchFriendCode : 'N/A';
        // }

        // /**
        //  * Update the switchUsername
        //  * @param {string} switchUsername
        //  */
        // async updateSwitchUsername(switchUsername) {
        //     // On update pour raison X
        //     this.set({
        //         switchUsername: switchUsername,
        //     });
        //     await this.save();
        // }

        // /**
        //  * Update the twitchUsername
        //  * @param {string} twitchUsername
        //  */
        // async updateTwitchUsername(twitchUsername) {
        //     this.set({
        //         twitchUsername: twitchUsername,
        //     });
        //     await this.save();
        // }

        // /**
        //   * Update the switchFriendCode
        //   * @param {string} switchFriendCode
        //   */
        // async updateSwitchFriendCode(switchFriendCode) {
        //     this.set({
        //         switchFriendCode: switchFriendCode,
        //     });
        //     await this.save();
        // }
    }

    BOT_UserDetails.init({
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
        field: 'userId',
        primaryKey: true,
        unique: true,
        allowNull: false,
        references: {
          model: 'BOT_Users', // This is a reference to another model
          key: 'userId', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      switchFriendCode: {
        type: DataTypes.STRING(20),
        field: 'switchFriendCode',
        allowNull: true,
      },
      switchUsername: {
        type: DataTypes.STRING(32),
        field: 'switchUsername',
        allowNull: true,
      },
      twitchUsername: {
        type: DataTypes.STRING(32),
        field: 'twitchUsername',
        allowNull: true,
      },
    }, {
        sequelize,
        modelName: 'BOT_UserDetails',
        tableName: 'BOT_UserDetails',
    });

    return BOT_UserDetails;
};