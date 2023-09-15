const InvalidEntityException = require('../../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class MOD_NotificationsController {

        /**
         * Get all guild notification
         * @param {*} guildId
         * @param {*} models
         * @returns
         */
        static async getNotificationByGuildId(guildId, models = []) {
            if (models && models.length > 0) {
                return await context.models.MOD_Notifications.findAll({ where: { guildId: guildId }, include: models });
            } else {
                return await context.models.MOD_Notifications.findAll({ where: { guildId: guildId } });
            }
        };

        /**
         * Get notification by ID
         * @param {*} notificationId
         * @param {*} models
         * @returns
         */
        static async getNotificationById(notificationId, models = []) {
            if (models && models.length > 0) {
                return await context.models.MOD_Notifications.findOne({ where: { notificationId: notificationId }, include: models });
            } else {
                return await context.models.MOD_Notifications.findOne({ where: { notificationId: notificationId } });
            }
        };

        /**
         * Create new notification
         * @param {*} guildId
         * @param {*} notificationMessage
         * @param {*} notificationType
         * @param {*} notificationTarget
         * @param {*} enabled
         * @param {*} channelId
         * @returns
         */
        static async createNotification(guildId, notificationMessage, notificationType, notificationTarget, enabled, channelId) {
            return await context.models.MOD_Notifications.create({
                guildId: guildId,
                channelId: channelId,
                notificationMessage: notificationMessage,
                notificationType: notificationType,
                notificationTarget: notificationTarget,
                enabled: enabled,
            });
        };

        /**
         * Update a notification
         * @param {*} notificationId
         * @param {*} notificationMessage
         * @param {*} notificationType
         * @param {*} notificationTarget
         * @param {*} enabled
         * @param {*} channelId
         * @returns
         */
        static async updateNotification(notificationId, notificationMessage, notificationType, notificationTarget, enabled, channelId) {
            const aNotification = await this.getNotificationById(notificationId);
            if (!aNotification) {
                throw new InvalidEntityException(notificationId, 'MOD_Notifications', 'Notification doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);

            } else {
                if (aNotification.channelId != channelId) {
                    aNotification.set({
                        channelId: channelId,
                    });
                }
                if (enabled != null && aNotification.enabled != enabled) {
                    aNotification.set({
                        enabled: enabled,
                    });
                }

                if (notificationMessage != null && aNotification.notificationMessage != notificationMessage) {
                    aNotification.set({
                        notificationMessage: notificationMessage,
                    });
                    // if (notificationMessage == null || notificationMessage.length == 0) {
                    //     aNotification.set({
                    //         enabled: false,
                    //     });
                    // }
                }

                if (notificationType != null && aNotification.notificationType != notificationType) {
                    aNotification.set({
                        notificationType: notificationType,
                    });
                }

                if (notificationTarget != null && aNotification.notificationTarget != notificationTarget) {
                    aNotification.set({
                        notificationTarget: notificationTarget,
                    });
                }

                if (aNotification.changed() && aNotification.changed.length > 0) {
                    return await aNotification.save();
                }

                return aNotification;
            }
        };

        /**
         * Delete all guild notification
         * @param {*} guildId
         */
        static async deleteAllNotificationByGuildId(guildId) {
            await context.models.MOD_Notifications.destroy({
                where: {
                    guildId: guildId,
                },
            }).then((rowsDeleted) => {
                if (rowsDeleted === 0) {
                  throw new InvalidEntityException(guildId, 'MOD_Notifications', 'Notification doesn\'t exist for this guild.', InvalidEntityException.ErrorType.INVALID_PK);
                }
            });/* .catch((err) => {
                throw new InvalidEntityException(guildId, 'MOD_Notifications', 'Notification doesn\'t exist for this guild.', InvalidEntityException.ErrorType.INVALID_PK);
            });*/
        };

        /**
         * Delete all guild notification
         * @param {*} guildId
         */
        static async deleteNotificationId(notificationId) {
            const aNotification = await this.getNotificationById(notificationId);
            if (!aNotification) {
                throw new InvalidEntityException(notificationId, 'MOD_Notifications', 'Notification doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            await aNotification.destroy();
        };

    } // End Class

    return MOD_NotificationsController;
}; // End export