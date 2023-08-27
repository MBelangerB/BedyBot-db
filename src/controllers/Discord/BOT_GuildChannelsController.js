const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_GuildChannelsController {

        /**
         * Create a new guild Channel
         * @param {*} guildId
         * @param {*} channelId
         * @param {*} channelName
         * @param {*} channelType
         * @param {*} parentId
         * @param {*} channelTopic
         * @param {*} permission
         * @returns
         */
        static createGuildChannel = async (guildId, channelId, channelName, channelType, parentId = null, channelTopic = null, permission = null) => {
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
         * @param {*} channelId
         * @returns
         */
        static getChannelById = async (channelId) => {
            return await context.models.BOT_Channels.findOne({ where: { channelId: channelId } });
        };

        /**
         * Update discord channel
         * @param {*} channelId
         * @param {*} channelName
         * @param {*} channelType
         * @param {*} parentId
         * @param {*} channelTopic
         * @param {*} permission
         * @returns
         */
        static updateChannel = async (channelId, channelName, channelType, parentId = null, channelTopic = null, permission = null) => {
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
            }
        };

        /**
         * Delete a discord channel
         * @param {*} channelId
         */
        static deleteChannel = async (channelId) => {
            const aChannel = await this.getChannelById(channelId);
            if (!aChannel) {
                throw new Error(`Channel ${channelId} doesn't exist.`);

            } else {
                await aChannel.destroy();
            }
        };

    } // End class

    return BOT_GuildChannelsController;
}; // End export
