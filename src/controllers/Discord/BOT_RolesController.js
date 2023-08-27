const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class BOT_RolesController {

        /**
         * Get ALL BOT_Roles by GuildId
         * @param {BigInt} guildId
         * @param {*} withInclude
         * @returns
         */
        static getAllRolesByGuildId = async (guildId, withInclude = true) => {
            if (withInclude) {
                return await context.models.BOT_Roles.findAll({ where: { guildId: guildId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_Roles.findAll({ where: { guildId: guildId } });
            }
        };

        /**
         * Get BOT_Roles by roleId
         * @param {BigInt} roleId
         * @param {*} withInclude
         * @returns
         */
        static getRolesById = async (roleId, withInclude = true) => {
            if (withInclude) {
                return await context.models.BOT_Roles.findOne({ where: { roleId: roleId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_Roles.findOne({ where: { roleId: roleId } });
            }
        };

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
        static createRoleOnDB = async (guildId, roleId, roleName, permission, color = null, type = null, position = null) => {
            return await context.models.BOT_Roles.create({
                guildId: guildId,
                roleId: roleId,
                roleName: roleName,
                roleColor: color,
                rolePermission: permission,
                rolePosition: position,
                type: type,
            });
        };

        /**
         * Update DB Role
         * @param {*} roleId (mandatory)
         * @param {*} roleName
         * @param {*} color
         * @param {*} permission
         * @param {*} type
         * @param {*} position
         */
        static updateRole = async (roleId, roleName = null, permission = null, color = null, type = null, position = null) => {
            const aRole = await this.getRolesById(roleId, false);
            if (!aRole) {
                throw new InvalidEntityException(roleId, 'BOT_Roles', 'Roles doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
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
        };


    } // End Class

    return BOT_RolesController;
}; // End export

