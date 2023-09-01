'use strict';

const Sequelize = require('sequelize');
// const { BedyAPIConst } = require('../BedyAPIConst');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    name: 'InitialCreate_TournamentModules',

    async up(queryInterface, DataTypes) {
        return queryInterface.sequelize.transaction(async (t) => {

            // ******************************************
            // MOD_Tournament
            // ******************************************
            await queryInterface.createTable('MOD_Tournaments', {
                tournamentId: {
                    type: DataTypes.UUID,
                    field: 'tournamentId',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                guildId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    field: 'guildId',
                    allowNull: true,
                    references: {
                        model: 'BOT_Guilds', // This is a reference to another model
                        key: 'guildId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                },
                ownerId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    field: 'ownerId',
                    allowNull: false,
                    references: {
                        model: 'BOT_Users', // This is a reference to another model
                        key: 'userId', // This is the column name of the referenced model
                        onDelete: 'set NULL',
                        onUpdate: 'CASCADE',
                    },
                },
                // announcementChannelId: {
                //     type: Sequelize.BIGINT.UNSIGNED,
                //     field: 'announcementChannelId',
                //     allowNull: false,
                // },
                announcementMessageId: {
                    type: Sequelize.BIGINT.UNSIGNED,
                    field: 'messageId',
                    allowNull: false,
                },
                startDateTime: {
                    type: DataTypes.DATE,
                    field: 'startDateTime',
                    allowNull: false,
                },
                sessionCount: {
                    type: DataTypes.INTEGER,
                    field: 'sessionCount',
                    allowNull: false,
                },
                status: {
                    type: DataTypes.INTEGER,
                    field: 'status',
                    allowNull: false,
                },
                createAt: {
                    allowNull: false,
                    type: DataTypes.DATE,
                    field: 'createAt',
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            }, {
                transaction: t,
                comment: 'List of tournament.',
            });

            // ******************************************
            // MOD_TournamentSessions
            // ******************************************
            await queryInterface.createTable('MOD_TournamentSessions', {
                sessionId: {
                    type: DataTypes.UUID,
                    field: 'sessionId',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                tournamentId: {
                    type: DataTypes.UUID,
                    field: 'tournamentId',
                    allowNull: false,
                    primaryKey: true,
                    defaultValue: Sequelize.UUIDV4,
                    references: {
                        model: 'MOD_Tournaments', // This is a reference to another model
                        key: 'tournamentId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                },
                sessionNumber: {
                    type: DataTypes.INTEGER,
                    field: 'sessionNumber',
                    allowNull: false,
                },
                sessionDuration: {
                    type: DataTypes.INTEGER,
                    field: 'sessionDuration',
                    allowNull: false,
                },
                startDateTime: {
                    type: DataTypes.DATE,
                    field: 'startDateTime',
                    allowNull: false,
                },
                status: {
                    // Valeur jamais modifié lors du close ?
                    type: DataTypes.INTEGER,
                    field: 'status',
                    allowNull: false,
                    defaultValue: 1,
                },
            }, {
                transaction: t,
                comment: 'List of tournament session',
            });

            // ******************************************
            // MOD_SessionUserRegistration
            // ******************************************
            await queryInterface.createTable('MOD_SessionUserRegistrations', {
                sessionId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    primaryKey: true,
                    unique: true,
                    field: 'sessionId',
                    references: {
                        model: 'MOD_TournamentSessions', // This is a reference to another model
                        key: 'sessionId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                },
                userId: {
                    allowNull: false,
                    primaryKey: true,
                    type: Sequelize.BIGINT.UNSIGNED,
                    field: 'userId',
                    references: {
                        model: 'BOT_Users', // This is a reference to another model
                        key: 'userId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                },
                // voiceChannelId: {
                //     allowNull: true,
                //     type: Sequelize.BIGINT.UNSIGNED,
                //     field: 'voiceChannelId',
                //     // references: {
                //     //     model: sequelize.models.BOT_Channels,
                //     //     key: 'id',
                //     // },
                // },
                // textChannelId: {
                //     allowNull: true,
                //     type: Sequelize.BIGINT.UNSIGNED,
                //     field: 'textChannelId',
                //     // references: {
                //     //     model: sequelize.models.BOT_Channels,
                //     //     key: 'id',
                //     // },
                // },
                ts: {
                    type: DataTypes.DATE,
                    field: 'ts',
                    allowNull: false,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                },
            }, {
                transaction: t,
                comment: 'List of users who are register on a Session.',
            });

            // ******************************************
            // MOD_SessionChannel
            // ******************************************
            await queryInterface.createTable('MOD_SessionChannels', {
                sessionChannelId: {
                    type: DataTypes.UUID,
                    field: 'sessionChannelId',
                    primaryKey: true,
                    unique: true,
                    allowNull: false,
                    defaultValue: Sequelize.UUIDV4,
                },
                sessionId: {
                    type: DataTypes.UUID,
                    allowNull: false,
                    // primaryKey: true,
                    field: 'sessionId',
                    references: {
                        model: 'MOD_TournamentSessions', // This is a reference to another model
                        key: 'sessionId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    }
                },
                channelId: {
                    allowNull: false,
                    // primaryKey: true,
                    type: Sequelize.BIGINT.UNSIGNED,
                    field: 'channelId',
                    references: {
                        model: 'BOT_Channels', // This is a reference to another model
                        key: 'channelId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                },
                parentId: {
                    type: DataTypes.UUID,
                    field: 'parentId',
                    allowNull: true,
                    references: {
                        model: 'MOD_SessionChannels', // This is a reference to another model
                        key: 'sessionChannelId', // This is the column name of the referenced model
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                },
                channelType: {
                    type: DataTypes.INTEGER,
                    field: 'channelType',
                    allowNull: false,
                },
            }, {
                transaction: t,
                comment: 'List of discord channels for each session.',
            });

        }); // End transaction

    },

    /* eslint-disable-next-line no-unused-vars */
    async down(queryInterface, DataTypes) {
        await queryInterface.dropTable('MOD_SessionChannels');
        await queryInterface.dropTable('MOD_SessionUserRegistrations');
        await queryInterface.dropTable('MOD_TournamentSessions');
        await queryInterface.dropTable('MOD_Tournaments');
    },
};
