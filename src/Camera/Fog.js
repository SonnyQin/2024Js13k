"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const InputManager_1 = __importDefault(require("../InputManager"));
const Parameters_1 = require("../Parameters");
const Math_1 = require("../Math");
class Fog {
    constructor(game) {
        this.mGame = game;
        this.mCanvas = document.createElement('canvas');
        if (this.mCanvas) { // @ts-ignore
            this.mContext = this.mCanvas.getContext('2d');
            this.mCanvas.width = this.mCanvasWidth = this.mGame.GetCanvasWidth();
            this.mCanvas.height = this.mCanvasHeight = this.mGame.GetCanvasHeight();
            //document.body.appendChild(this.mCanvas);
        }
    }
    Update() {
        // 清空 Canvas
        this.mContext.clearRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        // 绘制原始图像到 Canvas
        this.mContext.drawImage(this.mGame.GetCanvas(), 0, 0);
        // 用黑色填充整个 Canvas
        this.mContext.globalCompositeOperation = 'source-over'; // 确保此时的合成操作是 'source-over'
        this.mContext.fillStyle = 'black';
        this.mContext.fillRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        // 获取玩家位置并进行坐标转换
        let pos = this.mGame.GetCamera().TransformToView(this.mGame.GetPlayer().GetPosition());
        // 获取玩家半径
        const playerSize = Parameters_1.paras.PlayerCollisionSize; // 角色的半径
        // 设置全局合成操作为 'destination-out'
        this.mContext.globalCompositeOperation = 'destination-out';
        // 绘制角色的圆形区域
        this.mContext.beginPath();
        this.mContext.arc(pos.x, pos.y, playerSize, 0, Math.PI * 2); // 画圆
        this.mContext.fill(); // 填充圆形区域
        // 获取鼠标位置相对于 Canvas 的坐标
        const mouseX = InputManager_1.default.Instance.mousex;
        const mouseY = InputManager_1.default.Instance.mousey;
        // 计算鼠标相对于 Canvas 的角度（以 x 轴为基准）
        const angle = (0, Math_1.getAngleFromXAxis)(mouseX - pos.x, mouseY - pos.y); // 鼠标相对视野中心的角度
        // 绘制扇形遮罩区域
        const POVLength = Parameters_1.paras.POVLength; // 扇形的半径
        const POVAngle = Parameters_1.paras.POVAngle; // 扇形的视角范围（单位：度）
        console.log(POVAngle);
        // 转换角度为弧度
        const startAngle = (angle - POVAngle / 2) * (Math.PI / 180);
        const endAngle = (angle + POVAngle / 2) * (Math.PI / 180);
        this.mContext.beginPath();
        this.mContext.moveTo(pos.x, pos.y); // 从中心点开始
        this.mContext.arc(pos.x, pos.y, POVLength, startAngle, endAngle); // 画圆弧
        this.mContext.lineTo(pos.x, pos.y); // 连接回中心点
        this.mContext.closePath();
        this.mContext.fill(); // 填充扇形区域
        // 将结果绘制到目标 Canvas 上
        this.mGame.GetContext().drawImage(this.mCanvas, 0, 0);
        this.mGame.GetContext().moveTo(0, 0);
        this.mGame.GetContext().lineTo(pos.x, pos.y);
        this.mGame.GetContext().stroke();
    }
}
exports.default = Fog;
//# sourceMappingURL=Fog.js.map