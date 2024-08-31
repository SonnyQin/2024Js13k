import {Actor} from "./Actor";
import {Game} from "../Game";

//Using several emojis and other manually modification to render
export default class Sprite extends Actor
{
    constructor(game:Game,drawOrder:number=1, assets:string[], Sizes:number[])
    {
        super(game, drawOrder);
        this.mAssets=assets;
        this.mSizes=Sizes;
    }

    private mAssets:string[];
    //Determine the size of the image
    private mSizes:number[];

    public GetAssets():string[]
    {
        return this.mAssets;
    }
    public GetSizes():number[]
    {
        return this.mSizes;
    }
}