const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class Bot_UsersDetailsController {

        /**
      * Initialize a BOT_UserDetails
      * @param {BIGINT} userId
      * @returns
      */
        static initializeUserDetails = async (userId) => {
            return await context.models.BOT_UserDetails.create({
                userId: userId,
                switchFriendCode: null,
                switchUsername: null,
                twitchUsername: null,
            });
        };

        static getUserDetailsByUserId = async (userId, withInclude = true) => {
            if (withInclude) {
                return await context.models.BOT_UserDetails.findOne({ where: { userId: userId }, include: context.models.BOT_Users });
            } else {
                return await context.models.BOT_UserDetails.findOne({ where: { userId: userId } });
            }
        };

        static updateUserDetails = async (userId, switchFriendCode = null, switchUsername = null, twitchUsername = null) => {
            const aUserDetails = await this.getUserDetailsByUserId(userId);
            if (!aUserDetails) {
                // throw new InvalidEntityException(guildId, 'BOT_Guilds', 'Guild doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
                throw new Error(`User details for userId ${userId} doesn't exist.`);

            } else {
                if (switchFriendCode != null && switchFriendCode !== aUserDetails.switchFriendCode) {
                    aUserDetails.set({
                        switchFriendCode: switchFriendCode,
                    });
                }
                if (switchUsername != null && switchUsername !== aUserDetails.switchUsername) {
                    aUserDetails.set({
                        switchUsername: switchUsername,
                    });
                }
                if (twitchUsername != null && twitchUsername !== aUserDetails.twitchUsername) {
                    aUserDetails.set({
                        twitchUsername: twitchUsername,
                    });
                }


                if (aUserDetails.changed() && aUserDetails.changed.length > 0) {
                    await aUserDetails.save();
                }
            }
        };

    } // End Class

    return Bot_UsersDetailsController;
} // End export