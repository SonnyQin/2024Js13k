import {Game} from "../Game";
import InputManager from "../InputManager";
import {paras} from "../Parameters";

export default class Fog
{
    constructor(game:Game)
    {
        this.mGame=game;
        this.mCanvas=document.createElement('canvas');
        if(canvas)
        {   // @ts-ignore
            this.mContext=canvas.getContext('2d');
            this.mCanvasWidth=this.mGame.GetCanvasWidth();
            this.mCanvasHeight=this.mGame.GetCanvasHeight();
            // 设置遮罩区域为透明
            this.mContext.globalCompositeOperation = 'destination-out'; // 设置为透明
            game.GetContext().globalCompositeOperation='source-atop';
        }
    }

    public Update()
    {
        this.mContext.fillStyle = 'black';
        this.mContext.fillRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);

        this.mContext.fillStyle = 'white'; // 遮罩区域的颜色
        this.mContext.beginPath();
        let pos=this.mGame.GetPlayer().GetPosition();
        this.mContext.arc(pos.x, pos.y, paras.POVLength, 0, Math.PI * 2); // 绘制一个圆形遮罩区域
        this.mContext.fill();
        this.mGame.GetContext().drawImage(this.mCanvas,0,0);
    }

    public mGame:Game;
    private mCanvas:HTMLCanvasElement;
    // @ts-ignore
    private mContext:CanvasRenderingContext2D;
    // @ts-ignore
    private mCanvasWidth:number;
    // @ts-ignore
    private mCanvasHeight:number;
}