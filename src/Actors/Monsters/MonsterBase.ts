//A boolean to decide whether the monster is evil or not
//Add steering Behaviors and statemachine to control the logic of monsters
import Sprite from "../Sprite";
import {Game} from "../../Game";
import SteeringBehaviors from "../../AI/SteeringBehaviors";
import {Vector2} from "../../Math";
import StateMachine from "../../AI/StateMachine/StateMachine";
import State from "../../AI/StateMachine/States/State";
import {clock} from "cli-spinners";
import Clock from "./Clock";
import Telegram from "../../AI/Message/Telegram";

export default class MonsterBase extends Sprite
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,isEvil:boolean)
    {
        super(game,drawOrder,pos);
        this.mIsEvil=false;
        this.mSteeringBehaviors=new SteeringBehaviors(this);
        //先这么写
        this.mOffset=new Vector2();
        this.mStateMachine=new StateMachine<MonsterBase>();
    }

    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        this.mStateMachine.Update();
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
        if(this.mIsEvil)
        {
            this.DrawThirteen(context, this.mOffset);
        }
    }

    //TODO May add some gradually appear and gradually disappear effect
    public DrawThirteen(ctx:CanvasRenderingContext2D,offset:Vector2):void
    {
        ctx.fillStyle="red";
        ctx.fillText("13",this.GetPosition().x+offset.x, this.GetPosition().y+offset.y);
        ctx.stroke();
    }

    public HandleMessage(telegram: Telegram): boolean | void
    {
        return super.HandleMessage(telegram);
    }

    private mIsEvil:boolean;
    private mSteeringBehaviors:SteeringBehaviors;
    //The offset of red 13, hard code in derived classes
    protected mOffset:Vector2;
    private mStateMachine:StateMachine<MonsterBase>;
}