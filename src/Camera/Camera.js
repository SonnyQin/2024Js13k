"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Math_1 = require("../Math");
class Camera {
    constructor(game) {
        this.mCameraPos = new Math_1.Vector2();
        this.mGame = game;
    }
    TransformToView(vec) {
        return (0, Math_1.VaV)((0, Math_1.VmiV)(vec, this.mCameraPos), new Math_1.Vector2(this.mGame.GetCanvasWidth() / 2, this.mGame.GetCanvasHeight() / 2));
    }
    ReverseTransform(vec) {
        return (0, Math_1.VaV)(vec, (0, Math_1.VmiV)(this.mCameraPos, new Math_1.Vector2(this.mGame.GetCanvasWidth() / 2, this.mGame.GetCanvasHeight() / 2)));
    }
    //TODO Add some  function of camera shake
    Update() {
        let pos = this.mGame.GetPlayer().GetPosition();
        this.mCameraPos = new Math_1.Vector2(pos.x, pos.y);
    }
}
exports.default = Camera;
//# sourceMappingURL=Camera.js.map