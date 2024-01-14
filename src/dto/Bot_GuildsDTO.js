// // Typescript - INterface
// export class BOT_GuildsDTO {
//     guildId: null;


//     guildId: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         field: 'guildId',
//         primaryKey: true,
//         unique: true,
//         allowNull: false,
//     },
//     guildName: {
//         type: DataTypes.STRING(100),
//         field: 'guildName',
//         allowNull: false,
//     },
//     guildIconUrl: {
//         type: DataTypes.STRING,
//         field: 'guildIconUrl',
//         allowNull: true,
//     },
//     guildBannerUrl: {
//         type: DataTypes.STRING,
//         field: 'guildBannerUrl',
//         allowNull: true,
//     },
//     guildOwnerId: {
//         type: DataTypes.BIGINT.UNSIGNED,
//         field: 'guildOwnerId',
//         allowNull: false,
//     },
//     guildRegion: {
//         type: DataTypes.STRING(10),
//         field: 'guildRegion',
//         allowNull: true,
//     },
//     guildPreferredLocale: {
//         type: DataTypes.STRING(10),
//         field: 'guildPreferredLocale',
//         allowNull: true,
//     },
//     isActive: {
//         type: DataTypes.BOOLEAN,
//         field: 'isActive',
//         allowNull: false,
//         defaultValue: true,
//     },
//     joinedAt: {
//         type: DataTypes.DATE,
//         field: 'joinedAt',
//         allowNull: false,
//         defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
//     },
//     leftAt: {
//         type: DataTypes.DATE,
//         field: 'leftAt',
//         allowNull: true,
//     },
// }