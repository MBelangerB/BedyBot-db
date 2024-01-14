'use strict';

// Required Node state
require('dotenv').config();

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const { SequelizeSchema } = require('./services/SequelizeSchema');
const schema = new SequelizeSchema();

const dbConfigFilePath = schema.getConfigFilePath();
const config = require(dbConfigFilePath)[env];

// Set timezone
// process.env.TZ = 'Etc/UTC';
console.log(`TZ : ${process.env.TZ}`);

// Initialize Sequelize constructor
let sequelize = null;
if (process.env.DB_DRIVER == 'sqlite') {
  sequelize = new Sequelize(config.database, config.username, config.password, config);

} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    // logging: config.logging
  });
}

// Define options
sequelize.options.define = {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
};

const dbContext = {
  models: {},
  migrations: {},
  controller: {},
  sequelize: sequelize,
  schema: schema,
};

function InitalizeContext() {
  // if (await schema.testConnection(sequelize)) {
  try {
    schema.readModelScript(sequelize, dbContext, './models', '.js');
    schema.readSequelizeFileContent(sequelize, dbContext, SequelizeSchema.ReadingType.MIGRATION, './migrations', '.js', 0, '');
    schema.initializeAssociationModel(dbContext);
    schema.readSequelizeFileContent(sequelize, dbContext, SequelizeSchema.ReadingType.CONTROLLER, './controllers', '.js', 0, '');
  } catch (ex) {
    console.error(ex);
  }

  // if (env == "test") {
  //   schema.readMigrationsScript();
  // }
}

InitalizeContext();

module.exports = dbContext;
