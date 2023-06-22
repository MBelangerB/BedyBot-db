import { Column, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";
import { Bot_Guilds } from "./BotGuilds.model";

// @Index("UQ_afff0aa76c6625658dba762ac08", ["discordGuildId"], { unique: true })
// @Index("PK_GuildOptions_discordGuildId", ["discordGuildId"], {unique: true})
@Entity({ name: "BOT_GuildOption" })
export class Bot_GuildOption {
  // @Column("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true })
  @PrimaryColumn("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true })
  discordGuildId: string;

  // @OneToOne((type) => BotGuilds, (option) => option.guildOption)
  // @JoinTable()
  // @OneToOne(() => BotGuilds, (option) => option.guildOption)
  // @JoinColumn()
  // discordGuild: BotGuilds;
  
  @Column("bigint", { name: "discordAnnoucementChannelId", unsigned: true })
  discordAnnoucementChannelId: string;

  @Column("int", { name: "maxPlayerByLobby", default: () => "'12'" })
  maxPlayerByLobby: number;

  @Column("tinyint", { name: "tagEveryone", width: 1, default: () => "'0'" })
  tagEveryone: boolean;

  // @OneToOne(() => Bot_Guilds)
  @OneToOne(() => Bot_Guilds, (option) => option.guildOption)
  @JoinColumn({name: "discordGuildId", referencedColumnName: "discordGuildId"})
  guild: Bot_Guilds;


}
