'use strict';

class BedyAPIConst {
    static name = "BedyApi";

}

 BedyAPIConst.ModuleGuid = {
    TOURNAMENT: "590aa6bd-f5f9-4f57-bea2-deccbf933590",
    ROLE: "b10520ff-0fe1-439f-89b1-5dac309f9641",
};

BedyAPIConst.CommandGuid = {
    TOURNAMENT: {
        SET: "0b9e26a9-f735-491d-994a-d59fbe383a88",
        CREATE: "6f85bee9-f4d3-4e35-853d-759f2a9daff7",
        CLOSE: "8c112553-82ed-49f3-98fe-e8485a7d888b",
        TOURNAMENT: "9f8e83d2-2d01-4d8d-abd4-4fc5280c1d4f"
    },
    ROLE: {
        ROLE: "afb8cf41-1de8-4160-800e-77d4c2cd3206"
    }
}

module.exports.BedyAPIConst = BedyAPIConst;