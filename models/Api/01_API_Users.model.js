'use strict';
const { Model } = require('sequelize');
var CryptoJS = require("crypto-js");
// const sha512 = require('crypto-js/sha512');
// const pbkdf2 = require('crypto-js/pbkdf2');
//https://www.npmjs.com/package/crypto-js
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
        }

        validatePassword(password) {
            var decodedPasswd = CryptoJS.TripleDES.decrypt(this.password, this.salt);
            if (password === CryptoJS.enc.Utf8.stringify(decodedPasswd)) {
                return true;
            } else {
                return false;
            }
        }
    }

    APIUsers.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        salt: {
            type: DataTypes.STRING,
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
        hooks: {
            beforeValidate: (user, options) => {
                console.log('before validate')
            },
            beforeCreate: (user, options) => {
                console.log('before Create')
                user.salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
                user.password = CryptoJS.TripleDES.encrypt(user.password, user.salt);
            },
            // https://javascript.hotexamples.com/fr/examples/crypto-js/-/PBKDF2/javascript-pbkdf2-function-examples.html
            // https://cryptojs.gitbook.io/docs/
            // https://www.npmjs.com/package/crypto-js
        }
    });

    return APIUsers;
};