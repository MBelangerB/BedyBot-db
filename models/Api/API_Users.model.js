'use strict';
const { Model } = require('sequelize');
// var CryptoJS = require("crypto-js");


// const { v4: uuidv4 } = require('uuid');
// const sha512 = require('crypto-js/sha512');
// const pbkdf2 = require('crypto-js/pbkdf2');
// https://www.npmjs.com/package/crypto-js
// const UserSecret = 'Uas!sdsa4fa';

module.exports = (sequelize, DataTypes) => {
    class API_Users extends Model {

        static models() {
            return this.sequelize.models;
        }

        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            API_Users.belongsToMany(models.API_Guilds, {
                through: {
                    model: models.API_GuildUserPermissions,
                    unique: false,
                },
                foreignKey: 'userId',
            });

            API_Users.hasMany(models.API_Tokens, {
                foreignKey: 'userId', // FK name on TARGET
                sourceKey: 'id', // Key name on SOURCE
                onDelete: 'CASCADE',
            });

            API_Users.hasOne(models.API_DiscordUsers, {
                foreignKey: 'userId', // Set FK name on SOURCE
                targetKey: 'id', // Key name on TARGET
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        }


        /**
         * Add a new user in DB
         * @param {string} externalId 
         * @param {string} username 
         * @param {string} source 
         * @param {string} email 
         * @returns 
         */
        static async addUser(externalId, username, source, email) {
            return await this.create({
                externalId: externalId,
                username: username,
                source: source,
                email: email,
            })
        }

        /**
         * Add a new Discord user
         * @param {*} userData 
         * @param {*} source 
         * @returns 
         */
        static async addDiscordUser(userData, source) {
            return await this.create({
                externalId: userData.id,
                username: userData.username,
                source: source,
                email: userData.email,
                API_DiscordUser: {
                    discriminator: userData.discriminator,
                    avatar: (userData?.avatar || null),
                    banner: (userData?.banner || null),
                    bannerColor: (userData?.banner_color || null),
                    accentColor: (userData?.accent_color || null),
                }
            }, {
                include: [API_Users.sequelize.models.API_DiscordUsers]
            })
        }

        /**
         * Return a api user by id
         * @param {integer} id
         * @returns {API_Users}
         */
        static async findUserById(id, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { id: id }, include: [this.models().API_DiscordUsers] });
            } else {
                return await this.findOne({ where: { id: id } });
            }
        }

        /**
         * Return a api user by external id
         * @param {string} externalId external user id
         * @returns {API_Users}
         */
        static async findUserByExternalId(externalId, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { externalId: externalId }, include: [this.models().API_DiscordUsers] });
            } else {
                return await this.findOne({ where: { externalId: externalId } });
            }
        }

        /**
         * Return a api user
         * @param {string} username
         * @param {string} email
         * @param {integer} source
         * @param {boolean} withInclude
         * @returns {APIUsers}
         */
        static async getApiUserByUserInfo(username, email, source, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { username: username, email: email, source: source }, include: [this.models().API_Tokens, this.models().API_DiscordUsers] });
            } else {
                return await this.findOne({ where: { username: username, email: email, source: source } });
            }
        }

        /**
         * Return a api user by a payload information
         * @param {*} payload
         * @returns {APIUsers}
         */
        static async getUserByPayload(payload) {
            return await this.findOne({ where: { id: payload.userid, username: payload.username, email: payload.email }, include: [this.models().API_DiscordUsers] });
        }

        /**
         * Update API User
         * @todo a tester
         * @param {string} newUsername
         * @param {string} newAvatar
         */
        async updateUserInfo(newUsername, persistChange = true) {
            if (newUsername !== this.username) {
                this.set({
                    username: newUsername,
                });
            }

            if (persistChange && this.changed() && this.changed.length > 0) {
                await this.save();
            }
        }


        async updateDiscordUserInfo(discordUserData) {
            if (discordUserData.avatar !== this.avatar) {
                this.avatar = discordUserData.avatar;
                // this.API_DiscordUser.set({
                //     avatar: discordUserData.avatar,
                // });
            }
            if (discordUserData.banner !== this.banner) {
                this.banner = discordUserData.banner;
                // this.API_DiscordUser.set({
                //     banner:  discordUserData.banner,
                // });
            }
            if (discordUserData.banner_color !== this.bannerColor) {
                this.bannerColor = discordUserData.banner_color;
                // this.API_DiscordUser.set({
                //     bannerColor:  discordUserData.banner_color,
                // });
            }
            if (discordUserData.accent_color !== this.accentColor) {
                this.accentColor = discordUserData.accent_color;
                // this.API_DiscordUser.set({
                //     accentColor:  discordUserData.accent_color,
                // });
            }

            if (this.changed() && this.changed.length > 0) {
                await this.save();
            }
        }
    }

    API_Users.init({
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            unique: true,
        },
        externalId: {
            type: DataTypes.STRING(80),
            allowNull: false,
            unique: true,
        },
        source: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        joinedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        // Virtual
        avatar: {
            type: DataTypes.VIRTUAL,
            get() {
                return (this.API_DiscordUser !== null ? this.API_DiscordUser?.avatar : null);
            },
            set(newAvatar) {
                this.API_DiscordUser?.set({
                    avatar: newAvatar,
                });
            }
        },
        banner: {
            type: DataTypes.VIRTUAL,
            get() {
                return (this.API_DiscordUser !== null ? this.API_DiscordUser?.banner : null);
            },
            set(newBanner) {
                this.API_DiscordUser?.set({
                    banner: newBanner,
                });
            }
        },
        bannerColor: {
            type: DataTypes.VIRTUAL,
            get() {
                return (this.API_DiscordUser !== null ? this.API_DiscordUser?.bannerColor : null);
            },
            set(newColor) {
                this.API_DiscordUser?.set({
                    bannerColor: newColor,
                });
            }
        },
        accentColor: {
            type: DataTypes.VIRTUAL,
            get() {
                return (this.API_DiscordUser !== null ? this.API_DiscordUser?.accentColor : null);
            },
            set(newColor) {
                this.API_DiscordUser?.set({
                    accentColor: newColor,
                });
            }
        },
        discriminator: {
            type: DataTypes.VIRTUAL,
            get() {
                return (this.API_DiscordUser !== null ? this.API_DiscordUser.discriminator : null);
            },
        }
    }, {
        sequelize,
        modelName: 'API_Users',
        tableName: 'API_Users',
        indexes: [
            {
                name: 'PK_api_users_id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
            {
                name: 'UQ_api_users_externalId',
                unique: true,
                fields: [
                    { name: 'externalId' },
                ],
            },
        ],
    });

    return API_Users;
};