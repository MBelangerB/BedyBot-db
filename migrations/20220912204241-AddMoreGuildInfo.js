'use strict';


const Sequelize = require('sequelize');

module.exports = {
  up: async (queryInterface, DateTypes) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('API_Guilds', 'ownerId', // new field name
      {
        type: DateTypes.STRING,
        allowNull: true,
      },
    );
    await queryInterface.addColumn('API_Guilds', 'region', // new field name
      {
        type: DateTypes.STRING,
        allowNull: true,
      },
    );
    await queryInterface.addColumn('API_Guilds', 'preferred_locale', // new field name
      {
        type: DateTypes.STRING,
        allowNull: true,
      },
    );

    await queryInterface.addColumn('API_Tokens', 'scope',
      {
        type: DateTypes.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn('API_Tokens', 'expireAt',
      {
        type: DateTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    );
    await queryInterface.addColumn('API_Tokens', 'guildId',
      {
        type: DateTypes.STRING,
        allowNull: true,
      },
    );


    await queryInterface.createTable('API_GuildRoles', {
      id: {
        type: DataTypes.STRING,
        field: 'id',
        allowNull: false,
      },
      guildId: {
        type: DataTypes.STRING,
        field: 'guildId',
        allowNull: false,
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
      ts: {
        type: DataTypes.DATE,
        field: 'ts',
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('API_GuildRoles', {
      fields: ['guildId'],
      type: 'foreign key',
      name: 'GuildRoles_guildId_fkey',
      references: {
        table: 'API_Guilds',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });


  },

  /* eslint-disable-next-line no-unused-vars */
  down: async (queryInterface, DateTypes) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.removeConstraint('API_GuildRoles', 'GuildRoles_guildId_fkey');
     await queryInterface.dropTable('API_GuildRoles');

    await queryInterface.removeColumn('API_Tokens', 'scope');
    await queryInterface.removeColumn('API_Tokens', 'expireAt');
    await queryInterface.removeColumn('API_Tokens', 'guildId');

    await queryInterface.removeColumn('API_Guilds', 'ownerId');
    await queryInterface.removeColumn('API_Guilds', 'region');
    await queryInterface.removeColumn('API_Guilds', 'preferred_locale');
  }
};
