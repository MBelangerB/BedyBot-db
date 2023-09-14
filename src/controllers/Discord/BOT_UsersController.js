const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_UsersController {

        /**
         * Get BOT_Users by userId
         * @param {BigInt} userId
         * @param {boolean} withInclude
         * @returns
         */
        static async getUserByUserId(userId, includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Users.findOne({ where: { userId: userId }, include: includeModels });
            } else {
                return await context.models.BOT_Users.findOne({ where: { userId: userId } });
            }
        };

        /**
         * Get a user including GuildUser
         * @param {BigInt} guildId
         * @param {BigInt} userId
         * @returns
         */
        static async getUserByGuildIdUserId(guildId, userId) {
            return await context.models.BOT_Users.findOne({
                where: { userId: userId },
                include: {
                    model: context.models.BOT_GuildUser,
                    where: {
                        guildId: guildId,
                    },
                    required: false,
                },
            });
        };

        /**
         * Get all BOT_Users
         * @param {boolean} withInclude
         * @returns
         */
        static async getAllUsers(includeModels = []) {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Users.findAll({ include: includeModels });
            } else {
                return await context.models.BOT_Users.findAll();
            }
        };

        /**
         * Create a new discord user
         * @param {BigInt} userId  (mandatory)
         * @param {String} username  (mandatory)
         * @param {string} globalUsername
         * @param {string} discriminator
         * @param {string} email
         * @param {string} avatar
         * @param {string} banner
         * @param {string} accentColor
         * @returns
         */
        static async createNewUser(userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) {
            return await context.models.BOT_Users.create({
                userId: userId,
                username: username,
                globalUsername: globalUsername,
                discriminator: discriminator,
                email: email,
                avatar: avatar,
                banner: banner,
                accentColor: accentColor,
            });
        };

        /**
         * Update DB Role
         * @param {BigInt} userId  (mandatory)
         * @param {string} username  (mandatory)
         * @param {string} globalUsername
         * @param {string} discriminator
         * @param {string} email
         * @param {string} avatar
         * @param {string} banner
         * @param {string} accentColor
         */
        static async updateUser(aUser, userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) {
            if (aUser == null) {
                aUser = await this.getUserByUserId(userId);
            }

            if (!aUser) {
                throw new InvalidEntityException(userId, 'BOT_Users', 'Users doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                /* istanbul ignore else */
                if (username !== aUser.username) {
                    aUser.set({
                        username: username,
                    });
                }

                /* istanbul ignore else */
                if (globalUsername !== aUser.globalUsername) {
                    aUser.set({
                        globalUsername: globalUsername,
                    });
                }

                /* istanbul ignore else */
                if (discriminator !== aUser.discriminator) {
                    aUser.set({
                        discriminator: discriminator,
                    });
                }

                /* istanbul ignore else */
                if (email !== aUser.email) {
                    aUser.set({
                        email: email,
                    });
                }

                /* istanbul ignore else */
                if (avatar !== aUser.avatar) {
                    aUser.set({
                        avatar: avatar,
                    });
                }

                /* istanbul ignore else */
                if (banner !== aUser.banner) {
                    aUser.set({
                        banner: banner,
                    });
                }

                /* istanbul ignore else */
                if (accentColor !== aUser.accentColor) {
                    aUser.set({
                        accentColor: accentColor,
                    });
                }

                /* istanbul ignore else */
                if (aUser.changed() && aUser.changed.length > 0) {
                    return await aUser.save();
                }

                return aUser;
            }
        };

        /**
       * Delete a user
       * @param {BigInt} userId
       */
        static async deleteUser(userId) {
            const aUser = await this.getUserByUserId(userId);
            if (!aUser) {
                throw new InvalidEntityException(userId, 'BOT_Users', 'Users doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            await aUser.destroy();
        };

    } // End Class

    return BOT_UsersController;
}; // End export