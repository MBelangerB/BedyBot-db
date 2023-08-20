const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class Bot_GuildsController {

        /**
         * Get BOT_Guilds by guildId
         * @param {BigInt} guildId A Discord guildId
         * @param {Models[]} includeModels Array of Sequelize models
         * @returns {BOT_Guilds}
         */
        static getGuildByGuildId = async (guildId, includeModels = []) => {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findOne({ where: { guildId: guildId }, include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findOne({ where: { guildId: guildId } });
            }
        };

        /**
         * Return all active guilds
         * @param {Models[]} includeModels Array of Sequelize models
         * @returns {BOT_Guilds[]}
         */
        static getAllActiveGuilds = async (includeModels = []) => {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findAll({ where: { isActive: true }, include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findAll({ where: { isActive: true } });
            }
        };

        /**
         * Return all guilds
         * @param {Models[]} includeModels Array of Sequelize models
         * @returns {BOT_Guilds[]}
         */
        static getAllGuilds = async (includeModels = []) => {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Guilds.findAll({ include: includeModels });
            } else {
                return await context.models.BOT_Guilds.findAll();
            }
        };

        /**
         * Add a new discord guild on DB
         * @param {BIGINT} guildId (mandatory)
         * @param {String} guildName (mandatory)
         * @param {*} ownerId (mandatory)
         * @param {*} region
         * @param {*} preferredLocal
         * @param {*} iconUrl
         * @param {*} bannerUrl
         * @returns
         */
        static createGuild = async (guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null) => {
            // TOOD: Devrais-je activé directement le GuildOption ? 
            return await context.models.BOT_Guilds.create({
                guildId: guildId,
                guildName: guildName,
                guildIconUrl: iconUrl,
                guildBannerUrl: bannerUrl,
                guildOwnerId: ownerId,
                guildRegion: region,
                guildPreferredLocale: preferredLocal,
                isActive: true,
            });
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
        static updateGuild = async (guildId, guildName, ownerId, region = null, preferredLocal = null, iconUrl = null, bannerUrl = null) => {
            const aGuild = await this.getGuildByGuildId(guildId);
            if (!aGuild) {
                throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (guildName != null && aGuild.guildName != guildName) {
                    aGuild.set({
                        guildName: guildName,
                    });
                }
                if (ownerId != null && aGuild.guildOwnerId != ownerId) {
                    aGuild.set({
                        guildOwnerId: ownerId,
                    });
                }

                if (region != null && aGuild.guildRegion != region) {
                    aGuild.set({
                        guildRegion: region,
                    });
                }

                if (preferredLocal != null && aGuild.guildPreferredLocale != preferredLocal) {
                    aGuild.set({
                        guildPreferredLocale: preferredLocal,
                    });
                }

                if (iconUrl != null && aGuild.guildIconUrl != iconUrl) {
                    aGuild.set({
                        guildIconUrl: iconUrl,
                    });
                }
                if (bannerUrl != null && aGuild.guildBannerUrl != bannerUrl) {
                    aGuild.set({
                        guildBannerUrl: bannerUrl,
                    });
                }

                // TODO: If no changed, what we do ?
                if (aGuild.changed() && aGuild.changed.length > 0) {
                    return await aGuild.save();
                }
            }
        };

        /**
         * Update the guild statut and date param.
         * @param {boolean} newStatut new guild Statut
         * @returns {BOT_Guilds}
         */
        static updateGuildStatut = async (guildId, isActive) => {
            const aGuild = await this.getGuildByGuildId(guildId);
            if (!aGuild) {
                throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK)

            } else if (aGuild.isActive !== isActive && isActive == true) {
                // Guild is comeback
                aGuild.set({
                    isActive: isActive,
                    joinedAt: Date.now(),
                    leftAt: null,
                });
                return await aGuild.save();

            } else if (aGuild.isActive !== isActive && isActive == false) {
                // Guild is left
                aGuild.set({
                    isActive: isActive,
                    leftAt: Date.now(),
                });
                return await aGuild.save();
            }
            console.verbose(`Guild status and date for **${aGuild.id}** has been updated.`);
        };

        /**
         * Delete a guild
         * @param {*} guildId 
         */
        static deleteGuild = async (guildId) => {
            const aGuild = await this.getGuildByGuildId(guildId);
            if (!aGuild) {
                throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK)
            }

            await aGuild.destroy();
        }

    } // End class

    return Bot_GuildsController;
}; // End export