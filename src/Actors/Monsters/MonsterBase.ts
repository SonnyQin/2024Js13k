//A boolean to decide whether the monster is evil or not
//Add steering Behaviors and statemachine to control the logic of monsters
//Might shake but don't change rotation which results in calculation
import Sprite from "../Sprite";
import {Game} from "../../Game";
import SteeringBehaviors from "../../AI/SteeringBehaviors";
import {Vector2} from "../../Math";
import StateMachine from "../../AI/StateMachine/StateMachine";
import Telegram from "../../AI/Message/Telegram";
import {Type} from "../Actor";
import MonsterGlobalState, {MSHiding} from "../../AI/StateMachine/States/MonsterStates";
import MovementComponent from "../../Components/MovementComponent";

export default class MonsterBase extends Sprite
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,isEvil:boolean)
    {
        super(game,drawOrder,pos);
        this.mIsEvil=true;
        this.mSteeringBehaviors=new SteeringBehaviors(this);
        //先这么写
        this.mOffset=new Vector2();
        this.mStateMachine=new StateMachine<MonsterBase>(this);
        this.mStateMachine.SetGlobalState(MonsterGlobalState.Instance);
        this.mStateMachine.SetCurrentState(MSHiding.Instance);
        this.mIsHide=true;
        this.SetType(Type.Monster);

        this.mc=new MovementComponent(this,100,150);
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
        ctx.font="20px Georgia"
        ctx.fillText("13",this.GetPosition().x+offset.x, this.GetPosition().y+offset.y);
        ctx.stroke();
    }

    public HandleMessage(telegram: Telegram): boolean
    {
        return this.mStateMachine.HandleMessage(telegram);
    }

    private mIsEvil:boolean;
    private mSteeringBehaviors:SteeringBehaviors;
    //The offset of red 13, hard code in derived classes
    protected mOffset:Vector2;
    private mStateMachine:StateMachine<MonsterBase>;
    //Whether the 13 label is hidden or not
    protected mIsHide:boolean;

    //Components
    private mc:MovementComponent;

    public GetFSM():StateMachine<MonsterBase>
    {
        return this.mStateMachine;
    }

    public GetMaxSpeed():number
    {
        return this.mc.GetMaxSpeed();
    }

    public GetVelocity():Vector2
    {
        return this.mc.GetForwardSpeed();
    }
}