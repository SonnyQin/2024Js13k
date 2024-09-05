"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("./Container"));
const PauseButton_1 = __importDefault(require("../Buttons/PauseButton"));
class HUDBaseContainer extends Container_1.default {
    constructor(screen) {
        super(screen);
        this.AddElement(new PauseButton_1.default(this));
    }
}
exports.default = HUDBaseContainer;
//# sourceMappingURL=HUDBaseContainer.js.map