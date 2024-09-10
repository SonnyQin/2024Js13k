"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = __importDefault(require("../Element"));
const Math_1 = require("../../Math");
const InputManager_1 = __importDefault(require("../../InputManager"));
const LevelController_1 = __importStar(require("../../LevelController"));
class Button extends Element_1.default {
    constructor(owner, pos, width, height, label) {
        super(owner, pos);
        this.mZone = new Math_1.Zone(pos, width, height);
        this.label = label;
    }
    Update() {
        super.Update();
        const mousePosition = InputManager_1.default.Instance.GetMouseVec();
        const isMouseOver = this.mZone.Inside(mousePosition);
        if (InputManager_1.default.Instance.leftbutton) {
            if (isMouseOver) {
                this.OnClick();
            }
        }
    }
    //virtual
    OnClick() {
        LevelController_1.default.Instance.SetStatus(LevelController_1.LevelStatus.GameState);
        LevelController_1.default.Instance.BeginLevel();
    }
    Draw(ctx) {
        let posx = this.GetPosition().x - this.mZone.mWidth / 2;
        let posy = this.GetPosition().y - this.mZone.mLength / 2;
        ctx.fillStyle = "lightgrey";
        ctx.fillRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);
        ctx.strokeStyle = "black";
        ctx.strokeRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, posx + this.mZone.mWidth / 2, posy + this.mZone.mLength / 2);
    }
}
exports.default = Button;
//# sourceMappingURL=Button.js.map