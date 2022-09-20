'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class BOT_Guilds extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            BOT_Guilds.hasOne(models.BOT_GuildOptions, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.BOT_GuildUsers, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.BOT_Roles, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

            BOT_Guilds.hasMany(models.BOT_Tournaments, {
                foreignKey: 'guildId', // Set FK name on TARGET
                sourceKey: 'id', // Source Key In SOURCE
                onDelete: 'CASCADE',
            });

        }

        static models() {
            return this.sequelize.models;
        }


        /**
         * Add a new discord guild on DB
         * @param {*} discordGuildId
         * @param {*} discordGuildName
         * @param {*} discordOwnerId
         * @returns
         */
        static async createGuildOnDB(discordGuildId, discordGuildName, discordOwnerId) {
            return await this.create({
                discordGuildId: discordGuildId,
                discordGuildName: discordGuildName,
                discordGuildOwnerId: discordOwnerId,
                isActive: true,
            });
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
                return await this.findOne({ where: { discordGuildId: guildId }, include: [this.models().BOT_GuildOptions] });
            } else {
                return await this.findOne({ where: { discordGuildId: guildId } });
            }
        }

        /**
         * Return all active guilds
         * @param {boolean} withInclude
         * @returns {BOT_Guilds}
         */
        static async getAllActiveGuilds(withInclude = true) {
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
            const guild = await this.getGuildByGuildId(guildId, true);
            return guild?.BOT_GuildOption;
        }

        /**
         * Update the guild statut and date param
         * @param {boolean} isActive new guild Statut
         * @returns {BOT_Guilds}
         */
        async updateGuildStatut(isActive) {
            if (this.isActive !== isActive) {
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
                console.verbose(`Guild status and date for **${this.id}** has been updated.`);
            }
        }

        /**
         * Update the guild name
         * @param {string} newName
         */
        async updateGuildName(newName) {
            if (this.discordGuildName !== newName) {
                this.set({
                    discordGuildName: newName,
                });
                await this.save();
                console.verbose(`Guild name for **${this.id}** has been updated.`);
            }
        }

        /**
         * Update the guild owner id
         * @param {string} ownerId
         */
        async updateGuildOwner(ownerId) {
            if (this.discordGuildOwnerId !== ownerId) {
                this.set({
                    discordGuildOwnerId: ownerId,
                });
                await this.save();
                console.verbose(`Guild owner for **${this.id}** has been updated.`);
            }
        }
    }

    BOT_Guilds.init({
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
        },
        discordGuildId: {
            type: DataTypes.STRING(80),
            field: 'discordGuildId',
            allowNull: false,
            unique: true,
        },
        discordGuildName: {
            type: DataTypes.STRING(120),
            field: 'discordGuildName',
            allowNull: false,
        },
        discordGuildIconUrl: {
            type: DataTypes.STRING,
            field: 'discordGuildIconUrl',
            allowNull: true,
        },
        discordGuildOwnerId: {
            type: DataTypes.STRING(80),
            field: 'discordGuildOwnerId',
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
        // indexes: [
        //     {
        //         name: "PK_guilds_id",
        //         unique: true,
        //         fields: [ { name: "id" }, ]
        //     },
        //     {
        //         name: "UQ_guilds_discordGuildId",
        //         unique: true,
        //         fields: [ { name: "discordGuildId" }, ]
        //     },
        // ]
    });

    return BOT_Guilds;
};