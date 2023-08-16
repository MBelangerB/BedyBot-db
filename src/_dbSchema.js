'use strict';

// Required Node state
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/config/config')[env];

// Initiale fonction
let dbConfigFilePath = '';
const authorizedPath = [path.join(__dirname, '/config/config.js'),  
                        path.join(process.cwd(), process.env.CONFIG_FILE_PATH)];
const getConfigFilePath = function () {
  let successfully = false;
  for (const idx in authorizedPath) {
    const filePath = authorizedPath[idx];
    if (fs.existsSync(filePath)) {
      dbConfigFilePath = filePath;
      successfully = true;
      break;
    }
  }
  if (!successfully) {
    throw new Error('Can\'t find config file');
  }
};
getConfigFilePath();
const config = require(dbConfigFilePath)[env];

// Sequelize Variable
const db = {};
const controller = [];
const migrations = [];

// Initialize Sequelize constructor
let sequelize = null;
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

const readModelScript = function (folder = './models') {
  const fullPath = path.resolve(__dirname, folder);
  const files = fs.readdirSync(fullPath);

  files.forEach(file => {
    const subFilePath = path.join(fullPath, file);

    // Vérifier si l'élément est un dossier
    if (fs.statSync(subFilePath).isDirectory()) {
      // Appeler récursivement la fonction pour parcourir le sous-répertoire
      readModelScript(subFilePath);

    } else {
      // Vérifier si le fichier a l'extension ".model"
      /* eslint-disable-next-line no-lonely-if */
      if (path.extname(subFilePath) === '.js' && subFilePath.slice(-9) === '.model.js') {
        const model = require(path.join(fullPath, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
        console.log('Read model : ', model.name);
      }
    }

  });
};

/* eslint-disable-next-line no-unused-vars */
const readControllerScript = function (folder = './controllers') {
  const fullPath = path.resolve(__dirname, folder);
  const files = fs.readdirSync(fullPath);

  files.forEach(file => {
    const subFilePath = path.join(fullPath, file);

    // Vérifier si l'élément est un dossier
    if (fs.statSync(subFilePath).isDirectory()) {
      // Appeler récursivement la fonction pour parcourir le sous-répertoire
      readModelScript(subFilePath);

    } else {
      // Vérifier si le fichier a l'extension ".model"
      /* eslint-disable-next-line no-lonely-if */
      if (path.extname(subFilePath) === '.js' && subFilePath.slice(-13) === 'Controller.js') {
        // TODO: Pour mettre en application, il faudrait transformer les controllers sous le principe des modeles, mais en param les models
        /*
            module.exports = (models) => {
              Class XXXController {

                listFunction
              }
            }
        */
        const ctrller = require(path.join(fullPath, file))(sequelize.model);
        controller.push(ctrller);
        // console.log('Read model : ', model.name)
      }
    }

  });
};

/* eslint-disable-next-line no-unused-vars */
const readMigrationsScript = function (folder = './migrations') {
  const fullPath = path.resolve(__dirname, folder);
  const files = fs.readdirSync(fullPath);

  files.forEach(file => {
    const subFilePath = path.join(fullPath, file);

    // Vérifier si l'élément est un dossier
    if (fs.statSync(subFilePath).isDirectory()) {
      // Appeler récursivement la fonction pour parcourir le sous-répertoire
      readModelScript(subFilePath);

    } else {
      // Vérifier si le fichier a l'extension ".model"
      /* eslint-disable-next-line no-lonely-if */
      if (path.extname(subFilePath) === '.js') {
        const migration = require(path.join(fullPath, file)); // (sequelize, Sequelize.DataTypes);

        var name = path.parse(file).name;
        // migrations[name] = migration;   
        migrations.push(migration);
        console.log('Read migrations : ',name)
      }
    }

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
  if (env == "test") {
    db.migrations = migrations;
  }
};

testConnection();
readModelScript();
initializeModel();

if (env == "test") {
  readMigrationsScript();
}


module.exports = db;
