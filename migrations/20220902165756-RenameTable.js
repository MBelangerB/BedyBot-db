'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.renameTable('Channels', 'MK_Channels');
     queryInterface.renameTable('Guilds', 'MK_Guilds');
     queryInterface.renameTable('Roles', 'MK_Roles');
     queryInterface.renameTable('Users', 'MK_Users');
     queryInterface.renameTable('GuildOptions', 'MK_GuildOptions');
     queryInterface.renameTable('Tournaments', 'MK_Tournaments');
     queryInterface.renameTable('Sessions', 'MK_Sessions');
     queryInterface.renameTable('UserSessions', 'MK_UserSessions');
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.renameTable('MK_Channels', 'Channels');
     queryInterface.renameTable('MK_Guilds', 'Guilds');
     queryInterface.renameTable('MK_Roles', 'Roles');
     queryInterface.renameTable('MK_Users', 'Users');
     queryInterface.renameTable('MK_GuildOptions', 'GuildOptions');
     queryInterface.renameTable('MK_Tournaments', 'Tournaments');
     queryInterface.renameTable('MK_Sessions', 'Sessions');
     queryInterface.renameTable('MK_UserSessions', 'UserSessions');
  }
};
