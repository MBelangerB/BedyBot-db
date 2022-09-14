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
            models.BOT_Users.belongsToMany(models.BOT_Sessions, {
                through: {
                    model: models.BOT_UserSessions,
                    unique: false,
                },
                foreignKey: 'UserId',
            });
        }

        getUsername() {
            return (this.BOT_GuildUser && this.BOT_GuildUser.hasUsername() ? this.BOT_GuildUser.username : this.defaultUsername);
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

    BOT_Users.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING,
            field: 'userId',
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