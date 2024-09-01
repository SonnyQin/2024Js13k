import {Actor} from "./Actor";
import {Game} from "../Game";
import {Vector2} from "../Math";

//Using several emojis and other manually modification to render
export default class Sprite extends Actor
{
    constructor(game:Game,drawOrder:number=1,position:Vector2,scale:number=1.0)
    {
        super(game, drawOrder,position);
        this.mAssets=new Map<string, number>();
        this.mScale=scale;
    }

    //Use the first image of assets to draw in default
    //If the sprite has extra image, implemented in the derived class(hard code)
    Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
        if(this.mAssets.size==1)
        {
            let image=Object.keys(this.mAssets)[0];
            // @ts-ignore
            let size=this.mAssets.get(image)*this.mScale;
            context.font = size+'px FontAwesome';
            context.save();
            context.translate(this.GetPosition().x, this.GetPosition().y);
            context.rotate(this.GetRotation());
            context.fillText(image,this.GetPosition().x,this.GetPosition().y,1000);
            context.restore();
        }
    }

    //Remeber to hard code in derived class
    //Image and its size
    protected mAssets:Map<string,number>;
    //The stretch of image
    private mScale:number;
}