import Bot_Guilds from 'models/Discord/BOT_Guilds'

const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    Bot_Guilds.sync({ alter: isDev })
}

export default dbInit 