'use strict';
const { Model, Sequelize } = require('sequelize');

/*
    belongTo    -> 1..1     (inverse direction hasOne)
    hasOne      -> 1..1

    BelongsTo associations are associations where the foreign key for the one-to-one relation exists on the source model.
    HasOne associations are associations where the foreign key for the one-to-one relation exists on the target model.

    Man has only one right arm (hasOne)
    Right arm belongs to one man (belongTo)
 */

module.exports = (sequelize, DataTypes) => {
  class BOT_GuildOptions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      BOT_GuildOptions.belongsTo(models.BOT_Guilds, {
        foreignKey: 'guildId', // Set FK name on SOURCE
        targetKey: 'guildId', // Key name on TARGET
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }

  BOT_GuildOptions.getModels = function () {
    return this.sequelize.models;
  };

  BOT_GuildOptions.init({
    guildId: {
      type: Sequelize.BIGINT.UNSIGNED,
      field: 'guildId',
      primaryKey: true,
      unique: true,
      allowNull: false,
      // references: {
      //   model: 'BOT_Guilds', // This is a reference to another model
      //   key: 'guildId', // This is the column name of the referenced model
      // },
      // onDelete: 'CASCADE',
      // onUpdate: 'CASCADE',
    },
    // Todo: Move to « Module » table ?
    announcementChannelId: {
      type: Sequelize.BIGINT.UNSIGNED,
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
    annoncementCRONConfiguration: {
      type: DataTypes.STRING(100),
      field: 'annoncementCRONConfiguration',
      allowNull: true,
      defaultValue: "5 * * * *",
    },
  }, {
    sequelize,
    modelName: 'BOT_GuildOptions',
    tableName: 'BOT_GuildOptions',
    // indexes: [
    //     {
    //         name: 'PK_guildOptions_id',
    //         unique: true,
    //         fields: [{ name: 'id' }],
    //     },
    //     {
    //         name: 'IDX_guildOptions_guildId',
    //         fields: [{ name: 'guildId' }],
    //     },
    // ],
  });

  return BOT_GuildOptions;
};