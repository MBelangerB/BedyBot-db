import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { literal } from 'sequelize';

// Si Number fonctionne pas, librairie big-integer
interface BOT_GuildsAttributes {
    guildId: number;
    guildName: string;
    guildIconUrl?: string | null;
    guildBannerUrl?: string | null;
    guildOwnerId: number;
    guildRegion?: string | null;
    guildPreferredLocale?: string | null;
    isActive: boolean;
    joinedAt: Date;
    leftAt?: Date | null;
}

@Table({ tableName: 'BOT_Guilds' })
export class BOT_Guilds extends Model<BOT_GuildsAttributes> implements BOT_GuildsAttributes {
    @Column({
        type: DataType.BIGINT.UNSIGNED,
        field: 'guildId',
        primaryKey: true,
        unique: true,
        allowNull: false,
    })
    guildId!: number;

    @Column({
        type: DataType.STRING(100),
        field: 'guildName',
        allowNull: false,
    })
    public guildName!: string;

    @Column({
        type: DataType.STRING,
        field: 'guildIconUrl',
        allowNull: true,
    })
    public guildIconUrl?: string | null | undefined;

    @Column({
        type: DataType.STRING,
        field: 'guildBannerUrl',
        allowNull: true,
    })
    public guildBannerUrl?: string | null | undefined;

    @Column({
        type: DataType.BIGINT.UNSIGNED,
        field: 'guildOwnerId',
        allowNull: false,
    })
    public guildOwnerId!: number;

    @Column({
        type: DataType.STRING(10),
        field: 'guildRegion',
        allowNull: true,
    })
    public guildRegion?: string | null | undefined;

    @Column({
        type: DataType.STRING(10),
        field: 'guildPreferredLocale',
        allowNull: true,
    })
    public guildPreferredLocale?: string | null | undefined;

    @Column({
        type: DataType.BOOLEAN,
        field: 'isActive',
        allowNull: false,
        defaultValue: true,
    })
    public isActive!: boolean;

    @Column({
        type: DataType.DATE,
        field: 'joinedAt',
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    })
    public joinedAt!: Date;

    @Column({
        type: DataType.DATE,
        field: 'leftAt',
        allowNull: true,
    })
    public leftAt?: Date | null | undefined;


    static associate: (models: any) => void;
}

BOT_Guilds.associate = (models: any): void => {
    BOT_Guilds.hasOne(models.BOT_GuildOptions, {
        foreignKey: 'guildId', // Set FK name on TARGET
        sourceKey: 'guildId', // Source Key In SOURCE
        onDelete: 'CASCADE',
    });

    // BOT_Guilds.hasMany(models.BOT_GuildUser, {
    //     foreignKey: 'guildId', // Set FK name on TARGET
    //     sourceKey: 'guildId', // Source Key In SOURCE
    //     onDelete: 'CASCADE',
    // });

    // BOT_Guilds.hasMany(models.BOT_Roles, {
    //     foreignKey: 'guildId', // Set FK name on TARGET
    //     sourceKey: 'guildId', // Source Key In SOURCE
    //     onDelete: 'CASCADE',
    // });

    // BOT_Guilds.hasMany(models.API_GuildModules, {
    //     foreignKey: 'guildId', // Set FK name on TARGET
    //     sourceKey: 'guildId', // Source Key In SOURCE
    //     onDelete: 'CASCADE',
    // });

    // BOT_Guilds.hasMany(models.API_GuildCommands, {
    //     foreignKey: 'guildId', // Set FK name on TARGET
    //     sourceKey: 'guildId', // Source Key In SOURCE
    //     onDelete: 'CASCADE',
    // });

    // // BOT_Guilds.hasMany(models.BOT_Tournaments, {
    // //     foreignKey: 'guildId', // Set FK name on TARGET
    // //     sourceKey: 'id', // Source Key In SOURCE
    // //     onDelete: 'CASCADE',
    // // });  
}