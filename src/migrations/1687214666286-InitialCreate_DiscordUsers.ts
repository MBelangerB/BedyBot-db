// import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

// export class InitialCreateDiscordUsers1687214666286 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         // ***************************************
//         // * BOT_Users
//         // ****************************************
//         await queryRunner.createTable(
//             new Table({
//                 name: "BOT_Users",
//                 schema: "bot",
//                 columns: [
//                     {
//                         name: "discordUserId",
//                         type: "bigint",
//                         unsigned: true,
//                         isPrimary: true,
//                         isUnique: true,
//                         isNullable: false
//                     },
//                     {
//                         name: "username",
//                         type: "varchar",
//                         length: "32",
//                         isNullable: false
//                     },
//                     {
//                         name: "globalUsername",
//                         type: "varchar",
//                         length: "255",
//                         isNullable: true
//                     },
//                     {
//                         name: "discriminator",
//                         type: "varchar",
//                         length: "10",
//                         isNullable: true
//                     },
//                     {
//                         name: "email",
//                         type: "varchar",
//                         length: "255",
//                         isNullable: true
//                     },
//                     {
//                         name: "avatar",
//                         type: "varchar",
//                         length: "255", // ????
//                         isNullable: false
//                     },
//                     {
//                         name: "banner",
//                         type: "varchar",
//                         length: "255", // ?
//                         isNullable: false
//                     },
//                     {
//                         name: "bannerColor",
//                         type: "varchar",
//                         length: "255", // ?
//                         isNullable: false
//                     },
//                     {
//                         name: "accentColor",
//                         type: "int",
//                         isNullable: false
//                     }
//                 ]
//             }),
//             true
//         );
//         await queryRunner.createIndex("BOT_Users", new TableIndex({
//             name: "PK_BotUsers_discordUserId",
//             columnNames: ["discordUserId"]
//         }))


//         // ***************************************
//         // * BOT_UserDetails
//         // ****************************************
//         await queryRunner.createTable(
//             new Table({
//                 name: "BOT_UserDetails",
//                 schema: "bot",
//                 columns: [
//                     {
//                         name: "discordUserId",
//                         type: "bigint",
//                         unsigned: true,
//                         isPrimary: true,
//                         isUnique: true,
//                         isNullable: false
//                     },
//                     {
//                         name: "switchFriendCode",
//                         type: "varchar",
//                         length: "20",
//                         isNullable: true
//                     },
//                     {
//                         name: "switchUsername",
//                         type: "varchar",
//                         length: "32",
//                         isNullable: true
//                     },
//                     {
//                         name: "twitchUsername",
//                         type: "varchar",
//                         length: "32",
//                         isNullable: true
//                     }
//                 ]
//             }),
//             true
//         );
//         await queryRunner.createIndex("BOT_UserDetails", new TableIndex({
//             name: "PK_BotUserDetails_discordUserId",
//             columnNames: ["discordUserId"]
//         }))

//         // ***************************************
//         // * BOT_GuildUsers
//         // ****************************************
//         await queryRunner.createTable(
//             new Table({
//                 name: "BOT_GuildUsers",
//                 schema: "bot",
//                 columns: [
//                     {
//                         name: "discordUserId",
//                         type: "bigint",
//                         unsigned: true,
//                         isPrimary: true,
//                         isUnique: true,
//                         isNullable: false
//                     },
//                     {
//                         name: "discordGuildId",
//                         type: "bigint",
//                         unsigned: true,
//                         isPrimary: true,
//                         isUnique: true,
//                         isNullable: false
//                     },
//                     {
//                         name: "joinedAt",
//                         type: "datetime",
//                         default: 'NOW()',
//                         isNullable: false
//                     },
//                     {
//                         name: "nickName",
//                         type: "varchar",
//                         length: "120",
//                         isNullable: true
//                     },
//                 ]
//             }),
//             true
//         );
//         await queryRunner.createIndex("BOT_GuildUsers", new TableIndex({
//             name: "PK_BotBuildUser_DiscordUserId_DiscordGuildId",
//             columnNames: ["discordUserId", "discordGuildId"]
//         }))

//         // ***************************************
//         // * Foreing Key
//         // * 1 BOT_UserDetails to 1 BOT_Users (1..1)    [discordUserId]
//         // * 1 BOT_GuildUsers to BOT_Users [discordUserId]
//         //          And to BOT_Guilds [discordGuildId]
//         // ***************************************
//         const fk_UserDetailsToUser = new TableForeignKey({
//             name: "FK_UserDetails_to_Users_discordUserId",
//             // Child Table Key
//             columnNames: ["discordUserId"],
//             // (referenced) Parent Table Key
//             referencedColumnNames: ["discordUserId"],
//             referencedTableName: "BOT_Users",
//             // Options
//             onDelete: "CASCADE",
//         });
//         await queryRunner.createForeignKey("BOT_UserDetails", fk_UserDetailsToUser);


//         const fk_GuildUserToUser = new TableForeignKey({
//             name: "FK_GuildUser_to_Users_discordUserId",
//             // Child Table Key
//             columnNames: ["discordUserId"],
//             // (referenced) Parent Table Key
//             referencedColumnNames: ["discordUserId"],
//             referencedTableName: "BOT_Users",
//             // Options
//             onDelete: "CASCADE",
//         });
//         await queryRunner.createForeignKey("BOT_GuildUsers", fk_GuildUserToUser);

//         const fk_GuildUserToGuild = new TableForeignKey({
//             name: "FK_GuildUser_to_Guild_discordGuildId",
//             // Child Table Key
//             columnNames: ["discordGuildId"],
//             // (referenced) Parent Table Key
//             referencedColumnNames: ["discordGuildId"],
//             referencedTableName: "BOT_Guilds",
//             // Options
//             onDelete: "CASCADE",
//         });
//         await queryRunner.createForeignKey("BOT_GuildUsers", fk_GuildUserToGuild);

//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.dropTable("BOT_GuildUsers", true, true, true);
//         await queryRunner.dropTable("BOT_UserDetails", true, true, true);
//         await queryRunner.dropTable("BOT_Users", true, true, true);
//     }

// }
