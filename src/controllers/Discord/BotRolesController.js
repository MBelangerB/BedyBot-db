const { sequelize } = require('../../dbSchema');
const { BOT_Roles } = sequelize.models;

/**
 * Get BOT_Roles by Guild
 * @param {*} id 
 * @param {*} withInclude 
 * @returns 
 */
exports.getRolesByGuildId = async (guildId, withInclude = true) => {
    if (withInclude) {
        return await BOT_Roles.findAll({ where: { guildId: guildId }, include: [BOT_Roles.getModels().BOT_Guilds] });
    } else {
        return await BOT_Roles.findAll({ where: { guildId: guildId } });
    }
}

/**
 * Get BOT_Roles by id
 * @param {*} id 
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

/**
 * Get BOT_Roles by GuildId / RoleType
 * @param {integer} id
 * @returns {BOT_Roles}
 */
exports.getRoleById = async (guildId, roleType = BOT_Roles.RoleTypes.MANAGER) => {
    return await this.findOne({ where: { guildId: guildId, type: roleType } });
}

/**
      * Add a new discord role on DB
      * @param {string} guildId
      * @param {string} roleId
      * @param {string} roleName
      * @param {integer} discordColor
      * @param {integer} type
      * @returns
      */
exports.createRoleOnDB = async (guildId, roleId, roleName, color, permission, type, position = null) => {
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
 * @param {*} roleId 
 * @param {*} roleName 
 * @param {*} color 
 * @param {*} permission 
 * @param {*} type 
 * @param {*} position 
 */
exports.updateRole = async (roleId, roleName, color, permission, type, position = null) => {
    let aRole = this.getRolesById(roleId);
    if (!aGuild) {
        throw new Exception(`RoleId ${roleId} doesn't exist.`)
    }

    if (roleName !== aRole.roleName) {
        aRole.set({
            roleName: roleName,
        });
    }
    if (color !== aRole.roleColor) {
        aRole.set({
            roleColor: color,
        });
    }
    if (permission !== aRole.rolePermission) {
        aRole.set({
            rolePermission: permission,
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
        await aRole.save();
    }
}

