const InvalidEntityException = require('../../declarations/InvalidEntityException');
const { BedyAPIConst } = require('../../BedyAPIConst');

module.exports = (sequelize, context) => {
    class BOT_RolesController {

        /**
         * Get ALL BOT_Roles by GuildId
         * @param {BigInt} guildId
         * @param {*} withInclude
         * @returns
         */
        static async getAllRolesByGuildId(guildId, withInclude) {
            if (withInclude) {
                return await context.models.BOT_Roles.findAll({ where: { guildId: guildId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_Roles.findAll({ where: { guildId: guildId } });
            }
        }

        /**
         * Get BOT_Roles by roleId
         * @param {BigInt} roleId
         * @param {*} withInclude
         * @returns
         */
        static async getRolesById(roleId, withInclude) {
            if (withInclude) {
                return await context.models.BOT_Roles.findOne({ where: { roleId: roleId }, include: [context.models.BOT_Guilds] });
            } else {
                return await context.models.BOT_Roles.findOne({ where: { roleId: roleId } });
            }
        }

        /**
         * Add a new discord role on DB
         * @param {BigInt} guildId (mandatory)
         * @param {BigInt} roleId (mandatory)
         * @param {string} roleName (mandatory)
         * @param {int32} permission (mandatory)
         * @param {int32} color (can be null)
         * @param {BedyAPIConst.BedyBotRoleType} type (can be null)
         * @param {int32} position (can be null)
         * @returns
         */
        static async createRoleOnDB(guildId, roleId, roleName, permission, color, type, position) {
            return await context.models.BOT_Roles.create({
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
         * Update DB Role. If NULL value, the parameters isn't updated
         * @param {BigInt} roleId (mandatory)
         * @param {string} roleName (can be null)
         * @param {int32} color (can be null)
         * @param {int32} permission (can be null)
         * @param {BedyAPIConst.BedyBotRoleType} type (can be null)
         * @param {int32} position (can be null)
         */
        static async updateRole(roleId, roleName = null, permission = null, color = null, type = null, position = null) {
            const aRole = await this.getRolesById(roleId, false);
            if (!aRole) {
                throw new InvalidEntityException(roleId, 'BOT_Roles', 'Roles doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            /* istanbul ignore else */
            if (roleName != null && roleName !== aRole.roleName) {
                aRole.set({
                    roleName: roleName,
                });
            }

            /* istanbul ignore else */
            if (permission != null && permission !== aRole.rolePermission) {
                aRole.set({
                    rolePermission: permission,
                });
            }

            /* istanbul ignore else */
            if (color != null && color !== aRole.roleColor) {
                aRole.set({
                    roleColor: color,
                });
            }

            /* istanbul ignore else */
            if (position != null && position !== aRole.rolePosition) {
                aRole.set({
                    rolePosition: position,
                });
            }

            /* istanbul ignore else */
            if (type != null && type !== aRole.type) {
                aRole.set({
                    type: type,
                });
            }

            /* istanbul ignore else */
            if (aRole.changed() && aRole.changed.length > 0) {
                aRole.set({
                    lastUpdate: Date.now(),
                });

                await aRole.save();
            }

            return aRole;
        }

        /**
        * Delete a discord role
        * @param {BigInt} roleId
        */
        static async deleteRole(roleId) {
            const aRole = await this.getRolesById(roleId, false);
            if (!aRole) {
                throw new InvalidEntityException(roleId, 'BOT_Roles', 'Roles doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            } else {
                await aRole.destroy();
            }
        }


    } // End Class

    return BOT_RolesController;
}; // End export

