import { Column, Entity, Index } from "typeorm";

@Index("UQ_950114630278904d9ca917e14f6", ["discordUserId"], { unique: true })
@Index("UQ_ba6b68c0a7cdd0e5aecd86d8df7", ["discordGuildId"], { unique: true })
@Index(
  "PK_BotBuildUser_DiscordUserId_DiscordGuildId",
  ["discordUserId", "discordGuildId"],
  {}
)
@Entity("bot_guildusers")
export class BotGuildusers {
  @Column("bigint", { primary: true, name: "discordUserId", unsigned: true })
  discordUserId: string;

  @Column("bigint", { primary: true, name: "discordGuildId", unsigned: true })
  discordGuildId: string;

  @Column("datetime", { name: "joinedAt", default: () => "CURRENT_TIMESTAMP" })
  joinedAt: Date;

  @Column("varchar", { name: "nickName", nullable: true, length: 120 })
  nickName: string | null;
}
