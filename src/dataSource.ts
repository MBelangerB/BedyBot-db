import "reflect-metadata"
import { DataSource, DataSourceOptions } from "typeorm"

const config : DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 13306,
    username: "bedybot",
    password: "adamra",
    database: "bedybot_dev",
    // entities: ["entity/**/*.model.ts", "src/entity/**/*.model.ts"],
    entities: [`${__dirname}/entity/**/*.model.ts`],
    // migrations: ["migrations/*.ts", "src/migrations/*.ts"],
    migrations: [`${__dirname}/migrations/**/*.ts`],
    // migrationsTableName: "custom_migration_table",
    logging: true,
    synchronize: true,
    subscribers: [],
    timezone: "Z",
    migrationsRun: true
};


console.log("CWD2 : " + process.cwd()); // /path/to/project
console.log("DIR2 : " + __dirname)

export default config;
export const AppDataSource = new DataSource(config);


// if (process.env.NODE_ENV === 'development') {
//     Object.assign(AppDataSource, {
//       entities: ['src/database/entity/**/*.ts'],
//       migrations: ['src/database/migration/**/*.ts'],
//     });
//   }


// export default AppDataSource;

// // export { BedyBotDataSource }