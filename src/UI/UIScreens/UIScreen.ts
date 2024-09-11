import { Game } from "../../Game";
import Container from "../Containers/Container";
import Button from "../Buttons/Button";
import LevelController from "../../LevelController";
import { Vector2 } from "../../Math";
import { paras } from "../../Parameters";
import SoundManager from "../../Sound/SoundManager";

export default class UIScreen {
    private mStack: Container[];
    private mCanvas: HTMLCanvasElement;
    private mTextOffset: number; // 控制文本的偏移量
    private mAnimationFrameId: number | null;
    private mTextLines: string[]; // 保存文本行
    private mLineHeight: number; // 行高
    private mMaxOpacity: number; // 最大不透明度
    private mFadeSpeed: number; // 控制上升速度
    private mTextOpacity: number; // 当前文本的透明度
    private mStopOffset: number; // 结束移动的位置

    constructor(canvas: HTMLCanvasElement) {
        this.mStack = [];
        this.mCanvas = canvas;
        this.mTextOffset = this.mCanvas.height; // 初始化为画布底部
        this.mAnimationFrameId = null;
        this.mTextLines = [
            'Long ago, there stood an ancient castle with a mysterious chamber hidden within, ',
            'containing a priceless treasure.',
            'However, this castle fell victim to the invasion of the Thirteen Gods.',
            'The souls of these gods possessed many of the items in the chamber, ',
            'imbuing them with unspeakable malevolence.',
            'These possessed objects not only sense your presence ',
            'but also silently pursue you like shadows in the dark, ',
            'ever ready to engulf anyone daring enough to seek the treasure.',
            'To uncover the hidden wealth, you must enter this chamber, ',
            'unravel its mysteries, and face these intangible threats with courage.',
        ];
        this.mLineHeight = 43;
        this.mFadeSpeed = 2; // 控制上升速度
        this.mMaxOpacity = 1; // 最大不透明度
        this.mTextOpacity = 0; // 初始透明度
        this.mStopOffset = this.mCanvas.height - (this.mTextLines.length * this.mLineHeight) - 147; // 调整停止位置
        this.initialize();
        this.startTextAnimation();
    }

    private initialize(): void {
        let container = new Container(this);
        let button = new Button(container, new Vector2(this.mCanvas.width / 2, this.mCanvas.height - paras.ButtonOffset), 100, 50, "Start");
        container.AddElement(button);
        this.mStack.push(container);
    }

    public Update(): void {
        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Update();
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        let canvasw = this.mCanvas.width;
        let canvash = this.mCanvas.height;

        // 清除画布
        ctx.clearRect(0, 0, canvasw, canvash);

        // 设置更深的背景色
        ctx.fillStyle = '#1a1a1a'; // 深灰色
        ctx.fillRect(0, 0, canvasw, canvash);

        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Draw(ctx);
        }

        // 设置文本样式
        ctx.font = 'bold 22px Courier New'; // 字体样式
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 绘制每一行文本
        this.mTextLines.forEach((line, index) => {
            // 计算当前行的透明度
            const distanceFromBottom = this.mCanvas.height - (this.mTextOffset + (index * this.mLineHeight));
            const maxDistance = this.mCanvas.height - (this.mTextLines.length * this.mLineHeight) - 50; // 更新最大距离
            const opacity = Math.min(Math.max(distanceFromBottom / maxDistance, 0), this.mMaxOpacity);

            ctx.fillStyle = `rgba(224, 224, 224, ${opacity})`; // 设置文本颜色和透明度
            ctx.fillText(line, canvasw / 2, this.mTextOffset + (index * this.mLineHeight));
        });

        // 更新文本偏移量以创建动画效果
        this.mTextOffset -= this.mFadeSpeed; // 控制上升速度

        // 检查是否所有文字都完全显示
        if (this.mTextOffset <= this.mStopOffset) {
            this.mTextOffset = this.mStopOffset; // 确保文本停在指定位置
            if (this.mAnimationFrameId !== null) {
                cancelAnimationFrame(this.mAnimationFrameId);
            }
        } else {
            if (this.mAnimationFrameId !== null) {
                cancelAnimationFrame(this.mAnimationFrameId);
            }
            this.mAnimationFrameId = requestAnimationFrame(() => this.Draw(ctx)); // 继续动画
        }
    }

    private startTextAnimation(): void {
        if (this.mAnimationFrameId !== null) {
            cancelAnimationFrame(this.mAnimationFrameId);
        }
        this.mAnimationFrameId = requestAnimationFrame(() => this.Draw(LevelController.Instance.mContext));
    }

    public AddContainer(container: Container): void {
        this.mStack.push(container);
    }

    public RemoveContainer(): void {
        this.mStack.pop();
    }
}
