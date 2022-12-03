'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class API_Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    /* eslint-disable-next-line no-unused-vars */
    static associate(models) {
      // define association here
      API_Roles.belongsTo(models.API_Guilds, {
        foreignKey: 'guildId', // Key name on source
        targetKey: 'id', // Key name on TARGET
      });

      API_Roles.hasMany(models.API_GuildModuleRoles, {
        foreignKey: 'roleId', // FK name on TARGET
        sourceKey: 'id', // Key name on SOURCE
        onDelete: 'CASCADE',
      });
    }

    /**
     * Add a new role in DB
     * @param {integer} guildId
     * @param {string} discordRoleId
     * @param {string} roleName
     * @param {string} permissions
     * @param {string} position
     * @param {string} color
     * @returns {API_Roles}
     */
    static async addRole(guildId, discordRoleId, roleName, permissions, position, color) {
      return await this.create({
        guildId: guildId,
        discordRoleId: discordRoleId,
        name: roleName,
        permissions: permissions,
        position: position,
        color: color,
      });
    }

    /**
     * Get a role by id
     * @param {integer} id
     * @returns {API_Roles}
     */
    static async findRoleById(id) {
      return await this.findOne({ where: { id: id } });
    }

    /**
     * Get a role by discord role id
     * @param {string} discordRoleId
     * @returns {API_Roles}
     */
    static async findRoleByDiscordRoleId(discordRoleId) {
      return await this.findOne({ where: { discordRoleId: discordRoleId } });
    }

    /**
     * Get all roles by guildId
     * @param {integer} guildId
     * @returns {API_Roles}
     */
    static async findAllRoleByGuildId(guildId) {
      return await this.findAll({ where: { guildId: guildId } });
    }

    /**
     * Update the sync date
     * @param {datetime} newDate
     */
    async updateSyncDate(newDate) {
      if (this.lastUpdate !== newDate) {
        this.set({
          lastUpdate: newDate,
        });
        await this.save();
        console.verbose(`Role sync date **${this.id}** has been updated.`);
      }
    }


  }

  API_Roles.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
      unique: true,
    },
    guildId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'API_Guilds',
        key: 'id',
      },
      unique: true,
    },
    discordRoleId: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    permissions: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastUpdate: {
      type: DataTypes.DATE,
      field: 'lastUpdate',
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  }, {
    sequelize,
    modelName: 'API_Roles',
    tableName: 'API_Roles',
    indexes: [
      {
        name: 'PK_api_roles_id',
        unique: true,
        fields: [
          { name: 'id' },
        ],
      },
      {
        name: 'UQ_api_roles_guildIdRoleId',
        unique: true,
        fields: [
          { name: 'guildId' },
          { name: 'discordRoleId' },
        ],
      },
    ],
  });

  return API_Roles;
};