"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonsterList = void 0;
//Containing all types of monsters
var MonsterList;
(function (MonsterList) {
})(MonsterList || (exports.MonsterList = MonsterList = {}));
//Generate in random of different types of monsters
class MonsterGenerator {
    constructor() {
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = MonsterGenerator;
//# sourceMappingURL=MonsterGenerator.js.map