'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = {};

// Initialize Sequelize constructor
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
 sequelize.options.define = {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
};
// }

// function isDir(path) {
//     try {
//         var stat = fs.lstatSync(path);
//         return stat.isDirectory();
//     } catch (e) {
//         // lstatSync throws an error if path doesn't exist
//         return false;
//     }
// }

const readModelScript = function(folder = './models') {
  const fullPath = path.resolve(__dirname, folder);
  fs.readdirSync(fullPath).filter(file => {

    // if (isDir(path.resolve(fullPath, file))) {
    //   const subFolder = folder + '/' + file;
    //   return readModelScript(subFolder);
    // }
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.model.js');
  })
    .forEach(file => {
      const model = require(path.join(fullPath, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
};

const initializeModel = function() {
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
};

readModelScript();
readModelScript('./models/Api');
readModelScript('./models/Discord');
initializeModel();


module.exports = db;
