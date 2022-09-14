'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.addConstraint('BOT_GuildOptions', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildOptions_guildId_fkey',
      references: {
        table: 'BOT_Guilds',
        field: 'guildId',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

     await queryInterface.addConstraint('BOT_Channels', {
      fields: ['parentId'],
      type: 'foreign key',
      name: 'Channels_parentId_fkey',
      references: {
        table: 'BOT_Channels',
        field: 'id',
      },
      // onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('BOT_Channels', {
      fields: ['sessionId'],
      type: 'foreign key',
      name: 'Channels_sessionId_fkey',
      references: {
        table: 'BOT_Sessions',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'set NULL',
    });
  }
};
