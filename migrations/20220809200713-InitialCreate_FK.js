'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     *
     * Add Column:
     * await queryInterface.addColumn('users', // table name
        'twitter', // new field name
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
     */

    // FK
    await queryInterface.addConstraint('Channels', {
      fields: ['parentId'],
      type: 'foreign key',
      name: 'Channels_parentId_fkey',
      references: {
        table: 'Channels',
        field: 'id',
      },
      // onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Channels', {
      fields: ['sessionId'],
      type: 'foreign key',
      name: 'Channels_sessionId_fkey',
      references: {
        table: 'Sessions',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'set NULL',
    });

    await queryInterface.addConstraint('GuildOptions', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildOptions_guildId_fkey',
      references: {
        table: 'Guilds',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('Tournaments', {
      fields: ['ownerId'],
      type: 'foreign key',
      name: 'Tournaments_ownerId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'set NULL',
    });

    await queryInterface.addConstraint('Sessions', {
      fields: ['tournamentId'],
      type: 'foreign key',
      name: 'Sessions_tournamentId_fkey',
      references: {
        table: 'Tournaments',
        field: 'id',
      },
      onDelete: 'Set NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('UserSessions', {
      fields: ['sessionId'],
      type: 'foreign key',
      name: 'UserSessions_sessionId_fkey',
      references: {
        table: 'Sessions',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('UserSessions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'UserSessions_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('UserSessions', {
      fields: ['sessionId'],
      type: 'foreign key',
      name: 'UserSessions_sessionId_fkey',
      references: {
        table: 'Sessions',
        field: 'id',
      },
    });

    await queryInterface.addConstraint('UserSessions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'UserSessions_userId_fkey',
      references: {
        table: 'Users',
        field: 'id',
      },
    });


  },

  async down(queryInterface) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * await queryInterface.removeColumn('users', 'linkedin'),
     */
    // FK
    await queryInterface.removeConstraint('Channels', 'Channels_parentId_fkey');
    await queryInterface.removeConstraint('Channels', 'Channels_sessionId_fkey');
    await queryInterface.removeConstraint('GuildOptions', 'GuildOptions_guildId_fkey');
    await queryInterface.removeConstraint('Tournaments', 'Tournaments_ownerId_fkey');
    await queryInterface.removeConstraint('Sessions', 'Sessions_tournamentId_fkey');
    await queryInterface.removeConstraint('UserSessions', 'UserSessions_sessionId_fkey');
    await queryInterface.removeConstraint('UserSessions', 'UserSessions_userId_fkey');
    await queryInterface.removeConstraint('UserSessions', 'UserSessions_sessionsId_fkey');
    await queryInterface.removeConstraint('UserSessions', 'UserSessions_usersId_fkey');
  },
};
