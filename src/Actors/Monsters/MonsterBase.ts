//A boolean to decide whether the monster is evil or not
//Add steering Behaviors and statemachine to control the logic of monsters
import Sprite from "../Sprite";
import {Game} from "../../Game";
import SteeringBehaviors from "../../AI/SteeringBehaviors";
import {Vector2} from "../../Math";

export default class MonsterBase extends Sprite
{
    constructor(game:Game,drawOrder:number=1, scale:number,isEvil:boolean)
    {
        super(game,drawOrder, scale);
        this.mIsEvil=false;
        this.mSteeringBehaviors=new SteeringBehaviors(this);
        //先这么写
        this.mOffset=new Vector2();
    }
    public Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
        if(this.mIsEvil)
        {
            this.DrawThirteen(this.mOffset);
        }
    }

    //TODO May add some gradually appear and gradually disappear effect
    public DrawThirteen(offset:Vector2):void
    {
        
    }

    private mIsEvil:boolean;
    private mSteeringBehaviors:SteeringBehaviors;
    //The offset of red 13, hard code in derived classes
    protected mOffset:Vector2;
}