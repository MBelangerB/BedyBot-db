// Required Node state
require('dotenv').config();

const env: string = process.env.NODE_ENV || 'development';
const configFilePath: string = process.env.CONFIG_FILE_PATH || '';

// import { join } from 'path';
// import { existsSync } from 'fs';
import { Sequelize } from 'sequelize-typescript';
import { SequelizeSchema } from './services/SequelizeSchema';


// Preload Service
let sequelizeSchema = new SequelizeSchema();

// Initiale fonction
let dbConfigFilePath = sequelizeSchema.getConfigFilePath();

// const authorizedPath = [join(__dirname, '/config/config.js'), join(process.cwd(), configFilePath)];

// const getConfigFilePath = function () {
//   let successfully = false;

//   for (const idx in authorizedPath) {
//     const filePath = authorizedPath[idx];
//     if (existsSync(filePath)) {
//       dbConfigFilePath = filePath;
//       successfully = true;
//       break;
//     }
//   }

//   if (!successfully) {
//     throw new Error('Can\'t find config file');
//   }
// };
// getConfigFilePath();
const config: any = require(dbConfigFilePath)[env];

// Initialize Sequelize constructor
let sequelize: Sequelize;

if (process.env.DB_DRIVER == 'sqlite') {
    sequelize = new Sequelize(config.database, config.username, config.password, config);

} else {
    sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
    });
}

// Define options
sequelize.options.define = {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
};

// Sequelize Variable
const dbContext : any = {
    models: {},
    migrations: {},
    controllers: {},
    sequelize: sequelize,
};

const testConnection = function () {
    // Test the connection
    sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((error) => {
            console.error('Unable to connect to the database:', error);
        });
};

testConnection();
sequelizeSchema.readModelScript(sequelize, dbContext, './models', '.js');
sequelizeSchema.readSequelizeFileContent(sequelize, dbContext, SequelizeSchema.ReadingType.MIGRATION, './migrations', '.js', 0, '');
sequelizeSchema.initializeAssociationModel(dbContext);

export default dbContext;