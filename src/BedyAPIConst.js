'use strict';

class BedyAPIConst {
    static name = 'BedyApi';
}

/**
 *  Default GUID for Module
 */
BedyAPIConst.ModuleGuid = {
    /**
     * Global module (all no categorized)
     */
    GLOBAL: 'b33fabae-e151-4062-a2d2-636282fa82eb',
    /**
     * Tournament Module
     */
    TOURNAMENT: '590aa6bd-f5f9-4f57-bea2-deccbf933590',
    /**
     * Role module
     */
    ROLE: 'b10520ff-0fe1-439f-89b1-5dac309f9641',
};

/**
 * Default GUID for Command
 */
BedyAPIConst.CommandGuid = {
    GLOBAL: {
        HELP: '3700e08a-8223-414c-a669-6e068fd0e5df',
        CONTACT_US: 'f22960f9-4395-46a7-9854-cc7159c25ac6',
        USERINFO: '8bede9cb-a75e-43b8-a25c-3fdf1013438e',
        SET_USER: 'fe02e17a-d9d4-4cf3-a90e-f668783aa1b5',
    },
    TOURNAMENT: {
        SET_CONFIGURATION: '0b9e26a9-f735-491d-994a-d59fbe383a88',
        CREATE: '6f85bee9-f4d3-4e35-853d-759f2a9daff7',
        CLOSE: '8c112553-82ed-49f3-98fe-e8485a7d888b',
        TOURNAMENT: '9f8e83d2-2d01-4d8d-abd4-4fc5280c1d4f',
    },
    ROLE: {
        ROLE: 'afb8cf41-1de8-4160-800e-77d4c2cd3206',
    },
};


/**
 * Discord application command type (Global or guild command)
 */
BedyAPIConst.ApplicationCommandType = {
    APPLICATION_COMMANDS: 0,
    APPLICATION_GUILD_COMMANDS: 1,
};

/**
 * Module type for Discord bot commands
 */
BedyAPIConst.BedyModuleType = {
    /**
     * Commands for all guilds
     */
    GLOBAL: 0, // 'global',
    /**
     * Commands for tournament module
     */
    TOURNAMENT_MODULE: 1, // 'tournament',
    /**
     * Commands for «  » roles
     */
    ROLE_MODULE: 2, // 'role',
    /**
     * Custom command for a specific guild. Ex. « /aketo »
     */
    CUSTOM_GUILD_COMMAND: 3, // 'guild',
    /**
     * All commands if no categorized
     * @deprecated
     */
    ALL: 99, // 'all',
};

module.exports.BedyAPIConst = BedyAPIConst;