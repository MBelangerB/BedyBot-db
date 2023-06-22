import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn, RelationOptions, UpdateDateColumn } from "typeorm";
import { Bot_Guilds } from "./BOT_Guilds.model";

@Entity({ name: "BOT_Roles" })
export class BotRoles {
    @PrimaryColumn("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true, nullable: false })
    discordGuildId: string;

    @PrimaryColumn("bigint", { primary: true, name: "discordRoleId", unsigned: true, unique: true, nullable: false })
    discordRoleId: string;

    @Column("varchar", { name: "discordRoleName", length: 120 })
    discordRoleName: string;

    @Column("int", {
        name: "discordRoleColor",
        comment: "integer representation of hexadecimal color code",
    })
    discordRoleColor: number;

    @Column("varchar", { name: "permissionLevel", length: 255 })
    permissionLevel: string;

    @Column("tinyint", { name: "position" })
    position: number;

    @Column("tinyint", { name: "type" })
    type: number;

    @UpdateDateColumn({ type: "datetime", name: "lastUpdate", nullable: false })
    lastUpdate: Date;

    @OneToOne(() => Bot_Guilds, (option) => option.guildOption)
    @JoinColumn({name: "discordGuildId", referencedColumnName: "discordGuildId"})
    guild: Bot_Guilds;
}
