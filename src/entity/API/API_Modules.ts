import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { UUID } from "typeorm/driver/mongodb/bson.typings"

// https://typeorm.io/entities#column-types-for-mysql--mariadb
@Entity({ name: "API_Modules" }) // , schema: "riot" 
export class API_Modules {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @Column({ nullable: false, default: false})
    isEnabled: boolean;

    @Column({ nullable: false, default: false})
    isPremium: boolean;
}

// export default RIOT_Summoner;
/*
CREATE OR REPLACE TABLE `API_Modules` (
`id` UUID NOT NULL PRIMARY KEY DEFAULT (UUID()), 
`name` VARCHAR(255) NOT NULL, 
`isEnabled` INTEGER NOT NULL DEFAULT 1, 
`isPremium` INTEGER NOT NULL DEFAULT 0
);


CREATE UNIQUE INDEX `PK_api_modules_id` ON `API_Modules` (`id`);

OR


CREATE OR REPLACE TABLE `API_Modules` (
`id` UUID NOT NULL DEFAULT (UUID()), 
`name` varchar(255) NOT NULL, 
`isEnabled` boolean NOT NULL DEFAULT false, 
`isPremium` boolean NOT NULL DEFAULT false, 
CONSTRAINT `PK_ApiModules_id` PRIMARY KEY (`id`)
) ENGINE=InnoDB

*/