'use strict';
const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // BOT_Users.belongsToMany(models.BOT_Sessions, {
            //     through: {
            //         model: models.BOT_UserSessions,
            //         unique: false,
            //     },
            //     foreignKey: 'userId', // FK on Target (UserSession ?)
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            // });

            BOT_Users.hasMany(models.BOT_GuildUser, {
                foreignKey: 'userId', // Set FK name on TARGET
                sourceKey: 'userId', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Users.hasOne(models.BOT_UserDetails, {
              foreignKey: 'userId', // Set FK name on TARGET
              sourceKey: 'userId', // Source Key In SOURCE
              onDelete: 'CASCADE',
          });

            // BOT_Users.hasMany(models.BOT_Tournaments, {
            //     foreignKey: 'ownerId', // Set FK name on TARGET
            //     sourceKey: 'id', // Source Key In SOURCE
            //     onDelete: 'SET NULL',
            // });
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


        // getUsername(dbGuildMember) {
        //     return (dbGuildMember && dbGuildMember.length > 0 && dbGuildMember[0].hasUsername() ? dbGuildMember[0].nickname : this.defaultUsername);
        // }


        // /**
        //  * Update the username
        //  * @param {string} username
        //  */
        // async updateUsername(username) {
        //     this.set({
        //         defaultUsername: username,
        //     });
        //     await this.save();
        // }
    }

    BOT_Users.getModels = function () {
        return this.sequelize.models;
    };

    BOT_Users.init({
        userId: {
            type: Sequelize.BIGINT.UNSIGNED,
            field: 'userId',
            primaryKey: true,
            unique: true,
            allowNull: false,
          },
          username: {
            type: DataTypes.STRING(32),
            field: 'username',
            allowNull: false,
          },
          globalUsername: {
            type: DataTypes.STRING(32),
            field: 'globalUsername',
            allowNull: true,
          },
          discriminator: {
            type: DataTypes.STRING(10),
            field: 'discriminator',
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING,
            field: 'email',
            allowNull: true,
          },
          avatar: {
            type: DataTypes.STRING,
            field: 'avatar',
            allowNull: true,
          },
          banner: {
            type: DataTypes.STRING,
            field: 'banner',
            allowNull: true,
          },
          accentColor: {
            type: DataTypes.INTEGER,
            field: 'accentColor',
            allowNull: true,
          },
    }, {
        sequelize,
        modelName: 'BOT_Users',
        tableName: 'BOT_Users',
    });
    return BOT_Users;
};