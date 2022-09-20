'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_Users.belongsToMany(models.BOT_Sessions, {
                through: {
                    model: models.BOT_UserSessions,
                    unique: false,
                },
                foreignKey: 'userId', // FK on Target (UserSession ?)
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });

            BOT_Users.hasMany(models.BOT_GuildUsers, {
                foreignKey: 'userId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Users.hasMany(models.BOT_Tournaments, {
                foreignKey: 'ownerId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'SET NULL',
            });
        }

        static models() {
            return this.sequelize.models;
        }

        static async createUserOnDB(discordUserId, discordUsername, discordDiscriminator) {
            return await this.create({
                discordUserId: discordUserId,
                defaultUsername: discordUsername,
                discriminator: discordDiscriminator,
            });
        }

        /**
         * Get the BOT_Users for a guildId (db) and userId
         * @param {string} guildId
         * @param {string} userId
         * @returns {BOT_Users}
         */
        static async getUserByUserId(guildId, userId, withInclude = false) {
            if (withInclude) {
                // return await this.findOne({ where: { userId: userId, 'BOT_GuildUser.guildId': guildId }, include: [this.models().BOT_GuildUser] });
                return await this.findOne({
                    where: { discordUserId: userId },
                    include: {
                        model: this.models().BOT_GuildUsers,
                        where: {
                            guildId: guildId,
                        },
                        required: false
                    },
                });
            } else {
                return await this.findOne({ where: { discordUserId: userId } });
            }

        }


        getUsername(dbGuildMember) {
            return (dbGuildMember && dbGuildMember.length > 0 && dbGuildMember[0].hasUsername() ? dbGuildMember[0].nickname : this.defaultUsername);
        }
        getTwitchUsername() {
            return this.twitchUsername ? this.twitchUsername : 'N/A';
        }
        getSwitchUsername() {
            return this.switchUsername ? this.switchUsername : 'N/A';
        }
        getSwitchFriendCode() {
            return this.switchFriendCode ? this.switchFriendCode : 'N/A';
        }


        /**
         * Update the username
         * @param {string} username
         */
        async updateUsername(username) {
            this.set({
                defaultUsername: username,
            });
            await this.save();
        }

        /**
         * Update the switchUsername
         * @param {string} switchUsername
         */
        async updateSwitchUsername(switchUsername) {
            // On update pour raison X
            this.set({
                switchUsername: switchUsername,
            });
            await this.save();
        }

        /**
         * Update the twitchUsername
         * @param {string} twitchUsername
         */
        async updateTwitchUsername(twitchUsername) {
            this.set({
                twitchUsername: twitchUsername,
            });
            await this.save();
        }

        /**
          * Update the switchFriendCode
          * @param {string} switchFriendCode
          */
        async updateSwitchFriendCode(switchFriendCode) {
            this.set({
                switchFriendCode: switchFriendCode,
            });
            await this.save();
        }
    }

    BOT_Users.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        discordUserId: {
            type: DataTypes.STRING,
            field: 'discordUserId',
            allowNull: false,
        },
        defaultUsername: {
            type: DataTypes.STRING,
            field: 'defaultUsername',
            allowNull: false,
        },
        discriminator: {
            type: DataTypes.STRING(10),
            field: 'discriminator',
            allowNull: false,
        },
        // Custom user info. Shared with all guilds
        switchFriendCode: {
            type: DataTypes.STRING,
            field: 'switchFriendCode',
            allowNull: true,
        },
        switchUsername: {
            type: DataTypes.STRING,
            field: 'switchUsername',
            allowNull: true,
        },
        twitchUsername: {
            type: DataTypes.STRING,
            field: 'twitchUsername',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'BOT_Users',
        tableName: 'BOT_Users',
    });
    return BOT_Users;
};