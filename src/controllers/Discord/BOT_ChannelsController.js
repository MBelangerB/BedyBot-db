const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_ChannelsController {

        /**
         * Create a new guild Channel
         * @param {BigInt} guildId
         * @param {BigInt} channelId
         * @param {string} channelName
         * @param {BedyAPIConst.DiscordChannelTypes} channelType
         * @param {BigInt} parentId
         * @param {string} channelTopic
         * @param {*} permission
         * @returns
         */
        static async createGuildChannel(guildId, channelId, channelName, channelType, parentId = null, channelTopic = null, permission = null) {
            return await context.models.BOT_Channels.create({
                guildId: guildId,
                channelId: channelId,
                channelName: channelName,
                channelType: channelType,
                parentId: parentId,
                channelTopic: channelTopic,
                permission: permission,
            });
        };

        /**
         * Get discord Channel by ChannelId
         * TOOD: Include models
         * @param {BigInt} channelId
         * @returns
         */
        static async getChannelById(channelId) {
            return await context.models.BOT_Channels.findOne({ where: { channelId: channelId } });
        };

        /**
         * Update discord channel
         * @param {BigInt} channelId
         * @param {string} channelName
         * @param {BedyAPIConst.DiscordChannelTypes} channelType
         * @param {BigInt} parentId
         * @param {string} channelTopic
         * @param {*} permission
         * @returns
         */
        static async updateChannel(channelId, channelName, channelType, parentId = null, channelTopic = null, permission = null) {
            const aChannel = await this.getChannelById(channelId);
            if (!aChannel) {
                throw new InvalidEntityException(channelId, 'BOT_Channels', 'Channel doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (aChannel.channelName != channelName) {
                    aChannel.set({
                        channelName: channelName,
                    });
                }
                if (aChannel.channelType != channelType) {
                    aChannel.set({
                        channelType: channelType,
                    });
                }
                if (aChannel.parentId != parentId) {
                    aChannel.set({
                        parentId: parentId,
                    });
                }
                if (aChannel.channelTopic != channelTopic) {
                    aChannel.set({
                        channelTopic: channelTopic,
                    });
                }
                if (aChannel.permission != permission) {
                    aChannel.set({
                        permission: permission,
                    });
                }

                if (aChannel.changed() && aChannel.changed.length > 0) {
                    return await aChannel.save();
                }

                return aChannel;
            }
        };

        /**
         * Delete a discord channel
         * @param {BigInt} channelId
         */
        static async deleteChannel(channelId) {
            const aChannel = await this.getChannelById(channelId);
            if (!aChannel) {
                throw new InvalidEntityException(channelId, 'BOT_Channels', 'Channel doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                await aChannel.destroy();
            }
        };

    } // End class

    return BOT_ChannelsController;
}; // End export
