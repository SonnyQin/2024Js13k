"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterList = void 0;
var MonsterList;
(function (MonsterList) {
})(MonsterList || (exports.MonsterList = MonsterList = {}));
//Generate in random of different types of monsters
class MonsterGenerator {
    constructor() {
    }
    Generate(game, info) {
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = MonsterGenerator;
//# sourceMappingURL=MonsterGenerator.js.map