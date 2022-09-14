'use strict';
const { Model } = require('sequelize');

/*
        Ship.belongsTo(Captain, { targetKey: 'name', foreignKey: 'captainName' });
        // This creates a foreign key called `captainName` in the source model (Ship)
        // which references the `name` field from the target model (Captain).
*/
module.exports = (sequelize, DataTypes) => {
    class BOT_Guilds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.BOT_Guilds.hasOne(models.BOT_GuildOptions, {
                foreignKey: 'guildId', // Set FK name
                sourceKey: 'guildId', // Source Key In BOT_Guilds
                onDelete: 'CASCADE',
            });
        }

        static models() {
            return this.sequelize.models;
        }

        /**
         * Get BOT_Guilds by id
         * @param {integer} id
         * @param {boolean} withInclude
         * @returns {BOT_Guilds}
         */
        static async getGuildById(id, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { id: id }, include: [this.models().BOT_GuildOptions] });
            } else {
                return await this.findOne({ where: { id: id } });
            }
        }

        /**
         * Get BOT_Guilds by discord guildId
         * @param {string} guildId
         * @param {boolean} withInclude
         * @returns {BOT_Guilds}
         */
        static async getGuildByGuildId(guildId, withInclude = true) {
            if (withInclude) {
                return await this.findOne({ where: { guildId: guildId }, include: [this.models().BOT_GuildOptions] });
            } else {
                return await this.findOne({ where: { guildId: guildId } });
            }
        }

        /**
         * Return all active guilds
         * @param {boolean} withInclude
         * @returns {BOT_Guilds}
         */
        static async getAllActiveGuild(withInclude = true) {
            if (withInclude) {
                return await this.findAll({ where: { isActive: true }, include: [this.models().BOT_GuildOptions] });
            } else {
                return await this.findAll({ where: { isActive: true } });
            }
        }

        /**
         * Return the guild option by a guildId
         * @param {integer} guildId
         * @returns {BOT_GuildOptions}
         */
        static async getGuildOptionByGuildId(guildId) {
            return await this.getGuildByGuildId(guildId, true)?.BOT_GuildOptions;
        }

        /**
         * Update the guild statut and date param
         * @param {boolean} isActive new guild Statut
         * @returns {BOT_Guilds}
         */
        async updateGuildStatut(isActive) {
            if (isActive) {
                // Guild is comeback
                this.set({
                    isActive: isActive,
                    joinedAt: Date.now(),
                    leftAt: null,
                });
                return await this.save();

            } else if (!isActive) {
                // Guild is left
                this.set({
                    isActive: isActive,
                    leftAt: Date.now(),
                });
                return await this.save();
            }
        }

        /**
         * Update the guild name
         * @param {*} newName
         */
        async updateGuildName(newName) {
            // On update pour raison X
            this.set({
                guildName: newName,
            });
            await this.save();
        }

        /**
         * Update the guild owner id
         * @param {*} ownerId
         */
        async updateGuildOwner(ownerId) {
            // On update pour raison X
            this.set({
                guildOwnerId: ownerId,
            });
            await this.save();
        }
    }

    BOT_Guilds.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        guildId: {
            type: DataTypes.STRING,
            // field: 'guildId',
            allowNull: false,
        },
        guildName: {
            type: DataTypes.STRING,
            field: 'guildName',
            allowNull: false,
        },
        guildIconUrl: {
            type: DataTypes.STRING,
            field: 'guildIconUrl',
            allowNull: true,
        },
        guildOwnerId: {
            type: DataTypes.STRING,
            field: 'guildOwnerId',
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            field: 'isActive',
            allowNull: false,
            defaultValue: true,
        },
        joinedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        leftAt: {
            type: DataTypes.DATE,
            field: 'leftAt',
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: 'BOT_Guilds',
        tableName: 'BOT_Guilds',
    });
    return BOT_Guilds;
};