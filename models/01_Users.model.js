'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Users.belongsToMany(models.Sessions, {
                through: {
                    model: models.UserSessions,
                    unique: false,
                },
                foreignKey: 'UserId',
            });
        }

        getUsername() {
            return this.username;
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
    }

    Users.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: 'id',
        },
        // Id du Discord
        guildId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Id de user Discord
        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        switchFriendCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        switchUsername: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        twitchUsername: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'Users',
        tableName: 'MK_Users',
    });
    return Users;
};