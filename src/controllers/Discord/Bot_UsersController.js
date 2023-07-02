const { sequelize } = require('../../dbSchema');
const { BOT_Users, BOT_UserDetails } = sequelize.models;

// ******************************************
// BOT_Users 
// ******************************************

/**
 * Get BOT_Users by userId
 * @param {BigInt} roleId 
 * @param {*} withInclude 
 * @returns 
 */
exports.getUserByUserId = async (userId, includeModels = []) => {
    if (withInclude) {
        return await BOT_Users.findOne({ where: { userId: userId }, include: includeModels });
    } else {
        return await BOT_Users.findOne({ where: { userId: userId } });
    }
}

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
exports.createNewUser = async (userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) => {
    return await BOT_Users.create({
        userId: userId,
        username: username,
        globalUsername: globalUsername,
        discriminator: discriminator,
        email: email,
        avatar: avatar,
        banner: banner,
        accentColor: accentColor
    });
}

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
exports.updateRole = async (userId, username, globalUsername = null, discriminator = null, email = null, avatar = null, banner = null, accentColor = null) => {
    let aUser = this.getUserByUserId(roleId, false);
    if (!aUser) {
        throw new Exception(`UserId ${userId} doesn't exist.`)
    } else {

        if (username !== aUser.username) {
            aUser.set({
                username: username,
            });
        }
        if (globalUsername !== aUser.globalUsername) {
            aUser.set({
                globalUsername: globalUsername,
            });
        }
        if (discriminator !== aUser.discriminator) {
            aUser.set({
                discriminator: discriminator,
            });
        }

        if (email !== aUser.email) {
            aUser.set({
                email: email,
            });
        }
        if (avatar !== aUser.avatar) {
            aUser.set({
                avatar: avatar,
            });
        }
        if (banner !== aUser.banner) {
            aUser.set({
                banner: banner,
            });
        }
        if (accentColor !== aUser.accentColor) {
            aUser.set({
                accentColor: accentColor,
            });
        }


        if (aUser.changed() && aUser.changed.length > 0) {
            await aUser.save();
        }
    }
}

// ******************************************
// BOT_UserDetails 
// ******************************************

/**
 * Initialize a BOT_UserDetails
 * @param {BIGINT} userId 
 * @returns 
 */
exports.initializeUserDetails = async (userId) => {
    return await BOT_UserDetails.create({
        userId: userId,
        switchFriendCode: null,
        switchUsername: null,
        twitchUsername: null
    });
}

exports.getUserDetailsByUserId = async (userId, withInclude = true) => {
    if (withInclude) {
        return await BOT_UserDetails.findOne({ where: { userId: userId }, include: BOT_Users });
    } else {
        return await BOT_UserDetails.findOne({ where: { userId: userId } });
    }
}

exports.updateUserDetails = async (userId, switchFriendCode = null, switchUsername = null, twitchUsername = null) => {
    let aUserDetails = this.getUserDetailsByUserId(userId);
    if (!aUserDetails) {
        throw new Exception(`User details for userId ${userId} doesn't exist.`)
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
}