import { Column, Entity, Index } from "typeorm";

@Index("UQ_7c4141bcbc1018d14b185deef29", ["discordUserId"], { unique: true })
@Index("PK_BotUsers_discordUserId", ["discordUserId"], {})
@Entity("bot_users")
export class BotUsers {
  @Column("bigint", { primary: true, name: "discordUserId", unsigned: true })
  discordUserId: string;

  @Column("varchar", { name: "username", length: 32 })
  username: string;

  @Column("varchar", { name: "globalUsername", nullable: true, length: 255 })
  globalUsername: string | null;

  @Column("varchar", { name: "discriminator", nullable: true, length: 10 })
  discriminator: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "avatar", length: 255 })
  avatar: string;

  @Column("varchar", { name: "banner", length: 255 })
  banner: string;

  @Column("varchar", { name: "bannerColor", length: 255 })
  bannerColor: string;

  @Column("int", { name: "accentColor" })
  accentColor: number;
}
