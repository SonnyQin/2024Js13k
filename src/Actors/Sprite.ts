import {Actor} from "./Actor";
import {Game} from "../Game";
import {Vector2} from "../Math";
import Telegram from "../AI/Message/Telegram";

//Using several emojis and other manually modification to render
export default class Sprite extends Actor
{
    constructor(game:Game,drawOrder:number=1,position:Vector2,scale:number=1.0)
    {
        super(game, drawOrder,position);
        this.mAssets={};
        this.mScale=scale;
    }

    public DrawImage(context:CanvasRenderingContext2D,image:string, size:number):void
    {
        context.font = size+'px Arial';
        // 设置文本对齐方式
        context.textAlign = 'center'; // 使文本水平居中对齐
        context.textBaseline = 'middle'; // 使文本垂直居中对齐
        /*context.save();
        context.translate(this.GetPosition().x, this.GetPosition().y);
        context.rotate(this.GetRotation());*/
        context.fillText(image,this.GetPosition().x,this.GetPosition().y);
        context.moveTo(0,0);
        context.lineTo(this.GetPosition().x, this.GetPosition().y);
        context.stroke();
        /*context.restore();*/
    }

    //Use the first image of assets to draw in default
    //If the sprite has extra image, implemented in the derived class(hard code)
    Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
        if(Object.keys(this.mAssets).length==1)
        {
            let image=Object.keys(this.mAssets)[0];
            // @ts-ignore
            let size=this.mAssets[image]*this.mScale;
            this.DrawImage(context,image,size);
        }
    }

    public HandleMessage(telegram: Telegram): boolean | void
    {
        return super.HandleMessage(telegram);
    }

    //Remeber to hard code in derived class
    //Image and its size
    protected mAssets:{[key: string]: number}
    //The stretch of image
    private mScale:number;
}