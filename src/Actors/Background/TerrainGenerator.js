"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifficultyInfo = exports.Difficulty = void 0;
//Randomly generating terrains for different time player start the game
const MazeGenerator_1 = __importDefault(require("./MazeGenerator"));
const MonsterGenerator_1 = __importDefault(require("../Monsters/MonsterGenerator"));
const Fog_1 = __importDefault(require("../../Camera/Fog"));
const Background_1 = require("./Background");
const Player_1 = __importDefault(require("../Player"));
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 0] = "Easy";
    Difficulty[Difficulty["Medium"] = 1] = "Medium";
    Difficulty[Difficulty["Hard"] = 2] = "Hard";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
exports.DifficultyInfo = {
    0: {
        numOfObjects: 30,
        numOfMonsters: 10,
        mapSize: 10,
        isFogged: false,
    },
    1: {
        numOfObjects: 50,
        numOfMonsters: 25,
        mapSize: 15,
        isFogged: true,
    },
    2: {
        numOfObjects: 70,
        numOfMonsters: 39,
        mapSize: 25,
        isFogged: true,
    }
};
class TerrainGenerator {
    constructor() {
        this.mDifficulty = Difficulty.Easy;
    }
    Generate(game) {
        //new Treasure(this,1,MazeGenerator.Instance.GetWinZone().mPosition,1.0);
        let info = exports.DifficultyInfo[this.mDifficulty];
        MazeGenerator_1.default.Instance.creatMap(info.mapSize, info.mapSize);
        MazeGenerator_1.default.Instance.DetermineSE();
        game.SetPlayer(new Player_1.default(game));
        new Background_1.Background(game, MazeGenerator_1.default.Instance.GetMapArr());
        if (info.isFogged) {
            let fog = new Fog_1.default(game);
            game.SetFog(fog);
            game.SetIsFogged(true);
        }
        MonsterGenerator_1.default.Instance.Generate(game, info);
    }
    //export to outside class to set difficulty of the game
    SetDifficulty(difficulty) {
        this.mDifficulty = difficulty;
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = TerrainGenerator;
//# sourceMappingURL=TerrainGenerator.js.map