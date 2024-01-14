const InvalidEntityException = require('../../declarations/InvalidEntityException');

module.exports = (sequelize, context) => {
    class RIOT_ConfigController {

        // Create
        static async createConfig(id, seasonId) {
            // BR pour valider que le seasonId soit conforme
            if (id) {
                return await context.models.RIOT_Config.create({
                    id: id,
                    seasonId: seasonId,
                });
            } else {
                return await context.models.RIOT_Config.create({
                    seasonId: seasonId,
                });
            }
        }

        // Read
        static async getConfigById(configId) {
            const aConfig = await context.models.RIOT_Config.findOne({ where: { id: configId } });

            /* istanbul ignore else */
            if (!aConfig) {
                throw new InvalidEntityException(configId, 'RIOT_Config', 'Config doesn\'t exist.', InvalidEntityException.ErrorType.INVALID_PK);
            }

            return aConfig;
        }

        // Update
        static async updateConfig(configId, seasonId) {
            const aConfig = await this.getConfigById(configId);

            /* istanbul ignore else */
            if (aConfig) {
                aConfig.set({
                    seasonId: seasonId,
                });

                /* istanbul ignore else */
                if (aConfig.changed() && aConfig.changed.length > 0) {
                    await aConfig.save();
                }
            }

            return aConfig;
        }

        // Get specific value
        // static async getCurrentSeason() {
        //     let config = await this.getConfig(1);
        //     if (!config) {
        //         return config.seasonId;
        //     }
        //     return null;
        // };


    } // End Class

    return RIOT_ConfigController;
}; // End export