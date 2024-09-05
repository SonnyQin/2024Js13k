"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Button_1 = __importDefault(require("./Button"));
const Math_1 = require("../../Math");
class PauseButton extends Button_1.default {
    constructor(owner) {
        super(owner, new Math_1.Vector2(500, 100), 100, 50);
    }
    Update() {
        super.Update();
    }
    Draw(ctx) {
        super.Draw(ctx);
        ctx.fillStyle = 'blue';
        ctx.font = '20px';
        ctx.fillRect(this.GetPosition().x - 50, this.GetPosition().y - 25, 100, 50);
        //ctx.fillText("Pause",this.GetPosition().x, this.GetPosition().y);
        ctx.stroke();
        //"⌛"
    }
    OnClick() {
        super.OnClick();
    }
}
exports.default = PauseButton;
//# sourceMappingURL=PauseButton.js.map