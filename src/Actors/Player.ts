import Sprite from "./Sprite";
import {Game} from "../Game";
import InputManager from "../InputManager";
import {Vector2, Zone} from "../Math";
import MovementComponent from "../Components/MovementComponent";
import StateMachine from "../AI/StateMachine/StateMachine";
import Telegram from "../AI/Message/Telegram";
import {Type} from "./Actor";
import SenseComponent from "../Components/SenseComponent";
import PlayerGlobalState, {PSNormal} from "../AI/StateMachine/States/PlayerStates";
import CollisionComponent from "../Components/CollisionComponent";
import {paras} from "../Parameters";
import MazeGenerator from "./Background/MazeGenerator";
//May not use mAssets, use SelectAssets Instead, and will hard code the
//image in state
export default class Player extends Sprite
{
    constructor(game:Game,drawOrder:number=1,scale:number=1.0)
    {
        //hard code
        let pos=MazeGenerator.Instance.GetLocation(MazeGenerator.Instance.GetStartPos());
        super(game,0,new Vector2(pos.x,pos.y),1.0);

        this.mc=new MovementComponent(this,100,500);
        this.sc=new SenseComponent(this);
        this.cc=new CollisionComponent(this, 100, paras.PlayerSize);

        this.mStateMachine=new StateMachine<Player>(this);
        this.mStateMachine.SetGlobalState(PlayerGlobalState.Instance);
        this.mStateMachine.SetCurrentState(PSNormal.Instance);

        this.SetType(Type.Player);

        //Hard code default image;
        this.mSelectImage='😃';
        this.mSize=paras.PlayerSize;

        this.mTiredness=0;
        this.mIsPursuited=false;
        this.mActive=false;
    }

    public ProcessInput(keyState:InputManager):void
    {
        if(keyState.leftbutton)
            this.mActive=true;
        if(this.mActive)
            this.mc.SetForwardSpeed(this.mc.CalculateForwardSpeed(keyState.GetMouseVec()));
    }
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        this.mStateMachine.Update();
        console.log(this.mTiredness);
        console.log(this.IsPursuited());
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        this.DrawImage(context, this.mSelectImage, this.mSize);
        let pos=this.GetGame().GetCamera().TransformToView(this.GetPosition());
        context.arc(pos.x, pos.y, this.mSize,0,2*Math.PI);
        context.stroke();

        context.moveTo(0,0);
        context.lineTo(pos.x,pos.y);
        context.stroke();
    }
    
    public HandleMessage(telegram: Telegram): boolean
    {
        return this.mStateMachine.HandleMessage(telegram);
    }

    //Variables
    private mc:MovementComponent;
    private sc:SenseComponent;
    private cc:CollisionComponent;
    private mStateMachine:StateMachine<Player>;

    private mSelectImage:string;
    private mSize:number;

    //Attributes
    //Determine the substate of Normal State of Player,
    //Also, determining the max speed of player
    private mTiredness;
    private mIsPursuited:boolean;

    private mActive:Boolean;

    public GetFSM():StateMachine<Player>
    {
        return this.mStateMachine;
    }

    public SetSelectImage(image:string):void
    {
        this.mSelectImage=image;
    }

    public SetSize(num:number):void
    {
        this.mSize=num;
    }

    public GetSpeed():number
    {
        return this.mc.GetForwardSpeed().Length();
    }

    public GetVelocity():Vector2
    {
        return this.mc.GetForwardSpeed();
    }

    public GetMaxSpeed()
    {
        return this.mc.GetMaxSpeed();
    }

    public GetTiredness():number
    {
        return this.mTiredness;
    }

    public AddTiredness(tired:number)
    {
        this.mTiredness+=tired;
        if(this.mTiredness<0)
            this.mTiredness=0;
        if (this.mTiredness > paras.MaxTiredness)
            this.mTiredness=paras.MaxTiredness;
    }

    //Determine the velocity according to how tired
    public TiredVelocity()
    {

    }

    public GetCollider()
    {
        return this.cc.GetCollider();
    }

    public IsPursuited():boolean
    {
        return this.mIsPursuited;
    }
    public SetIsPursuited(is:boolean)
    {
        this.mIsPursuited=is;
    }
}