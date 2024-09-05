"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Element_1 = __importDefault(require("../Element"));
const Math_1 = require("../../Math");
const InputManager_1 = __importDefault(require("../../InputManager"));
class Button extends Element_1.default {
    constructor(owner, pos, width, length) {
        super(owner, pos);
        let self = this;
        this.mZone = new Math_1.Zone(pos, width, length);
    }
    Update() {
        super.Update();
        //console.log(InputManager.Instance.leftbutton)
        if (InputManager_1.default.Instance.leftbutton) {
            //console.log(InputManager.Instance.GetMouseVec());
            if (this.mZone.Inside(InputManager_1.default.Instance.GetMouseVec())) {
                this.OnClick();
            }
        }
    }
    Draw(ctx) {
    }
    //virtual
    OnClick() {
    }
    GetZone() {
        return this.mZone;
    }
}
exports.default = Button;
//# sourceMappingURL=Button.js.map