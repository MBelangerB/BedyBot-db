import { MigrationInterface, QueryRunner, Table, TableIndex, ColumnType} from "typeorm"
import { AppDataSource } from "../dataSource";

export class InitializeDatabase1687195422230 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "API_Modules",
                schema: "api",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isNullable: false                            
                    },
                    {
                        name: "name",
                        type: "varchar",
                        // length: "255",
                        width: 255,
                        isNullable: false                            
                    },
                    {
                        name: "isEnabled",
                        type: "boolean",
                        default: false,
                        isNullable: false                            
                    },
                    {
                        name: "isPremium",
                        type: "boolean",
                        default: false,
                        isNullable: false                            
                    }
                ]
            }),
            true
        );

        await queryRunner.createIndex("API_Modules", new TableIndex({
            name: "PK_ApiModules_id",
            columnNames: ["id"]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
