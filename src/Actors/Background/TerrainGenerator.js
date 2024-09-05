"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Randomly generating terrains for different time player start the game
const MazeGenerator_1 = __importDefault(require("./MazeGenerator"));
const Parameters_1 = require("../../Parameters");
class TerrainGenerator {
    constructor() {
        MazeGenerator_1.default.Instance.creatMap(Parameters_1.paras.MapR, Parameters_1.paras.MapC);
        MazeGenerator_1.default.Instance.DetermineSE();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = TerrainGenerator;
//# sourceMappingURL=TerrainGenerator.js.map