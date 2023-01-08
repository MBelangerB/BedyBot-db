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

sequelize.options.define = {
  timestamps: false,
  createdAt: false,
  updatedAt: false,
};

const readModelScript = function (folder = './models') {
  const fullPath = path.resolve(__dirname, folder);
  fs.readdirSync(fullPath).filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.model.js');
  })
    .forEach(file => {
      const model = require(path.join(fullPath, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });
};

const initializeModel = function () {
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
readModelScript('./models/Riot');

initializeModel();


module.exports = db;
// export default { db };

exports.default = {
  db: db,
  connection: sequelize,
};

