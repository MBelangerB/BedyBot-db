'use strict';


const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, DataTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('API_GuildRoles', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        field: 'id',
        allowNull: false,
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
        // references: {
        //   model: 'API_Guilds',
        //   key: 'guildId',
        //   onDelete: 'CASCADE',
        //   onUpdate: 'CASCADE',
        // },
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
        allowNull: false,
      },
      permissions: {
        type: DataTypes.STRING,
        field: 'permissions',
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        field: 'position',
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        field: 'color',
        allowNull: false,
      },
      lastUpdate: {
        type: DataTypes.DATE,
        field: 'lastUpdate',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addIndex('API_GuildRoles', ['guildId']);

    // await queryInterface.addConstraint('API_GuildRoles', {
    //   fields: ['guildId'],
    //   type: 'foreign key',
    //   name: 'GuildRoles_guildId_fkey',
    //   references: {
    //     table: 'API_Guilds',
    //     field: 'id',
    //   },
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });


  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DataTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //  await queryInterface.removeConstraint('API_GuildRoles', 'GuildRoles_guildId_fkey');
    await queryInterface.removeIndex('API_GuildRoles', ['guildId']);
    await queryInterface.dropTable('API_GuildRoles');

    // await queryInterface.removeColumn('API_Tokens', 'scope');
    // await queryInterface.removeColumn('API_Tokens', 'expireAt');
    // await queryInterface.removeColumn('API_Tokens', 'guildId');

    // await queryInterface.removeColumn('API_Guilds', 'ownerId');
    // await queryInterface.removeColumn('API_Guilds', 'region');
    // await queryInterface.removeColumn('API_Guilds', 'preferred_locale');
  },
};
