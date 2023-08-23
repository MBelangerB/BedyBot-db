const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_GuildOptionsController {

        /**
         * Initialize a GuildOption
         * @param {BIGINT} guildId
         * @returns
         */
        static initOptionForGuildId = async (guildId) => {
            return await context.models.BOT_GuildOptions.create({
                guildId: guildId,
                maxPlayerPerLobby: 12,
            });
        };

        /**
         * Update GuildOption
         * @param {*} guildId
         * @param {*} announcementChannelId
         * @param {*} maxPlayerPerLobby
         * @param {*} addEveryone
         * @returns
         */
        static updateGuildOption = async (guildId, announcementChannelId = null, maxPlayerPerLobby = null, addEveryone = null) => {
            const aGuildOption = await this.getGuildOptionByGuildId(guildId);
            if (!aGuildOption) {
                throw new InvalidEntityException(guildId, 'BOT_GuildOptions', 'Guild options doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK)

            } else {
                if (announcementChannelId != null && aGuildOption.announcementChannelId != announcementChannelId) {
                    aGuildOption.set({
                        announcementChannelId: announcementChannelId,
                    });
                }

                if (maxPlayerPerLobby != null && aGuildOption.maxPlayerPerLobby != maxPlayerPerLobby) {
                    aGuildOption.set({
                        maxPlayerPerLobby: maxPlayerPerLobby,
                    });
                }
                if (addEveryone != null && aGuildOption.addEveryone != addEveryone) {
                    aGuildOption.set({
                        addEveryone: addEveryone,
                    });
                }

                // TODO: If no changed, what we do ?
                if (aGuildOption.changed() && aGuildOption.changed.length > 0) {
                    return await aGuildOption.save();
                }
            }
        };

        /**
         * Get BOT_GuildOptions by id
         * @param {BIGINT} id
         * @param {Boolean} withInclude
         * @returns
         */
        static getGuildOptionByGuildId = async (guildId, withInclude = true) => {
            if (withInclude) {
                return await context.models.BOT_GuildOptions.findOne({ where: { guildId: guildId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_GuildOptions.findOne({ where: { guildId: guildId } });
            }
        };

    } // End class

    return BOT_GuildOptionsController;
}; // End export