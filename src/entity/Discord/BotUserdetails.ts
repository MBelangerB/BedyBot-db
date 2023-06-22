import { Column, Entity, Index } from "typeorm";

@Index("UQ_6e5490826425ff5698068d79f39", ["discordUserId"], { unique: true })
@Index("PK_BotUserDetails_discordUserId", ["discordUserId"], {})
@Entity("bot_userdetails")
export class BotUserdetails {
  @Column("bigint", { primary: true, name: "discordUserId", unsigned: true })
  discordUserId: string;

  @Column("varchar", { name: "switchFriendCode", nullable: true, length: 20 })
  switchFriendCode: string | null;

  @Column("varchar", { name: "switchUsername", nullable: true, length: 32 })
  switchUsername: string | null;

  @Column("varchar", { name: "twitchUsername", nullable: true, length: 32 })
  twitchUsername: string | null;
}
