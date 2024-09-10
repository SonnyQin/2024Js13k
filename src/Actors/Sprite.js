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
    DrawImage(context, image, size, offsetx = 0, offsety = 0) {
        context.font = size + 'px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", "Twemoji"';
        // 设置文本对齐方式
        context.textAlign = 'center'; // 使文本水平居中对齐
        context.textBaseline = 'middle'; // 使文本垂直居中对齐
        /*context.save();
        context.translate(this.GetPosition().x, this.GetPosition().y);
        context.rotate(this.GetRotation());*/
        let pos = this.TransformToView();
        // @ts-ignore
        if (this.GetType() == Actor_1.Type.Monster && this.GetActive())
            context.globalAlpha = 0.85;
        context.fillText(image, pos.x + offsetx, pos.y + offsety);
        /*        context.moveTo(0,0);
                context.stroke();*/
        context.globalAlpha = 1;
        //context.lineTo()
        /*context.restore();*/
    }
    //Use the first image of assets to draw in default
    //If the sprite has extra image, implemented in the derived class(hard code)
    Draw(context, offsetx = 0, offsety = 0) {
        if (Object.keys(this.mAssets).length == 1) {
            let image = Object.keys(this.mAssets)[0];
            // @ts-ignore
            let size = this.mAssets[image] * this.mScale;
            this.DrawImage(context, image, size, offsetx, offsety);
        }
    }
    //Virtual
    HandleMessage(telegram) {
    }
}
exports.default = Sprite;
//# sourceMappingURL=Sprite.js.map