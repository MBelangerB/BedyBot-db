import { Op } from 'sequelize'
import { Bot_Guilds } from 'models/globalModels'
import { BotGuilds_Input, BotGuilds_Ouput } from 'models/Discord/BOT_Guilds'
import { GetAll_BotGuildFilters } from 'dal/types'

export const create = async (payload: BotGuilds_Input): Promise<BotGuilds_Ouput> => {
    const aBot_Guilds = await Bot_Guilds.create(payload)
    return aBot_Guilds as BotGuilds_Ouput;
}

export const update = async (discordGuildId: string, payload: Partial<BotGuilds_Input>): Promise<BotGuilds_Ouput> => {
    const aBot_Guilds = await Bot_Guilds.findByPk(discordGuildId)
    if (!aBot_Guilds) {
        // @todo throw custom error
        throw new Error('not found')
    }
    const updatedBot_Guilds = await (aBot_Guilds as Bot_Guilds).update(payload)
    return updatedBot_Guilds as BotGuilds_Ouput;
}

export const getById = async (discordGuildId: string): Promise<BotGuilds_Ouput> => {
    const aBot_Guilds: Bot_Guilds | null = await Bot_Guilds.findByPk(discordGuildId)
    if (!aBot_Guilds) {
        // @todo throw custom error
        throw new Error('not found')
    }
    return aBot_Guilds as BotGuilds_Ouput;
}

export const deleteById = async (discordGuildId: string): Promise<boolean> => {
    const deletedBot_GuildsCount = await Bot_Guilds.destroy({
        where: { discordGuildId }
    })
    return !!deletedBot_GuildsCount
}

export const getAll = async (filters?: GetAll_BotGuildFilters): Promise<BotGuilds_Ouput[]> => {
    return (Bot_Guilds.findAll({
        where: {
            ...(filters?.isActive && { isActive: { [Op.eq]: true } })
        }
    }) as Promise<BotGuilds_Ouput[]>);
}
