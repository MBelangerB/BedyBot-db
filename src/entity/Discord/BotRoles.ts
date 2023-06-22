import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn, RelationOptions } from "typeorm";


@Entity({ name: "BOT_Guilds" })
export class BotRoles {
  @Column("bigint", { primary: true, name: "discordGuildId", unsigned: true })
  discordGuildId: string;

  @Column("bigint", { primary: true, name: "discordRoleId", unsigned: true })
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

  @Column("datetime", { name: "lastUpdate", nullable: true })
  lastUpdate: Date | null;
}
