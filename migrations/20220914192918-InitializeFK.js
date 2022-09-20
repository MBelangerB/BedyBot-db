'use strict';

module.exports = {
  /* eslint-disable-next-line no-unused-vars */
  up: async (queryInterface, DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    /* eslint-disable-next-line no-unused-vars */

    /* BOT SECTION */
    // await queryInterface.addConstraint('BOT_Channels', {
    //   fields: ['parentId'],
    //   type: 'foreign key',
    //   name: 'Channels_parentId_fkey',
    //   references: {
    //     table: 'BOT_Channels',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_Channels', {
    //   fields: ['sessionId'],
    //   type: 'foreign key',
    //   name: 'Channels_sessionId_fkey',
    //   references: {
    //     table: 'BOT_Sessions',
    //     field: 'id',
    //   },
    //   onUpdate: 'CASCADE',
    //   onDelete: 'set NULL',
    // });

    // await queryInterface.addConstraint('BOT_GuildOptions', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'GuildOptions_guildId_fkey',
    //   references: {
    //     table: 'BOT_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_GuildUsers', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'GuildUsers_guildId_fkey',
    //   references: {
    //     table: 'BOT_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_GuildUsers', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'GuildUsers_userId_fkey',
    //   references: {
    //     table: 'BOT_Users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_Roles', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'Roles_guildId_fkey',
    //   references: {
    //     table: 'BOT_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_Sessions', {
    //   fields: ['tournamentId'],
    //   type: 'foreign key',
    //   name: 'Sessions_tournamentId_fkey',
    //   references: {
    //     table: 'BOT_Tournaments',
    //     field: 'id',
    //   },
    //   onDelete: 'Set NULL',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_Tournaments', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'Tournaments_guildId_fkey',
    //   references: {
    //     table: 'BOT_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'set NULL',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_Tournaments', {
    //   fields: ['ownerId'],
    //   type: 'foreign key',
    //   name: 'Tournaments_ownerId_fkey',
    //   references: {
    //     table: 'BOT_Users',
    //     field: 'id',
    //   },
    //   onDelete: 'set NULL',
    // });


    // await queryInterface.addConstraint('BOT_UserSessions', {
    //   fields: ['sessionId'],
    //   type: 'foreign key',
    //   name: 'UserSessions_sessionId_fkey',
    //   references: {
    //     table: 'BOT_Sessions',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_UserSessions', {
    //   fields: ['userId'],
    //   type: 'foreign key',
    //   name: 'UserSessions_userId_fkey',
    //   references: {
    //     table: 'BOT_Users',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_UserSessions', {
    //   fields: ['voiceChannelId'],
    //   type: 'foreign key',
    //   name: 'UserSessions_voiceChannelId_fkey',
    //   references: {
    //     table: 'BOT_Channels',
    //     field: 'id',
    //   },
    //   onDelete: 'Set NULL',
    //   onUpdate: 'CASCADE',
    // });

    // await queryInterface.addConstraint('BOT_UserSessions', {
    //   fields: ['textChannelId'],
    //   type: 'foreign key',
    //   name: 'UserSessions_textChannelId_fkey',
    //   references: {
    //     table: 'BOT_Channels',
    //     field: 'id',
    //   },
    //   onDelete: 'Set NULL',
    //   onUpdate: 'CASCADE',
    // });

    /* *************************************** */
    /*              API SECTION               */
    /* ************************************** */
    await queryInterface.addConstraint('API_Tokens', {
      fields: ['apiUserId'],
      type: 'foreign key',
      name: 'Tokens_externalId_fkey',
      references: {
        table: 'API_Users',
        field: 'externalId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('API_Tokens', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'Tokens_guildId_fkey',
      references: {
        table: 'API_Guilds',
        field: 'guildId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('API_GuildUserPermissions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'GuildUserPermissions_userId_fkey',
      references: {
        table: 'API_Users',
        field: 'externalId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('API_GuildUserPermissions', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildUserPermissions_guildId_fkey',
      references: {
        table: 'API_Guilds',
        field: 'guildId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('API_GuildRoles', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildRoles_guildId_fkey',
      references: {
        table: 'API_Guilds',
        field: 'guildId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    /* API Section */
    await queryInterface.removeConstraint('API_Tokens', 'Tokens_externalId_fkey');
    await queryInterface.removeConstraint('API_Tokens', 'Tokens_guildId_fkey');

    await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_userId_fkey');
    await queryInterface.removeConstraint('API_GuildUserPermissions', 'GuildUserPermissions_guildId_fkey');
    await queryInterface.removeConstraint('API_GuildRoles', 'GuildRoles_guildId_fkey');

    /* Bot Section */
    // await queryInterface.removeConstraint('BOT_GuildOptions', 'GuildOptions_guildId_fkey');
    // await queryInterface.removeConstraint('BOT_Channels', 'Channels_parentId_fkey');
    // await queryInterface.removeConstraint('BOT_Channels', 'Channels_sessionId_fkey');
    // await queryInterface.removeConstraint('BOT_Roles', 'Roles_guildId_fkey');
    // await queryInterface.removeConstraint('BOT_GuildUsers', 'GuildUsers_guildId_fkey');
    // await queryInterface.removeConstraint('BOT_GuildUsers', 'GuildUsers_userId_fkey');

    // await queryInterface.removeConstraint('BOT_Tournaments', 'Tournaments_guildId_fkey');
    // await queryInterface.removeConstraint('BOT_Tournaments', 'Tournaments_ownerId_fkey');
    // await queryInterface.removeConstraint('BOT_Sessions', 'Sessions_tournamentId_fkey');
    // await queryInterface.removeConstraint('BOT_UserSessions', 'UserSessions_sessionId_fkey');
    // await queryInterface.removeConstraint('BOT_UserSessions', 'UserSessions_userId_fkey');

    // await queryInterface.removeConstraint('BOT_UserSessions', 'UserSessions_voiceChannelId_fkey');
    // await queryInterface.removeConstraint('BOT_UserSessions', 'UserSessions_textChannelId_fkey');
  },
};
