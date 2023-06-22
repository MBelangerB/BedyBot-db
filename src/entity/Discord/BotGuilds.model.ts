import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn, RelationOptions } from "typeorm";
import { Bot_GuildOption } from "./BotGuildoptions.model";

// @Index("UQ_e90ba75c071d4a6f0b7d57d3cbb", ["discordGuildId"], { unique: true })
// @Index("PK_Guilds_discordGuildId", ["discordGuildId"], {unique: true})
@Entity({ name: "BOT_Guilds" })
export class Bot_Guilds {
  // @Column("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true })
  @PrimaryColumn("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true })
  discordGuildId: string;

  @Column("varchar", { name: "discordGuildName", length: 100 })
  discordGuildName: string;

  @Column("varchar", {
    name: "discordGuildIconUrl",
    nullable: true,
    length: 255,
  })
  discordGuildIconUrl: string | null;

  @Column("bigint", { name: "discordGuildOwnerId", unsigned: true })
  discordGuildOwnerId: string;

  @Column("tinyint", { name: "isActive", width: 1, default: () => "'1'" })
  isActive: boolean;

  // @Column("datetime", { name: "joinedAt", default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type:"datetime", name: "joinedAt" })
  joinedAt: Date;

  @Column("datetime", { name: "leftAt", nullable: true })
  leftAt: Date | null;

  @OneToOne(() => Bot_GuildOption, (option) => option.guild)
  // @OneToOne(() => Bot_GuildOption)
  // @JoinColumn()
  guildOption: Bot_GuildOption;
}
