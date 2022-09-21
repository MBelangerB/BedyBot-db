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
                foreignKey: 'guildId',
            });

            API_Users.hasMany(models.API_Tokens, {
                foreignKey: 'guildId', // FK name on TARGET
                sourceKey: 'id', // Key name on SOURCE
                onDelete: 'CASCADE',
            });
        }


        /**
         * Add a new user in DB
         * @param {string} externalId 
         * @param {string} username 
         * @param {string} avatar 
         * @param {string} source 
         * @param {string} discriminator 
         * @param {string} email 
         * @returns 
         */
        static async addUser(externalId, username, avatar, source, discriminator, email) {
            return await this.create({
                externalId: externalId,
                username: username,
                avatar: avatar,
                source: source,
                discriminator: discriminator,
                email: email
            });
        }

        /**
         * Return a api user by id
         * @param {integer} id
         * @returns {API_Users}
         */
        static async findUserById(id) {
            return await this.findOne({ where: { id: id } });
        }
        
        /**
         * Return a api user by external id
         * @param {string} externalId external user id
         * @returns {API_Users}
         */
        static async findUserByExternalId(externalId) {
            return await this.findOne({ where: { externalId: externalId } });
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
                return await this.findOne({ where: { username: username, email: email, source: source }, include: [this.models().API_Tokens] });
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
            return await this.findOne({ where: { id: payload.userid, username: payload.username, email: payload.email } });
        }

        /**
         * Update API User
         * @todo a tester
         * @param {string} newUsername
         * @param {string} newAvatar
         */
        async updateUserInfo(newUsername, newAvatar) {
            if (newUsername !== this.username) {
                this.set({
                    username: newUsername,
                });
            }
            if (newAvatar !== this.avatar) {
                this.set({
                    avatar: newAvatar,
                });
            }

            if (this.changed() && this.changed.length > 0) {
                await this.save();
            }
        }

        // validatePassword(password) {
        //     var decodedPasswd = CryptoJS.TripleDES.decrypt(this.password, this.salt);
        //     if (password === CryptoJS.enc.Utf8.stringify(decodedPasswd)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
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
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        discriminator: {
            type: DataTypes.STRING(10),
            allowNull: true,
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
        // hooks: {
        //     beforeValidate: (user, options) => {
        //         console.log('before validate')
        //     },
        //     beforeCreate: (user, options) => {
        //         console.log('before Create')
        //         user.salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
        //         user.password = CryptoJS.TripleDES.encrypt(user.password, user.salt);
        //     },
        //     // https://javascript.hotexamples.com/fr/examples/crypto-js/-/PBKDF2/javascript-pbkdf2-function-examples.html
        //     // https://cryptojs.gitbook.io/docs/
        //     // https://www.npmjs.com/package/crypto-js
        // }
    });

    return API_Users;
};