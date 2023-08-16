import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Si Number fonctionne pas, librairie big-integer
interface BOT_GuildOptionsAttributes {
    guildId: number;
    announcementChannelId?: number | null;
    maxPlayerPerLobby?: number | null;
    addEveryone: boolean;
}

@Table({ tableName: 'BOT_GuildOptions' })
export class BOT_GuildOptions extends Model<BOT_GuildOptionsAttributes> implements BOT_GuildOptionsAttributes {
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        field: 'guildId',
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    guildId!: number;

    @Column({
      type: DataType.BIGINT.UNSIGNED,
      field: 'announcementChannelId',
      allowNull: true,
    })
    announcementChannelId?: number | null;
 
    @Column({
      type: DataType.INTEGER,
      field: 'maxPlayerPerLobby',
      allowNull: false,
      defaultValue: 12,
    })
    public maxPlayerPerLobby?: number | null;

  
    @Column({
        type: DataType.BOOLEAN,
        field: 'addEveryone',
        defaultValue: false,
        allowNull: true
    })
    public addEveryone!: boolean;

    static associate: (models: any) => void;
}

BOT_GuildOptions.associate = (models: any): void => {
  BOT_GuildOptions.belongsTo(models.BOT_Guilds, {
    foreignKey: 'guildId', // Set FK name on SOURCE
    targetKey: 'guildId', // Key name on TARGET
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
}
/*
    belongTo    -> 1..1     (inverse direction hasOne)
    hasOne      -> 1..1

    BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
    HasOne associations are associations where the foreign key for the one-to-one relation exists on the target model.

    Man has only one right arm (hasOne)
    Right arm belongs to one man (belongTo)
 */