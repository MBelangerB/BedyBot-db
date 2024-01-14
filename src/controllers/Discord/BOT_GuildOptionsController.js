const InvalidEntityException = require('../../declarations/InvalidEntityException');
const InvalidCRONException = require('../../declarations/InvalidCRONException');
const cronValidate = require('cron-validate');

module.exports = (sequelize, context) => {
    class BOT_GuildOptionsController {

        /**
         * Initialize a GuildOption
         * @param {BIGINT} guildId
         * @returns
         */
        static async initOptionForGuildId(guildId) {
            return await context.models.BOT_GuildOptions.create({
                guildId: guildId,
                maxPlayerPerLobby: 12,
                addEveryone: false,
                CRONConfiguration: null,
            });
        }

        /**
         * Update GuildOption
         * @param {Bigint} guildId
         * @param {Bigint} announcementChannelId
         * @param {integer} maxPlayerPerLobby
         * @param {boolean} addEveryone
         * @param {string} CRONConfiguration
         * @returns
         */
        static async updateGuildOption(guildId, announcementChannelId = null, maxPlayerPerLobby = null, addEveryone = null, CRONConfiguration = null) {
            const aGuildOption = await this.getGuildOptionByGuildId(guildId);
            if (!aGuildOption) {
                throw new InvalidEntityException(guildId, 'BOT_GuildOptions', 'Guild options doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

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
                if (CRONConfiguration != null && aGuildOption.CRONConfiguration != CRONConfiguration) {
                    const isValid = cronValidate(CRONConfiguration).isValid();
                    if (!isValid) {
                        throw new InvalidCRONException(CRONConfiguration, 'Invalid CRON configuration');
                    }
                    aGuildOption.set({
                        CRONConfiguration: CRONConfiguration,
                    });
                }

                // TODO: If no changed, what we do ?
                if (aGuildOption.changed() && aGuildOption.changed.length > 0) {
                    return await aGuildOption.save();
                }

                return aGuildOption;
            }
        }

        /**
         * Get BOT_GuildOptions by id
         * @param {BIGINT} id
         * @param {Boolean} withInclude
         * @returns
         */
        static async getGuildOptionByGuildId(guildId, withInclude = true) {
            if (withInclude) {
                return await context.models.BOT_GuildOptions.findOne({ where: { guildId: guildId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_GuildOptions.findOne({ where: { guildId: guildId } });
            }
        }

    } // End class

    return BOT_GuildOptionsController;
}; // End export
