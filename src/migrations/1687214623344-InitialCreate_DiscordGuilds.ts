import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

export class InitialCreateDiscordGuild1687214623344 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // ***************************************
        // * BOT_Guilds
        // ****************************************
        await queryRunner.createTable(
            new Table({
                name: "BOT_Guilds",
                schema: "bot",
                columns: [
                    {
                        name: "discordGuildId",
                        type: "bigint",
                        unsigned: true,
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "discordGuildName",
                        type: "varchar",
                        length: "100",
                        isNullable: false
                    },
                    {
                        name: "discordGuildIconUrl",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "discordGuildOwnerId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: "discordPreferredLocale",
                        type: "varchar",
                        length: "10",
                        isNullable: true,
                    },
                    {
                        name: "discordRegion",
                        type: "varchar",
                        length: "10",
                        isNullable: true,
                    },
                    {
                        name: "isActive",
                        type: "boolean",
                        default: true,
                        isNullable: false
                    },
                    {
                        name: "joinedAt",
                        type: "datetime",
                        default: 'NOW()',
                        isNullable: false
                    },
                    {
                        name: "leftAt",
                        type: "datetime",
                        isNullable: true
                    }
                ]
            }),
            true
        );
        await queryRunner.createIndex("BOT_Guilds", new TableIndex({
            name: "PK_Guilds_discordGuildId",
            columnNames: ["discordGuildId"]
        }))

        // ***************************************
        // * BOT_GuildOptions
        // ****************************************
        await queryRunner.createTable(
            new Table({
                name: "BOT_GuildOptions",
                schema: "bot",
                columns: [
                    {
                        name: "discordGuildId",
                        type: "bigint",
                        unsigned: true,
                        isPrimary: true,
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: "discordAnnoucementChannelId",
                        type: "bigint",
                        unsigned: true,
                        isNullable: false
                    },
                    {
                        name: "maxPlayerByLobby",
                        type: "int",
                        default: 12,
                        isNullable: false
                    },
                    {
                        name: "tagEveryone",
                        type: "boolean",
                        default: false,
                        isNullable: false
                    },
					]
            }),
            true
        );
        await queryRunner.createIndex("BOT_GuildOptions", new TableIndex({
            name: "PK_GuildOptions_discordGuildId",
            columnNames: ["discordGuildId"]
        }))

        // ***************************************
        // * BOT_Roles
        // ****************************************
        await queryRunner.createTable(
            new Table({
                name: "BOT_Roles",
                schema: "bot",
                columns: [
                    {
                        name: "discordGuildId",
                        type: "bigint",
                        unsigned: true,
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: "discordRoleId",
                        type: "bigint",
                        unsigned: true,
                        isUnique: true,
                        isNullable: false,
                        isPrimary: true
                    },
                    {
                        name: "discordRoleName",
                        type: "varchar",
                        length: "120",
                        isNullable: false
                    },
                    {
                        name: "discordRoleColor",
                        type: "int",
                        isNullable: false,
                        comment: "integer representation of hexadecimal color code"
                    },
                    {
                        name: "permissionLevel",
                        type: "varchar", // ?
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "position",
                        type: "tinyint",
                        isNullable: false
                    },
                    {
                        name: "type",
                        type: "tinyint",
                        isNullable: false
                    },
                    {
                        name: "lastUpdate",
                        type: "datetime",
                        isNullable: true
                    }
					]
            }),
            true
        );
        await queryRunner.createIndex("BOT_Roles", new TableIndex({
            name: "PK_Roles_discordGuildId_discordRoleId",
            columnNames: ["discordGuildId", "discordRoleId"],
            isUnique: true
        }))

        // ***************************************
        // * Foreing Key
        // * 1 BOT_Guilds have 1 BOT_GuildOptions (1..1)
        // * 1 BOT_Guilds have 0..* BOT_Roles (1..*)
        // ****************************************
        const fk_GuildToGuildOption = new TableForeignKey({
            name: "FK_GuildOptions_to_Guilds_discordGuildId",
            // Child Table Key
            columnNames: ["discordGuildId"],
            // (referenced) Parent Table Key
            referencedColumnNames: ["discordGuildId"],
            referencedTableName: "BOT_Guilds",
            // Options
            onDelete: "CASCADE",
        });
        await queryRunner.createForeignKey("BOT_GuildOptions", fk_GuildToGuildOption);

        const fk_GuildToRoles = new TableForeignKey({
            name: "FK_Guilds_to_Roles_discordGuildId",
            // Child Table Key
            columnNames: ["discordGuildId"],
            // (referenced) Parent Table Key
            referencedColumnNames: ["discordGuildId"],
            referencedTableName: "BOT_Guilds",
            // Options
            onDelete: "CASCADE",
        });
        await queryRunner.createForeignKey("BOT_Roles", fk_GuildToRoles);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("BOT_Roles", true, true, true);
        await queryRunner.dropTable("BOT_GuildOptions", true, true, true);
        await queryRunner.dropTable("BOT_Guilds", true, true, true);     
    }

}
