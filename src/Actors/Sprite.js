"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Actor_1 = require("./Actor");
//Using several emojis and other manually modification to render
class Sprite extends Actor_1.Actor {
    constructor(game, drawOrder = 1, position, scale = 1.0) {
        super(game, drawOrder, position);
        this.mAssets = {};
        this.mScale = scale;
    }
    DrawImage(context, image, size) {
        context.font = size + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Twemoji"';
        // 设置文本对齐方式
        context.textAlign = 'center'; // 使文本水平居中对齐
        context.textBaseline = 'middle'; // 使文本垂直居中对齐
        /*context.save();
        context.translate(this.GetPosition().x, this.GetPosition().y);
        context.rotate(this.GetRotation());*/
        let pos = this.TransformToView();
        context.fillText(image, pos.x, pos.y);
        context.moveTo(0, 0);
        context.stroke();
        /*context.restore();*/
    }
    //Use the first image of assets to draw in default
    //If the sprite has extra image, implemented in the derived class(hard code)
    Draw(context) {
        if (Object.keys(this.mAssets).length == 1) {
            let image = Object.keys(this.mAssets)[0];
            // @ts-ignore
            let size = this.mAssets[image] * this.mScale;
            this.DrawImage(context, image, size);
        }
    }
    //Virtual
    HandleMessage(telegram) {
    }
}
exports.default = Sprite;
//# sourceMappingURL=Sprite.js.map