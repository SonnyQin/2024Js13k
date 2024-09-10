"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = __importDefault(require("../Containers/Container"));
const Button_1 = __importDefault(require("../Buttons/Button"));
const LevelController_1 = __importDefault(require("../../LevelController"));
const Math_1 = require("../../Math");
class UIScreen {
    constructor() {
        this.mStack = [];
        this.initialize();
    }
    initialize() {
        let containter = new Container_1.default(this);
        let button = new Button_1.default(containter, new Math_1.Vector2(100, 100), 100, 50, "Start");
        containter.AddElement(button);
        this.mStack.push(containter);
    }
    Update() {
        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Update();
        }
    }
    Draw(ctx) {
        LevelController_1.default.Instance.mContext.beginPath();
        LevelController_1.default.Instance.mContext.clearRect(0, 0, LevelController_1.default.Instance.mCanvasWidth, LevelController_1.default.Instance.mCanvasWidth);
        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Draw(ctx);
        }
    }
    AddContainer(container) {
        this.mStack.push(container);
    }
    RemoveContainer() {
        this.mStack.pop();
    }
}
exports.default = UIScreen;
//# sourceMappingURL=UIScreen.js.map