import { DataTypes, Model, Optional, literal } from 'sequelize'
// import sequelizeConnection from '../../config/config'
import sequelizeConnection from 'config/config'

interface BotGuilds_Attributes {
    discordGuildId: string;
    discordGuildName: string;
    discordGuildIconUrl?: string;

    discordGuildOwnerId?: string;
    discordPreferredLocale: string;
    discordRegion: string;
    isActive: boolean;

    joinedAt: Date;
    leftAt?: Date;
}

export interface BotGuilds_Input extends Optional<BotGuilds_Attributes, 'discordGuildId'> { }
export interface BotGuilds_Ouput extends Required<BotGuilds_Attributes> { }

// Class
class Bot_Guilds extends Model<BotGuilds_Attributes, BotGuilds_Input> implements BotGuilds_Attributes {
    public discordGuildId!: string;
    public discordGuildName!: string;
    public discordPreferredLocale!: string;
    public discordRegion!: string;
    public isActive!: boolean;

    // notMandatory
    public discordGuildIconUrl?: string | undefined;
    public discordGuildOwnerId?: string | undefined;


    // timestamps!
    public joinedAt!: Date;
    public leftAt!: Date | undefined;

    // public readonly createdAt!: Date;
}

Bot_Guilds.init({
    discordGuildId: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    discordGuildName: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    discordGuildIconUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    discordGuildOwnerId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
    },
    discordPreferredLocale: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    discordRegion: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },
    joinedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: literal('CURRENT_TIMESTAMP'),
    },
    leftAt: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: "BOT_Guilds",
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    sequelize: sequelizeConnection,
    // paranoid: true
})

export default Bot_Guilds