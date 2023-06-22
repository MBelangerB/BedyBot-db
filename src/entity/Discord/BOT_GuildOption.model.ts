import { Column, Entity, Index, JoinColumn, JoinTable, OneToOne, PrimaryColumn } from "typeorm";
import { Bot_Guilds } from "./BOT_Guilds.model";

@Entity({ name: "BOT_GuildOption" })
export class Bot_GuildOption {

  @PrimaryColumn("bigint", { primary: true, name: "discordGuildId", unsigned: true, unique: true })
  discordGuildId: string;
  
  @Column("bigint", { name: "discordAnnoucementChannelId", unsigned: true, nullable:true })
  discordAnnoucementChannelId: string;

  @Column("int", { name: "maxPlayerByLobby", default: () => "'12'", nullable:false })
  maxPlayerByLobby: number;

  @Column("tinyint", { name: "tagEveryone", width: 1, default: () => "'0'", nullable:false })
  tagEveryone: boolean;

  @OneToOne(() => Bot_Guilds, (option) => option.guildOption)
  @JoinColumn({name: "discordGuildId", referencedColumnName: "discordGuildId"})
  guild: Bot_Guilds;
}
