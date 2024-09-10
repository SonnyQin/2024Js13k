"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parameters_1 = require("../Parameters");
class Fog {
    constructor(game) {
        this.mGame = game;
        this.mCanvas = document.createElement('canvas');
        if (this.mCanvas) { // @ts-ignore
            this.mContext = this.mCanvas.getContext('2d');
            this.mCanvas.width = this.mCanvasWidth = this.mGame.GetCanvasWidth();
            this.mCanvas.height = this.mCanvasHeight = this.mGame.GetCanvasHeight();
            //document.body.appendChild(this.mCanvas);
            this.mIncrease = true;
            this.mCurrentOpacity = Parameters_1.paras.MinOpacity;
        }
    }
    Update() {
        this.updateOpacity();
        // Assuming 'this.mContext' is your 2D canvas context and 'this.mCanvas' is your canvas element
        // Clear the Canvas
        this.mContext.clearRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        // Draw the original image onto the Canvas
        this.mContext.drawImage(this.mGame.GetCanvas(), 0, 0);
        // Fill the entire Canvas with black
        this.mContext.globalCompositeOperation = 'source-over';
        this.mContext.fillStyle = 'black';
        this.mContext.fillRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        // Get player position and transform coordinates
        let pos = this.mGame.GetCamera().TransformToView(this.mGame.GetPlayer().GetPosition());
        // Get player size
        const playerSize = Parameters_1.paras.POVLength; // Character's radius
        // Set global composite operation to 'destination-out' to cut out the circle
        this.mContext.globalCompositeOperation = 'destination-out';
        this.mContext.beginPath();
        this.mContext.arc(pos.x, pos.y, playerSize, 0, Math.PI * 2); // Draw circle
        this.mContext.fill(); // Fill the circle area
        // Reset composite operation to 'source-over'
        this.mContext.globalCompositeOperation = 'source-over';
        // Darken the circle area by drawing a black circle with reduced opacity
        this.mContext.fillStyle = 'rgba(0, 0, 0,' + this.mCurrentOpacity + ' )'; // Adjust opacity as needed
        this.mContext.beginPath();
        this.mContext.arc(pos.x, pos.y, playerSize, 0, Math.PI * 2); // Draw circle
        this.mContext.fill(); // Fill the circle area
        // Draw the result onto the target Canvas
        this.mGame.GetContext().drawImage(this.mCanvas, 0, 0);
        // Optionally draw a line from (0, 0) to the player's position
        /*this.mGame.GetContext().moveTo(0, 0);
        this.mGame.GetContext().lineTo(pos.x, pos.y);
        this.mGame.GetContext().stroke();*/
    }
    updateOpacity() {
        if (this.mIncrease) {
            this.mCurrentOpacity += Parameters_1.paras.OpacitySpeed;
            if (this.mCurrentOpacity >= Parameters_1.paras.MaxOpacity) {
                this.mCurrentOpacity = Parameters_1.paras.MaxOpacity;
                this.mIncrease = false;
            }
        }
        else {
            this.mCurrentOpacity -= Parameters_1.paras.OpacitySpeed;
            if (this.mCurrentOpacity <= Parameters_1.paras.MinOpacity) {
                this.mCurrentOpacity = Parameters_1.paras.MinOpacity;
                this.mIncrease = true;
            }
        }
    }
}
exports.default = Fog;
//# sourceMappingURL=Fog.js.map