import * as DAL_BotGuild from 'dal/Discord/BOT_Guilds'
import {GetAll_BotGuildFilters} from 'dal/types'
import {BotGuilds_Input, BotGuilds_Ouput} from 'models/Discord/BOT_Guilds'

export const create = (payload: BotGuilds_Input): Promise<BotGuilds_Ouput> => {
    return DAL_BotGuild.create(payload)
}
export const update = (discordGuildId: string, payload: Partial<BotGuilds_Input>): Promise<BotGuilds_Ouput> => {
    return DAL_BotGuild.update(discordGuildId, payload)
}
export const getById = (discordGuildId: string): Promise<BotGuilds_Ouput> => {
    return DAL_BotGuild.getById(discordGuildId)
}
export const deleteById = (discordGuildId: string): Promise<boolean> => {
    return DAL_BotGuild.deleteById(discordGuildId)
}
export const getAll = (filters: GetAll_BotGuildFilters): Promise<BotGuilds_Ouput[]> => {
    return DAL_BotGuild.getAll(filters)
}