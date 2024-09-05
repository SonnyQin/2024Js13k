"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UIScreen_1 = __importDefault(require("./UIScreen"));
const HUDBaseContainer_1 = __importDefault(require("../Containers/HUDBaseContainer"));
//HUD contains PauseMenu, PauseButton
class HUD extends UIScreen_1.default {
    constructor(game) {
        super(game);
        this.AddContainer(new HUDBaseContainer_1.default(this));
    }
}
exports.default = HUD;
//# sourceMappingURL=HUD.js.map