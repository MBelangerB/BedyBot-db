import { Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn, RelationOptions } from "typeorm";
import { Bot_GuildOption } from "./Bot_GuildOption.model";

@Entity({ name: "BOT_Guilds" })
export class Bot_Guilds {
  @PrimaryColumn("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true, nullable: false })
  discordGuildId: string;

  @Column("varchar", { name: "discordGuildName", length: 100, nullable:false })
  discordGuildName: string;

  @Column("varchar", {
    name: "discordGuildIconUrl",
    nullable: true,
    length: 255,
  })
  discordGuildIconUrl: string | null;

  @Column("bigint", { name: "discordGuildOwnerId", unsigned: true, nullable: false })
  discordGuildOwnerId: string;

  @Column("varchar", { name: "discordPreferredLocale", length: 10, nullable: true })
  discordPreferredLocale: string;

  @Column("varchar", { name: "discordRegion", length: 10, nullable: true })
  discordRegion: string;

  @Column("tinyint", { name: "isActive", width: 1, default: () => "'1'" })
  isActive: boolean;

  // @Column("datetime", { name: "joinedAt", default: () => "CURRENT_TIMESTAMP" })
  @CreateDateColumn({ type:"datetime", name: "joinedAt" })
  joinedAt: Date;

  @Column("datetime", { name: "leftAt", nullable: true })
  leftAt: Date | null;

  @OneToOne(() => Bot_GuildOption, (option) => option.guild)
  guildOption: Bot_GuildOption;
}
