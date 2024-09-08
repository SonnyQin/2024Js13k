"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterList = void 0;
const Alien_1 = __importDefault(require("./Alien"));
const Math_1 = require("../../Math");
const Parameters_1 = require("../../Parameters");
const Beverage_1 = __importDefault(require("./Beverage"));
const Disk_1 = __importDefault(require("./Disk"));
const Light_1 = __importDefault(require("./Light"));
const Clock_1 = __importDefault(require("./Clock"));
const Watermelon_1 = __importDefault(require("./Watermelon"));
const Disk_2 = __importDefault(require("./Disk"));
const MazeGenerator_1 = __importDefault(require("../Background/MazeGenerator"));
var MonsterList;
(function (MonsterList) {
    MonsterList[MonsterList["Alien"] = 0] = "Alien";
    MonsterList[MonsterList["Beverage"] = 1] = "Beverage";
    MonsterList[MonsterList["Clock"] = 2] = "Clock";
    MonsterList[MonsterList["Disk"] = 3] = "Disk";
    MonsterList[MonsterList["Light"] = 4] = "Light";
    MonsterList[MonsterList["Treasure"] = 5] = "Treasure";
    MonsterList[MonsterList["Watermelon"] = 6] = "Watermelon";
    MonsterList[MonsterList["LENGTH"] = 7] = "LENGTH";
})(MonsterList || (exports.MonsterList = MonsterList = {}));
//Generate in random of different types of monsters
class MonsterGenerator {
    constructor() {
        this.mMonsterMap = [];
        this.mMapLength = MazeGenerator_1.default.Instance.GetMapArr().length;
        for (let i = 0; i < this.mMapLength; i++) {
            this.mMonsterMap[i] = [];
            for (let j = 0; j < this.mMapLength; j++) {
                this.mMonsterMap[i][j] = false;
            }
        }
    }
    RandomOffset() {
        return (0, Math_1.Random)(-Parameters_1.paras.blocklength, Parameters_1.paras.blocklength / 2);
    }
    RandomScale() {
        return (0, Math_1.Random)(0.8, 1.2);
    }
    RandomLocation() {
        let vecx = (0, Math_1.RandomInt)(0, this.mMapLength - 1);
        let vecy = (0, Math_1.RandomInt)(0, this.mMapLength - 1);
        if (!this.mMonsterMap[vecx][vecy]) {
            this.mMonsterMap[vecx][vecy] = true;
            let vec = MazeGenerator_1.default.Instance.GetLocation(new Math_1.Vector2(vecx, vecy));
            return vec.AddVec(new Math_1.Vector2(this.RandomOffset(), this.RandomOffset()));
        }
        else
            return this.RandomLocation();
    }
    RandomChoose(game, isEvil) {
        let r = (0, Math_1.RandomInt)(0, MonsterList.LENGTH - 1);
        switch (r) {
            case 0:
                return new Alien_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 1:
                return new Beverage_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 2:
                return new Clock_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 3:
                return new Disk_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 4:
                return new Light_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 5:
                return new Disk_2.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
            case 6:
                return new Watermelon_1.default(game, 1, this.RandomLocation(), this.RandomScale(), isEvil);
        }
    }
    Generate(game, info) {
        for (let i = 0; i < info.numOfObjects; i++) {
            this.RandomChoose(game, false);
        }
        for (let i = 0; i < info.numOfMonsters; i++) {
            this.RandomChoose(game, true);
        }
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = MonsterGenerator;
//# sourceMappingURL=MonsterGenerator.js.map