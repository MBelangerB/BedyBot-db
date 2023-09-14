const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_GuildUsersController {

        /**
         * Initialize a initGuildUser
         * @param {BIGINT} guildId (mandatory)
         * @param {BIGINT} userId  (mandatory)
         * @param {*} nickname
         * @param {*} avatar
         * @returns
         */
        static async initializeGuildUser(guildId, userId, nickname = null, avatar = null) {
            return await context.models.BOT_GuildUser.create({
                guildId: guildId,
                userId: userId,
                nickname: nickname,
                avatar: avatar,
            });
        };

        /**
         * Get a GuildUser (by UserId,GuildId)
         * @param {*} guildId
         * @param {*} userId
         * @param {*} includeGuild
         * @param {*} includeUsers
         * @returns
         */
        static async getGuildUserByUserId(guildId, userId, includeGuild = false, includeUsers = false) {
            const includeList = [];
            if (includeGuild) {
                includeList.push(context.models.BOT_Guilds);
            }
            if (includeUsers) {
                includeList.push(context.models.BOT_Users);
            }

            return await context.models.BOT_GuildUser.findOne({ where: { guildId: guildId, userId: userId }, include: includeList });
        };

        /**
         * Update the guildUser info
         * @param {*} guildId
         * @param {*} userId
         * @param {*} nickname
         * @param {*} avatar
         * @returns
         */
        static async updateGuildUser(guildId, userId, nickname = null, avatar = null) {
            const aGuildUser = await this.getGuildUserByUserId(guildId, userId);
            if (!aGuildUser) {
                throw new InvalidEntityException([guildId, userId], 'BOT_GuildUsers', 'Guild user doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (nickname != null && aGuildUser.nickname != nickname) {
                    aGuildUser.set({
                        nickname: nickname,
                    });
                }

                if (avatar != null && aGuildUser.avatar != avatar) {
                    aGuildUser.set({
                        avatar: avatar,
                    });
                }

                if (aGuildUser.changed() && aGuildUser.changed.length > 0) {
                    return await aGuildUser.save();
                }

                return aGuildUser;
            }
        };

        /**
         * Change the guid user presence.
         * @param {*} guildId
         * @param {*} userId
         * @param {*} hasLeft If true, a UserId has left the server
         * @returns {BOT_GuildUser}
         */
        static async updateGuildUserStatut(guildId, userId, hasLeft) {
            const aGuildUser = await this.getGuildUserByUserId(guildId, userId);
            if (!aGuildUser) {
                throw new InvalidEntityException([guildId, userId], 'BOT_GuildUsers', 'Guild user doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (hasLeft == false) {
                    // GuildUser comeback
                    aGuildUser.set({
                        joinedAt: Date.now(),
                        leftAt: null,
                    });
                    return await aGuildUser.save();

                } else if (hasLeft == true) {
                    // Guild is left
                    aGuildUser.set({
                        leftAt: Date.now(),
                    });
                    return await aGuildUser.save();
                }
            }
        };

    } // End class

    return BOT_GuildUsersController;
}; // End export
