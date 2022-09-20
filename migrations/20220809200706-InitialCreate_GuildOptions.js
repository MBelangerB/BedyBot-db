'use strict';

/*
  Create a new migration : npx sequelize-cli migration:generate --name ${NAME}
*/
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('BOT_GuildOptions', {
      id: {
        type: DataTypes.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      guildId: {
        type: DataTypes.INTEGER,
        field: 'guildId',
        allowNull: false,
        references: {
          model: 'BOT_Guilds', // This is a reference to another model
          key: 'id', // This is the column name of the referenced model
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      announcementChannelId: {
        type: DataTypes.STRING(80),
        field: 'announcementChannelId',
        allowNull: true,
      },
      maxPlayerPerLobby: {
        type: DataTypes.INTEGER,
        field: 'maxPlayerPerLobby',
        allowNull: false,
        defaultValue: 12,
      },
      addEveryone: {
        type: DataTypes.BOOLEAN,
        field: 'addEveryone',
        defaultValue: false,
        allowNull: true,
      },
    });

    // Index
    await queryInterface.addIndex('BOT_GuildOptions', {
      fields: ['id'],
      unique: true,
      type: 'UNIQUE',
      name: 'PK_guildOptions_id',
    });

    await queryInterface.addIndex('BOT_GuildOptions', {
      fields: ['guildId'],
      name: 'IDX_guildOptions_guildId',
    });

  },

  async down(queryInterface) {
    await queryInterface.removeIndex('BOT_GuildOptions', 'PK_guildOptions_id');
    await queryInterface.removeIndex('BOT_GuildOptions', 'IDX_guildOptions_guildId');
    await queryInterface.dropTable('BOT_GuildOptions');
  },
};
