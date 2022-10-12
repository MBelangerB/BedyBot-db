'use strict';
const { Model } = require('sequelize');
// var CryptoJS = require("crypto-js");


// const { v4: uuidv4 } = require('uuid');
// const sha512 = require('crypto-js/sha512');
// const pbkdf2 = require('crypto-js/pbkdf2');
// https://www.npmjs.com/package/crypto-js
// const UserSecret = 'Uas!sdsa4fa';

module.exports = (sequelize, DataTypes) => {
    class API_DiscordUsers extends Model {

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
            API_DiscordUsers.belongsTo(models.API_Users, {
                foreignKey: 'userId', // Set FK name on SOURCE
                sourceKey: 'id', // Source Key In TARGET
                onDelete: 'CASCADE',
            });

        }

        /**
         * Return a api user by id
         * @param {integer} id
         * @returns {API_DiscordUsers}
         */
        static async findDiscordUserById(id) {
            return await this.findOne({ where: { id: id } });
        }

        /**
         * Get a Discord user by UserId
         * @param {*} userId 
         *  @returns {API_DiscordUsers}
         */
        static async findDiscordUserByUserId(userId) {
            return await this.findOne({ where: { userId: userId } });
        }
    }

    API_DiscordUsers.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId',
            allowNull: false,
            // references: {
            //     model: 'API_Users',
            //     key: 'id',
            //     onDelete: 'CASCADE',
            //     onUpdate: 'CASCADE',
            // },
        },
        // 1 => Discord - 2 => Twitch
        discriminator: {
            type: DataTypes.STRING(10),
            field: 'discriminator',
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
        bannerColor: {
            type: DataTypes.STRING,
            field: 'bannerColor',
            allowNull: true,
        },
        accentColor: {
            type: DataTypes.INTEGER,
            field: 'accentColor',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'API_DiscordUsers',
        tableName: 'API_DiscordUsers',
        indexes: [
            {
                name: 'PK_api_discordUser_id',
                unique: true,
                fields: [
                    { name: 'id' },
                ],
            },
            {
                name: 'UQ_api_discordUser_externalId',
                unique: true,
                fields: [
                    { name: 'userId' },
                ],
            },
        ],
    });

    return API_DiscordUsers;
};