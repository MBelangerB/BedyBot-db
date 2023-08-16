

import { join, resolve, extname, parse } from 'path';
import { existsSync, readdirSync, statSync } from 'fs';
import { Sequelize, DataType } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

const env: string = process.env.NODE_ENV || 'development';
const configFilePath: string = process.env.CONFIG_FILE_PATH || '';

export class SequelizeSchema {

    private authorizedPath: Array<string> = [
        join(__dirname, '/config/config.js'),
        join(__dirname, '/config/config.ts'),
        join(__dirname, '../', '/config/config.js'),
        join(__dirname, '../', '/config/config.ts'),
        join(process.cwd(), configFilePath)
    ];
    private dbConfigFilePath: string = '';
    static ReadingType: { MODELS: number; MIGRATION: number; CONTROLLER: number; };

    getConfigFilePath(): string {
        let successfully = false;

        console.dir(this.authorizedPath);
        for (const idx in this.authorizedPath) {
            const filePath = this.authorizedPath[idx];

            if (existsSync(filePath)) {
                this.dbConfigFilePath = filePath;
                successfully = true;
                break;
            }
        }

        if (!successfully) {
            throw new Error('Can\'t find config file');
        }

        return this.dbConfigFilePath;
    };

    /**
     * [NOT TEST - NOT USED]
     * @param sequelize 
     * @param data 
     * @param folderPath 
     * @param fileExt 
     * @param sliceLength 
     * @param sliceValue 
     */
    readSequelizeFileContent(sequelize: Sequelize, data: any, type: number = SequelizeSchema.ReadingType.MODELS,
                                folderPath: string, fileExt: string = '.js',
                                sliceLength: number = 0, sliceValue: string = ''): void {
        const fullPath = resolve(__dirname, "../", folderPath);
        // const fullPath = resolve(__dirname, folderPath);
        console.log('REadFile Content : ', fullPath);

        const files = readdirSync(fullPath);
        console.dir(files);

        // let data : any = {};

        files.forEach(file => {
            const subFilePath = join(fullPath, file);

            // Check if current « file » is a subDirectory
            if (statSync(subFilePath).isDirectory()) {
                this.readSequelizeFileContent(sequelize, data,  type, subFilePath, fileExt, sliceLength, sliceValue);

            } else {
                if (sliceLength > 0 && type == SequelizeSchema.ReadingType.MODELS) {
                    if (extname(subFilePath) === fileExt && subFilePath.slice(sliceLength) === sliceValue) {
                        const model = require(join(fullPath, file))(sequelize, DataTypes);
                        data.models[model.name] = model;
                        console.log('Read data : ', model.name);
                    }
                } else {
                    switch (type) {
                        case SequelizeSchema.ReadingType.MIGRATION: 
                        if (extname(subFilePath) === fileExt) {
                            const migration = require(join(fullPath, file));
                            var name = parse(file).name;
                            // migrations[name] = migration;   
                            data.migrations[name] = migration;
                            console.log('Read migrations : ', name)
                        }
                        break;
                    }

                    // if (extname(subFilePath) === fileExt) {
                    //     // data[model.name] = model;
                    //     // console.log('Read data : ', model.name);
                    // }
                }
            }
        });
    }

    /**
     * Read all models file
     * @param sequelize 
     * @param data 
     * @param folderPath 
     */
    readModelScript(sequelize: Sequelize, data: any, folderPath: string = './models', baseExt : string = ".js") {
        const fullPath = resolve(__dirname, "../", folderPath);
        // const fullPathJ = join(__dirname, "../", folderPath);
        console.log('REadFile Content : ', fullPath);

        const files = readdirSync(fullPath);
        console.dir(files);


        files.forEach(file => {
            const subFilePath = join(fullPath, file);

            // Vérifier si l'élément est un dossier
            if (statSync(subFilePath).isDirectory()) {
                // Appeler récursivement la fonction pour parcourir le sous-répertoire
                this.readModelScript(sequelize, data, subFilePath);

            } else {
                // Vérifier si le fichier a l'extension ".model"
                let sliceExt = `.model${baseExt}`;

                if (extname(subFilePath) === baseExt && subFilePath.slice(-9) === sliceExt) {
                    const modelFilename : string = join(fullPath, file);
                    const model = require(modelFilename); // (sequelize, DataTypes);
                    const modelName = Object.keys(model)[0];

                    data.models[modelName] = model[modelName]; // model;
                    console.log('Read data : ', modelName);
                }
            }
        });
    };

    /**
     * Initialize models association
     * @param data 
     */
    initializeAssociationModel(data: any) {
        Object.keys(data.models).forEach((modelName: string) => {
            if (data.models[modelName].associate) {
                data.models[modelName].associate(data.models);
            }
            // if (data.models[modelName][modelName].associate) {
            //     data.models[modelName][modelName].associate(data.models);
            // }
        });
    };
    
}

SequelizeSchema.ReadingType = {
    MODELS: 0,
    MIGRATION : 1,
    CONTROLLER :  2
}