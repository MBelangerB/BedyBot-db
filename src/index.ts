// import { myDataSource } from "./bedydb-source"

// // establish database connection
// myDataSource
//     .initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization:", err)
//     })

import { AppDataSource, firstLoadingDataSource } from "./dataSource"
import { Bot_Guilds, Bot_GuildOption } from "./entity/global"
import { FindManyOptions, Repository } from 'typeorm';
import { copyFileSync } from "fs";

// import { User } from "./entity/User"

// console.log("CWD : " + process.cwd());
// console.log("DIR : " + __dirname)

const runSync: boolean = false;

if (runSync) {
    firstLoadingDataSource.initialize().then(async () => {
        console.log("Here you can setup and run express / fastify / any other framework.")
    }).catch(error => console.log(error))

} else {

    AppDataSource.initialize().then(async () => {

        console.log('Try read Guild data');
        const guildRepository = AppDataSource.getRepository(Bot_Guilds);
        const guildOptionRepository = AppDataSource.getRepository(Bot_GuildOption)

        const result = await guildRepository.find({
            relations: {
                guildOption: true,
            },
        });
        console.log(await guildRepository.count());
        console.info(result);

        const guildEntityManager = await AppDataSource.manager.find(Bot_Guilds, {
            relations: {
                guildOption: true,
            },
        })
        const guildOptEntityManager = await AppDataSource.manager.find(Bot_GuildOption)

        console.log("All guilds from the db: ", guildEntityManager)

        // console.log("Inserting a new user into the database...")
        // const user = new User()
        // user.firstName = "Timber"
        // user.lastName = "Saw"
        // user.age = 25
        // await AppDataSource.manager.save(user)
        // console.log("Saved a new user with id: " + user.id)

        // console.log("Loading users from the database...")
        // const users = await AppDataSource.manager.find(User)
        // console.log("Loaded users: ", users)

        // AppDataSource.runMigrations();
        console.log("Here you can setup and run express / fastify / any other framework.")

    }).catch(error => console.log(error))

}