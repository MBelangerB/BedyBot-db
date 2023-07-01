const { sequelize } = require('../../dbSchema');
const { BOT_Roles } = sequelize.models;

/**
 * Get ALL BOT_Roles by GuildId
 * @param {BigInt} guildId 
 * @param {*} withInclude 
 * @returns 
 */
exports.getAllRolesByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_Roles.findAll({ where: { guildId: guildId }, include: [BOT_Roles.getModels().BOT_Guilds] });
    } else {
        return await BOT_Roles.findAll({ where: { guildId: guildId } });
    }
}

/**
 * Get BOT_Roles by roleId
 * @param {BigInt} roleId 
 * @param {*} withInclude 
 * @returns 
 */
exports.getRolesById = async (roleId, withInclude = true) => {
    if (withInclude) {
        return await BOT_Roles.findOne({ where: { roleId: roleId }, include: [BOT_Roles.getModels().BOT_Guilds] });
    } else {
        return await BOT_Roles.findOne({ where: { roleId: roleId } });
    }
}

// /**
//  * Get BOT_Roles by GuildId / RoleType
//  * @param {integer} id
//  * @returns {BOT_Roles}
//  */
// exports.getRoleById = async (guildId, roleType = BOT_Roles.RoleTypes.MANAGER) => {
//     return await this.findOne({ where: { guildId: guildId, type: roleType } });
// }

/**
      * Add a new discord role on DB
      * @param {string} guildId (mandatory)
      * @param {string} roleId (mandatory)
      * @param {string} roleName (mandatory)
      * @param {*} permission (mandatory)
 * @param {*} color 

 * @param {*} type 
 * @param {*} position 
 * @returns 
 */
exports.createRoleOnDB = async (guildId, roleId, roleName, permission, color = null, type = null, position = null) => {
    return await BOT_Roles.create({
        guildId: guildId,
        roleId: roleId,
        roleName: roleName,
        roleColor: color,
        rolePermission: permission,
        rolePosition: position,
        type: type,
    });
}

/**
 * Update DB Role
 * @param {*} roleId (mandatory)
 * @param {*} roleName 
 * @param {*} color 
 * @param {*} permission 
 * @param {*} type 
 * @param {*} position 
 */
exports.updateRole = async (roleId, roleName = null, permission = null, color = null, type = null, position = null) => {
    let aRole = this.getRolesById(roleId, false);
    if (!aRole) {
        throw new Exception(`RoleId ${roleId} doesn't exist.`)
    }

    if (roleName !== aRole.roleName) {
        aRole.set({
            roleName: roleName,
        });
    }
    if (permission !== aRole.rolePermission) {
        aRole.set({
            rolePermission: permission,
        });
    }
    if (color !== aRole.roleColor) {
        aRole.set({
            roleColor: color,
        });
    }

    if (!position && position !== aRole.rolePosition) {
        aRole.set({
            rolePosition: position,
        });
    }
    if (type !== aRole.type) {
        aRole.set({
            type: type,
        });
    }

    if (aRole.changed() && aRole.changed.length > 0) {
        aRole.set({
            lastUpdate: Date.now(),
        });

        await aRole.save();
    }
}

