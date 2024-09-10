"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LevelController_1 = __importDefault(require("./LevelController"));
LevelController_1.default.Instance;
var globalID;
function animate() {
    LevelController_1.default.Instance.Update();
    /*    if(!game.mIsRunning)
            return;*/
    globalID = requestAnimationFrame(animate);
}
globalID = requestAnimationFrame(animate);
//# sourceMappingURL=Main.js.map