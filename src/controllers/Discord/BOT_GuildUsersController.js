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
        static initGuildUser = async (guildId, userId, nickname = null, avatar = null) => {
            return await context.models.BOT_GuildUser.create({
                guildId: guildId,
                userId: userId,
                nickname: nickname,
                avatar: avatar,
            });
        };

        static getGuildUserByUserId = async (guildId, userId, includeGuild = false, includeUsers = false) => {
            const includeList = [];
            if (includeGuild) {
                includeList.push(context.models.BOT_Guilds);
            }
            if (includeUsers) {
                includeList.push(context.models.BOT_Users);
                // include.push({
                //     model: BOT_GuildUser.getModels().BOT_Users,
                //     include: [
                //         {
                //           model: BOT_UserDetails
                //         }
                //       ]
                // });
            }

            return await context.models.BOT_GuildUser.findAll({ where: { guildId: guildId, userId: userId }, include: includeList });
        };

        /**
         * Update the guildUser info
         * @param {*} guildId
         * @param {*} userId
         * @param {*} nickname
         * @param {*} avatar
         * @returns
         */
        static updateGuildUser = async (guildId, userId, nickname = null, avatar = null) => {
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
            }
        };

        /**
         * Change the guid user presence.
         * @param {*} guildId
         * @param {*} userId
         * @param {*} hasLeft If true, a UserId has left the server
         * @returns {BOT_GuildUser}
         */
        static updateGuildUserStatut = async (guildId, userId, hasLeft) => {
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
                        aGuildUser: Date.now(),
                    });
                    return await aGuildUser.save();
                }
                console.verbose(`GuildUser state change, hasLeft : ${hasLeft} for **(${guildId}, ${userId})**.`);
            }
        };

    } // End class

    return BOT_GuildUsersController;
}; // End export
