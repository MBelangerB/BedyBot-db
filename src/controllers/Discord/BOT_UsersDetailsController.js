const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_UsersDetailsController {

    /**
      * Initialize a BOT_UserDetails
      * @param {BigInt} userId
      * @returns
      */
        static async initializeUserDetails(userId) {
            return await context.models.BOT_UserDetails.create({
                userId: userId,
                switchFriendCode: null,
                switchUsername: null,
                twitchUsername: null,
            });
        };

        /**
         * Get user details for a specific user
         * @param {BigInt} userId 
         * @param {boolean} withInclude 
         * @returns 
         */
        static async getUserDetailsByUserId(userId, withInclude) {
            if (withInclude) {
                return await context.models.BOT_UserDetails.findOne({ where: { userId: userId }, include: context.models.BOT_Users });
            } else {
                return await context.models.BOT_UserDetails.findOne({ where: { userId: userId } });
            }
        };

        /**
         * Update the userDetails
         * @param {BigInt} userId 
         * @param {string} switchFriendCode 
         * @param {string} switchUsername 
         * @param {string} twitchUsername 
         */
        static async updateUserDetails(userId, switchFriendCode = null, switchUsername = null, twitchUsername = null) {
            const aUserDetails = await this.getUserDetailsByUserId(userId, false);
            if (!aUserDetails) {
                throw new InvalidEntityException(userId, 'BOT_UserDetails', 'User doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

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

                return aUserDetails;
            }
        };

    } // End Class

    return BOT_UsersDetailsController;
}; // End export