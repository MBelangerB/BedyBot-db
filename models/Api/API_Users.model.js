'use strict';
const { Model } = require('sequelize');
// var CryptoJS = require("crypto-js");


// const { v4: uuidv4 } = require('uuid');
// const sha512 = require('crypto-js/sha512');
// const pbkdf2 = require('crypto-js/pbkdf2');
// https://www.npmjs.com/package/crypto-js
// const UserSecret = 'Uas!sdsa4fa';

module.exports = (sequelize, DataTypes) => {
    class APIUsers extends Model {

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
            models.API_Users.belongsToMany(models.API_Guilds, {
                through: {
                    model: models.API_GuildUserPermissions,
                    unique: false,
                },
                foreignKey: 'guildId',
            });

            models.API_Users.belongsTo(models.API_Tokens, {
                foreignKey: 'externalId', // Set FK name in current table
                targetKey: 'apiUserId', // Key name on API_Tokens
                onDelete: 'CASCADE',
            });
        }

        /**
         * Return a api user by id
         * @param {integer} id
         * @returns {APIUsers}
         */
        static async getApiUserById(id) {
            return await this.findOne({ where: { id: id } });
        }

        /**
         * Return a api user by external id
         * @param {string} externalId external user id
         * @returns {APIUsers}
         */
        static async getApiUserByExternalId(externalId) {
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

            if (this.changed() && this.changed().length > 0) {
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

    APIUsers.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        externalId: {
            type: DataTypes.STRING,
            field: 'externalId',
            allowNull: false,
            unique: true,
        },
        source: {
            type: DataTypes.INTEGER,
            field: 'source',
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            field: 'avatar',
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            field: 'username',
            allowNull: false,
        },
        discriminator: {
            type: DataTypes.STRING(8),
            field: 'discriminator',
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            field: 'email',
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

    return APIUsers;
};