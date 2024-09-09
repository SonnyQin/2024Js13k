import MonsterBase from "./MonsterBase";
import {Game} from "../../Game";
import {Random, Vector2} from "../../Math";
import State from "../../AI/StateMachine/States/State";
import {paras} from "../../Parameters";

//A base for mosters that changing its image
export default class Clock extends MonsterBase
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,isEvil:boolean)
    {
        super(game, drawOrder, pos,scale, isEvil);
        this.mSize=paras.ClockSize;
        this.mImages=["🌑","🌒","🌓","🌔","🌕","🌖","🌗","🌘"];
        this.mDisplayTime=Random(1000,3000);
        this.mLastFrameTime=Date.now();
        this.count=0;
    }

    //
    protected UpdateActor(deltaTime: number)
    {
        //console.log(this.GetPosition().DisTo(this.GetGame().GetPlayer().GetPosition()));
        if(Date.now()-this.mLastFrameTime>this.mDisplayTime)
        {
            this.count++;
            this.mLastFrameTime=Date.now();
            if(this.count>=Object.keys(this.mImages).length)
                this.count=0;
        }
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        let image=this.mImages[this.count];
        this.DrawImage(context,image,this.mSize);

        //Draw the Red Thirteen After drawing the image
        super.Draw(context);
    }

    //Variables
    private mDisplayTime:number;
    private count:number;
    private mLastFrameTime:number;
    private mImages:string[];
    private mSize:number;
}