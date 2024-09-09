//A boolean to decide whether the monster is evil or not
//Add steering Behaviors and statemachine to control the logic of monsters
//Might shake but don't change rotation which results in calculation
import Sprite from "../Sprite";
import {Game} from "../../Game";
import SteeringBehaviors from "../../AI/SteeringBehaviors";
import {VdN, Vector2, Zone} from "../../Math";
import StateMachine from "../../AI/StateMachine/StateMachine";
import Telegram from "../../AI/Message/Telegram";
import {Type} from "../Actor";
import MonsterGlobalState, {MSHiding} from "../../AI/StateMachine/States/MonsterStates";
import MovementComponent from "../../Components/MovementComponent";
import CollisionComponent from "../../Components/CollisionComponent";
import {paras} from "../../Parameters";

export default class MonsterBase extends Sprite
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,isEvil:boolean)
    {
        super(game,drawOrder,pos);
        this.mIsEvil=isEvil;
        this.mSteeringBehaviors=new SteeringBehaviors(this);
        //先这么写
        this.mOffset=new Vector2();
        if(this.mIsEvil)
        {
            this.mStateMachine=new StateMachine<MonsterBase>(this);
            this.mStateMachine.SetGlobalState(MonsterGlobalState.Instance);
            this.mStateMachine.SetCurrentState(MSHiding.Instance);
        }

        this.mIsHide=true;
        this.SetType(Type.Monster);

        this.mc=new MovementComponent(this,100,150);
        this.cc=new CollisionComponent(this, 100, paras.MonsterCollisionSize);
        this.mBornTime=Date.now();
        this.mActive=false;
    }

    private CheckLifeSpan()
    {
        if(Date.now()-this.mBornTime>paras.MonsterLifeSpan)
        {
            this.GetGame().RemoveActor(this);
        }
    }

    public Update(deltaTime: number)
    {
        super.Update(deltaTime);

        this.CheckLifeSpan();

        if(this.mIsEvil)
            this.mStateMachine.Update();
        let SteeringForce=this.mSteeringBehaviors.Calculate().Copy();

        let Acceleration= VdN(SteeringForce,paras.MonsterMass);

        let Velocity = this.mc.GetForwardSpeed().Copy();
        Velocity.AddVec(Acceleration);
        Velocity.Truncate(paras.MonsterMaxSpeed);
        this.mc.SetForwardSpeed(Velocity);
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        super.Draw(context);
        if(this.mIsEvil&&this.mStateMachine.GetCurrentState()!=MSHiding.Instance)
        {
            this.DrawThirteen(context, this.mOffset);
        }

        let pos=this.GetGame().GetCamera().TransformToView(this.GetPosition());
        context.arc(pos.x, pos.y, paras.MonsterCollisionSize,0,2*Math.PI);
        context.stroke();
    }

    //TODO May add some gradually appear and gradually disappear effect
    public DrawThirteen(ctx:CanvasRenderingContext2D,offset:Vector2):void
    {
        ctx.fillStyle="red";
        ctx.font="20px Georgia"
        let pos=this.TransformToView();
        ctx.fillText("13",pos.x+offset.x, pos.y+offset.y);
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
    // @ts-ignore
    private mStateMachine:StateMachine<MonsterBase>;
    //Whether the 13 label is hidden or not
    protected mIsHide:boolean;

    //Components
    private mc:MovementComponent;
    private cc:CollisionComponent;

    private mBornTime;
    private mActive:boolean;

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

    public GetCollider()
    {
        return this.cc.GetCollider();
    }

    public GetSteering()
    {
        return this.mSteeringBehaviors;
    }

    public GetIsEvil()
    {
        return this.mIsEvil;
    }

    public GetActive()
    {
        return this.mActive;
    }

    public SetActive(active:boolean)
    {
        this.mActive=active;
    }
}