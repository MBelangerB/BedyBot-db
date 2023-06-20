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

import { AppDataSource } from "./dataSource"
import { API_Modules, RIOT_Summoner } from "./entity/global"
// import { User } from "./entity/User"

console.log("CWD : " + process.cwd());
console.log("DIR : " + __dirname)


AppDataSource.initialize().then(async () => {

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
