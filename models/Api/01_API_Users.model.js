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
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.API_Users.hasOne(models.API_Tokens, {
                foreignKey: 'userId',
                onDelete: 'CASCADE',
            });

            models.API_Users.belongsToMany(models.API_Guilds, {
                through: {
                    model: models.API_GuildUserPermissions,
                    unique: false,
                },
                foreignKey: 'guildId',
            });
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
            type: DataTypes.STRING,
            primaryKey: true,
        },
        source: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        discriminator: {
            type: DataTypes.STRING(4),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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