import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

// https://typeorm.io/entities#column-types-for-mysql--mariadb
@Entity({ name: "RIOT_Summoner" }) // , schema: "riot" 
export class RIOT_Summoner {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 63, unique: true, nullable: false })
    riotId: string;

    @Column({ type: "varchar", length: 56, unique: true, nullable: false })
    riotAccountId: string;

    @Column({ nullable: true })
    riotProfileIconId: number;

    @Column({ type: "uuid", nullable: false })
    riotPuuid: UUID; // uuid

    @Column({ nullable: false })
    riotSummonerName: string;

    @Column({ nullable: false })
    riotSummonerLevel: number;

    @Column({ type: 'varchar', length: 10, nullable: false })
    region: string;

    @Column({ nullable: false, default: false})
    expiredAPIKey: boolean;

    @Column({ type:"datetime" })
    updateAt: Date;
}

// export default RIOT_Summoner;
/*
CREATE OR REPLACE TABLE RIOT_Summoner (
	id UUID PRIMARY KEY NOT NULL DEFAULT (UUID()), 
	riotId VARCHAR(63) UNIQUE KEY NOT NULL,
	riotAccountId VARCHAR(56) UNIQUE KEY NOT NULL,
	riotProfileIconId INT NULL,
	riotPuuid BINARY(36) NOT NULL, 
	riotSummonerName VARCHAR(255) NOT NULL,
	riotSummonerLevel INT NOT NULL,
	region VARCHAR(10) NOT NULL,
	expiredAPIKey BOOL NOT NULL DEFAULT 0,
	updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

*/