const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_GuildsController {

        /**
         * Get BOT_Guilds by guildId
         * @param {BigInt} guildId A Discord guildId
         * @param {context.models[]} includeModels Array of Sequelize models
         * @returns {context.models.BOT_Guilds}
         */
        static async getGuildByGuildId(guildId, includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findOne({ where: { guildId: guildId }, include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findOne({ where: { guildId: guildId } });
            }
        };

        /**
         * Return all active guilds
         * @param {context.models[]} includeModels Array of Sequelize models
         * @returns {context.models.BOT_Guilds[]}
         */
        static async getAllActiveGuilds(includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findAll({ where: { isActive: true }, include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findAll({ where: { isActive: true } });
            }
        };

        /**
         * Return all guilds
         * @param {context.models[]} includeModels Array of Sequelize models
         * @returns {BOT_Guilds[]}
         */
        static async getAllGuilds(includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findAll({ include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findAll();
            }
        };

        /**
         * Add a new discord guild on DB
         * @param {BigInt} guildId (mandatory)
         * @param {String} guildName (mandatory)
         * @param {BigInt} ownerId (mandatory)
         * @param {string|null} region
         * @param {string|null} preferredLocal
         * @param {string|null} iconUrl
         * @param {string|null} bannerUrl
         * @param {boolean} isActive
         * @param {boolean} initOption
         * @returns
         */
        static async createGuild(guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null, isActive = true, initOption = false) {
            const aGuild = await context.models.BOT_Guilds.create({
                guildId: guildId,
                guildName: guildName,
                guildIconUrl: iconUrl,
                guildBannerUrl: bannerUrl,
                guildOwnerId: ownerId,
                guildRegion: region,
                guildPreferredLocale: preferredLocal,
                isActive: isActive,
            });

            if (initOption && initOption === true) {
                await context.models.BOT_GuildOptions.create({
                    guildId: guildId,
                    maxPlayerPerLobby: 12,
                    addEveryone: false,
                    CRONConfiguration: null,
                });
            }

            return aGuild;
        };

        /**
         * Update a new discord guild on DB
         * @param {*} guildId
         * @param {*} guildName
         * @param {*} ownerId
         * @param {*} region
         * @param {*} preferredLocal
         * @param {*} iconUrl
         * @param {*} bannerUrl
         * @returns
         */
        static async updateGuild(guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null) {
            const aGuild = await this.getGuildByGuildId(guildId);
            if (!aGuild) {
                throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (guildName != null && aGuild.guildName !== guildName) {
                    aGuild.set({
                        guildName: guildName,
                    });
                }
                if (ownerId != null && aGuild.guildOwnerId !== ownerId) {
                    aGuild.set({
                        guildOwnerId: ownerId,
                    });
                }

                if (region != null && aGuild.guildRegion !== region) {
                    aGuild.set({
                        guildRegion: region,
                    });
                }

                if (preferredLocal != null && aGuild.guildPreferredLocale !== preferredLocal) {
                    aGuild.set({
                        guildPreferredLocale: preferredLocal,
                    });
                }

                if (iconUrl != null && aGuild.guildIconUrl !== iconUrl) {
                    aGuild.set({
                        guildIconUrl: iconUrl,
                    });
                }
                if (bannerUrl != null && aGuild.guildBannerUrl !== bannerUrl) {
                    aGuild.set({
                        guildBannerUrl: bannerUrl,
                    });
                }

                // TODO: If no changed, what we do ?
                if (aGuild.changed() && aGuild.changed.length > 0) {
                    return await aGuild.save();
                }

                return aGuild;
            }
        };

        /**
         * Update the guildName
         * @param {*} aGuild
         * @param {*} newGuildName
         * @returns
         */
        static async updateGuildName(aGuild, newGuildName) {
            if (!aGuild) {
                throw new InvalidEntityException(null, 'BOT_Guilds', 'Guild isn\'t defined.', InvalidEntityException.ErrorType.NULL_ENTITY);
            }
            if (typeof aGuild === 'bigint') {
                throw new InvalidEntityException(aGuild, 'BOT_Guilds', 'Guild parameters isn\'t valid.', InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT);
            }

            if (newGuildName != null && aGuild.guildName !== newGuildName) {
                aGuild.set({
                    guildName: newGuildName,
                });
            }

            if (aGuild.changed() && aGuild.changed.length > 0) {
                return await aGuild.save();
            }

            return aGuild;
        };

        /**
         * Update guild owner
         * @param {*} aGuild
         * @param {*} newOwnerId
         * @returns
         */
        static async updateGuildOwner(aGuild, newOwnerId) {
            if (!aGuild) {
                throw new InvalidEntityException(null, 'BOT_Guilds', 'Guild isn\'t defined.', InvalidEntityException.ErrorType.NULL_ENTITY);
            }
            if (typeof aGuild === 'bigint') {
                throw new InvalidEntityException(aGuild, 'BOT_Guilds', 'Guild parameters isn\'t valid.', InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT);
            }

            if (newOwnerId != null && aGuild.guildOwnerId !== newOwnerId) {
                aGuild.set({
                    guildOwnerId: newOwnerId,
                });
            }

            if (aGuild.changed() && aGuild.changed.length > 0) {
                return await aGuild.save();
            }

            return aGuild;
        };

        /**
         * Update the guild statut and date param.
         * @param {BigInt} guildId
         * @param {boolean} isActive new guild statut
         * @returns {BOT_Guilds}
         */
        static async updateGuildStatut(guildId, isActive) {
            let aGuild = await this.getGuildByGuildId(guildId);

            /* istanbul ignore else */
            if (!aGuild) {
                throw new InvalidEntityException(null, 'BOT_Guilds', 'Guild isn\'t defined.', InvalidEntityException.ErrorType.NULL_ENTITY);
            }
            // if (typeof aGuild === "bigint") {
            //     throw new InvalidEntityException(aGuild, 'BOT_Guilds', 'Guild parameters isn\'t valid.', InvalidEntityException.ErrorType.INVALID_PARAM_BIGINT);
            // }

            /* istanbul ignore else */
            if (isActive === true) {
                // Guild is comeback
                aGuild.set({
                    isActive: isActive,
                    joinedAt: Date.now(),
                    leftAt: null,
                });
                aGuild = await aGuild.save();

            /* istanbul ignore else */
            } else if (isActive === false) {
                // Guild is left
                aGuild.set({
                    isActive: isActive,
                    leftAt: Date.now(),
                });
                aGuild = await aGuild.save();
            }

            console.log(`Guild status and date for **${aGuild.guildId}** has been updated.`);
            return aGuild;
        };

        /**
         * Delete a guild
         * @param {*} guildId
         */
        static async deleteGuild(guildId) {
            const aGuild = await this.getGuildByGuildId(guildId);
            if (!aGuild) {
                throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            await aGuild.destroy();
        };

    } // End class

    return BOT_GuildsController;
}; // End export