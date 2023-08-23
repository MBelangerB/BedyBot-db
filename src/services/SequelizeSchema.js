'use strict';

// Import
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

// Const
/* eslint-disable-next-line no-unused-vars */
const env = process.env.NODE_ENV || 'development';
const configFilePath = process.env.CONFIG_FILE_PATH || '';


class SequelizeSchema {

    constructor() {
        // Do nothing
    }

    // Variable privé
    // TODO: Revoir si tout OK, vu que ce n'est plus du TS
    #authorizedPath = [
        path.join(__dirname, '/config/config.js'),
        path.join(__dirname, '../', '/config/config.js'),
        path.join(process.cwd(), configFilePath),
    ];

    // Variable publique
    dbConfigFilePath = '';

    // variable statique
    // static readingType = SequelizeSchema.ReadingType.MODELS;

    /**
     * Vérifier les différents path possible pour le fichier de configuration afin d'obtenir le path valide.
     * @returns
     */
    getConfigFilePath() {
        let successfully = false;
        console.dir(this.#authorizedPath);

        for (const idx in this.#authorizedPath) {
            const filePath = this.#authorizedPath[idx];
            if (fs.existsSync(filePath)) {
                this.dbConfigFilePath = filePath;
                successfully = true;
                break;
            }
        }
        if (!successfully) {
            throw new Error('Can\'t find config file');
        }
        return this.dbConfigFilePath;
    }

    readSequelizeFileContent(sequelize, dbContext, type = SequelizeSchema.ReadingType.MODELS, folderPath, fileExt = '.js',
        sliceLength = 0, sliceValue = '') {

        const fullPath = path.resolve(__dirname, '../', folderPath);
        console.log(`Read Type (${type}) FileContent : ${fullPath}`);

        // const fullPath = path.resolve(__dirname, folderPath);
        // console.log('REadFile Content : ', fullPath);

        if (fs.existsSync(fullPath)) {
            const files = fs.readdirSync(fullPath);
            console.dir(files);

            files.forEach(file => {
                const subFilePath = path.join(fullPath, file);
                if (fs.statSync(subFilePath).isDirectory()) {
                    this.readSequelizeFileContent(sequelize, dbContext, type, subFilePath, fileExt, sliceLength, sliceValue);
                } else if (sliceLength > 0 && type == SequelizeSchema.ReadingType.MODELS) {

                        if (path.extname(subFilePath) === fileExt && subFilePath.slice(sliceLength) === sliceValue) {
                            const model = require(path.join(fullPath, file))(sequelize, Sequelize.DataTypes);
                            dbContext.models[model.name] = model;
                            console.log('Read Models : ', model.name);
                        }

                    } else {
                        switch (type) {
                            case SequelizeSchema.ReadingType.MIGRATION:
                                if (path.extname(subFilePath) === fileExt) {
                                    const migration = require(path.join(fullPath, file));
                                    var name = migration.name;
                                    if (!name || name.length == 0) {
                                        name = path.parse(file).name;
                                    }
                                    dbContext.migrations[name] = migration;
                                    console.log('Read migrations : ', name);
                                }
                                break;

                            case SequelizeSchema.ReadingType.CONTROLLER:
                                if (path.extname(subFilePath) === fileExt) {
                                    const controller = require(path.join(fullPath, file))(sequelize, dbContext);
                                    var name = '';
                                    if (!name || name.length == 0) {
                                        name = path.parse(file).name;
                                    }
                                    dbContext.controller[name] = controller;
                                    console.log('Read Controller : ', name);
                                }
                                break;
                        }
                    }
            });

        }
    }

    readModelScript(sequelize, dbContext, folderPath = './models', baseExt = '.js') {
        const fullPath = path.resolve(__dirname, '../', folderPath);
        console.log('REadFile Content : ', fullPath);

        const files = fs.readdirSync(fullPath);
        console.dir(files);

        files.forEach(file => {
            const subFilePath = path.join(fullPath, file);
            if (fs.statSync(subFilePath).isDirectory()) {
                this.readModelScript(sequelize, dbContext, subFilePath);
            } else {
                const sliceExt = `.model${baseExt}`;
                if (path.extname(subFilePath) === baseExt && subFilePath.slice(-9) === sliceExt) {

                    const modelFilename = path.join(fullPath, file);
                    const model = require(modelFilename)(sequelize, Sequelize.DataTypes);
                    dbContext.models[model.name] = model;
                    console.log('Read Models : ', model.name);
                }
            }
        });
    }

    initializeAssociationModel(dbContext) {
        Object.keys(dbContext.models).forEach((modelName) => {
            if (dbContext.models[modelName].associate) {
                dbContext.models[modelName].associate(dbContext.models);
                console.log(`Add association for ${modelName}`);
            }
        });
    }

    async testConnection(sequelize) {
        if (sequelize == null) {
            throw new Error('Parameters is missing.');
        }

        // Test the connection
        return sequelize.authenticate().then(() => {
            console.log('Connection has been established successfully.');
            return true;
        }).catch((error) => {
            console.error('Unable to connect to the database:', error);
            return false;
        });
    }

    async dropDatabase(sequelize) {
        await sequelize.drop();
        console.log('Database has been dropped!');
    }


    async resetDatabase(sequelize) {
        try {
            await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

            await sequelize.sync({ force: true });

            await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

            console.log('All tables have been reinitialized!');
        } catch (ex) {
            console.error(ex);
            throw ex;
        }

    }
}

exports.SequelizeSchema = SequelizeSchema;

SequelizeSchema.ReadingType = {
    MODELS: 0,
    MIGRATION: 1,
    CONTROLLER: 2,
};
