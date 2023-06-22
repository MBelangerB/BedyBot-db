// import { MigrationInterface, QueryRunner } from "typeorm"

// export class CreateRiotSummoner1687124847286 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(
//             `CREATE OR REPLACE TABLE "RIOT_Summoner" (
//                 id UUID PRIMARY KEY NOT NULL DEFAULT (UUID()), 
//                 riotId VARCHAR(63) UNIQUE KEY NOT NULL,
//                 riotAccountId VARCHAR(56) UNIQUE KEY NOT NULL,
//                 riotProfileIconId INT NULL,
//                 riotPuuid BINARY(36) NOT NULL, 
//                 riotSummonerName VARCHAR(255) NOT NULL,
//                 riotSummonerLevel INT NOT NULL,
//                 region VARCHAR(10) NOT NULL,
//                 expiredAPIKey BOOL NOT NULL DEFAULT 0,
//                 updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//             );`,
//         ) 
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(
//             `DROP TABLE "RIOT_Summoner";`,
//         ) 
//     }

// }
