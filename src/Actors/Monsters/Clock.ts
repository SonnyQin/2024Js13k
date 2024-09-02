import MonsterBase from "./MonsterBase";
import {Game} from "../../Game";
import {Random, Vector2} from "../../Math";
import State from "../../AI/StateMachine/States/State";

//A base for mosters that changing its image
export default class Clock extends MonsterBase
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,isEvil:boolean)
    {
        super(game, drawOrder, pos,scale, isEvil);
        this.mAssets={"🌑":79,"🌒":79,"🌓":79,"🌔":79,"🌕":79,"🌖":79,"🌗":79,
            "🌘":79};
        this.mDisplayTime=Random(1,3);
        this.mHideTime=Random(1,1.5);
        this.mIsHide=false;
    }

    //
    protected UpdateActor(deltaTime: number)
    {
        super.UpdateActor(deltaTime);
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
    }

    //Variables
    private mDisplayTime:number;
    private mHideTime:number;
    private mIsHide:boolean;
}