const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_UsersController {

        /**
         * Get BOT_Users by userId
         * @param {BigInt} userId
         * @param {*} withInclude
         * @returns
         */
        static getUserByUserId = async (userId, includeModels = []) => {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Users.findOne({ where: { userId: userId }, include: includeModels });
            } else {
                return await context.models.BOT_Users.findOne({ where: { userId: userId } });
            }
        };

        /**
         * Get all BOT_Users
         * @param {*} withInclude
         * @returns
         */
        static getAllUsers = async (includeModels = []) => {
            if (includeModels && includeModels.length > 0) {
                return await context.models.BOT_Users.findAll({ include: includeModels });
            } else {
                return await context.models.BOT_Users.findAll();
            }
        };

        /**
         * Create a new discord user
         * @param {BIGINT} userId  (mandatory)
         * @param {String} username  (mandatory)
         * @param {*} globalUsername
         * @param {*} discriminator
         * @param {*} email
         * @param {*} avatar
         * @param {*} banner
         * @param {*} accentColor
         * @returns
         */
        static createNewUser = async (userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) => {
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
         * @param {BIGINT} userId  (mandatory)
         * @param {String} username  (mandatory)
         * @param {*} globalUsername
         * @param {*} discriminator
         * @param {*} email
         * @param {*} avatar
         * @param {*} banner
         * @param {*} accentColor
         */
        static updateUser = async (userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) => {
            const aUser = await this.getUserByUserId(userId);
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
       * @param {*} userId
       */
        static deleteUser = async (userId) => {
            const aUser = await this.getUserByUserId(userId);
            if (!aUser) {
                throw new InvalidEntityException(userId, 'BOT_Users', 'Users doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            await aUser.destroy();
        };

    } // End Class

    return BOT_UsersController;
}; // End export