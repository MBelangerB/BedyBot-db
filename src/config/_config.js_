require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: true,
    // dialectOptions: {
    //   bigNumberStrings: true
    // }
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'bedybot_mochaTest',
    host: 'localhost',
    port: 13306,
    dialect: 'mysql',
  },
  test2: {
    username: 'bedybot',
    password: 'adamra',
    database: 'bedybot_mochaTest',
    host: 'localhost',
    port: 13306,
    dialect: 'mysql',
    // dialectOptions: {
    //   bigNumberStrings: true
    // }
  },
};

module.exports = config;