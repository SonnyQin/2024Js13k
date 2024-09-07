"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
const Actor_1 = require("../Actor");
const Sprite_1 = __importDefault(require("../Sprite"));
const Math_1 = require("../../Math");
const Parameters_1 = require("../../Parameters");
//Defined as the most deep layer of the drawing, it will cover all the background of the game,
//and other layer of background, such as obstacles, decoration will be implemented as a sprite
class Background extends Sprite_1.default {
    constructor(game, map) {
        super(game, -1, new Math_1.Vector2(0, 0));
        this.mMap = map;
        this.SetType(Actor_1.Type.Terrain);
    }
    UpdateActor(deltatime) {
        //this.count++;
    }
    Draw(ctx) {
        //Maze's start position in world always be 0,0
        let cur = this.GetGame().GetCamera().TransformToView(new Math_1.Vector2(0, 0));
        let curx = cur.x;
        let cury = cur.y;
        for (let r of this.mMap) {
            for (let c of r) {
                switch (c) {
                    case 0:
                        ctx.fillStyle = 'grey';
                        break;
                    case 1:
                        ctx.fillStyle = '#DC143C';
                        break;
                    case 3:
                        ctx.fillStyle = '#E3EDCD';
                        break;
                    case 4:
                        ctx.fillStyle = '#FFD700';
                        break;
                }
                ctx.fillRect(curx, cury, Parameters_1.paras.blocklength, Parameters_1.paras.blocklength);
                curx += Parameters_1.paras.blocklength;
            }
            curx = cur.x;
            cury += Parameters_1.paras.blocklength;
        }
    }
}
exports.Background = Background;
//# sourceMappingURL=Background.js.map