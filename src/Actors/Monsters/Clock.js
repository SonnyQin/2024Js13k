"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MonsterBase_1 = __importDefault(require("./MonsterBase"));
const Math_1 = require("../../Math");
const Parameters_1 = require("../../Parameters");
//A base for mosters that changing its image
class Clock extends MonsterBase_1.default {
    constructor(game, drawOrder = 1, pos, scale, isEvil) {
        super(game, drawOrder, pos, scale, isEvil);
        this.mSize = Parameters_1.paras.ClockSize;
        this.mImages = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];
        this.mDisplayTime = (0, Math_1.Random)(1000, 3000);
        this.mLastFrameTime = Date.now();
        this.count = 0;
    }
    //
    UpdateActor(deltaTime) {
        //console.log(this.GetPosition().DisTo(this.GetGame().GetPlayer().GetPosition()));
        if (Date.now() - this.mLastFrameTime > this.mDisplayTime) {
            this.count++;
            this.mLastFrameTime = Date.now();
            if (this.count >= Object.keys(this.mImages).length)
                this.count = 0;
        }
    }
    Draw(context) {
        let image = this.mImages[this.count];
        this.DrawImage(context, image, this.mSize);
        //Draw the Red Thirteen After drawing the image
        super.Draw(context);
    }
}
exports.default = Clock;
//# sourceMappingURL=Clock.js.map