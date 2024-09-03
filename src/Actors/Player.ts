import Sprite from "./Sprite";
import {Game} from "../Game";
import InputManager from "../InputManager";
import {Vector2} from "../Math";
import MovementComponent from "../Components/MovementComponent";
import StateMachine from "../AI/StateMachine/StateMachine";
import Telegram from "../AI/Message/Telegram";
import {Type} from "./Actor";
import SenseComponent from "../Components/SenseComponent";
import PlayerGlobalState, {PSNormal} from "../AI/StateMachine/States/PlayerStates";
//May not use mAssets, use SelectAssets Instead, and will hard code the
//image in state
export default class Player extends Sprite
{
    constructor(game:Game,drawOrder:number=1,scale:number=1.0)
    {
        //hard code
        super(game,0,new Vector2(100,100),1.0);

        this.mc=new MovementComponent(this);
        this.sc=new SenseComponent(this);

        this.mStateMachine=new StateMachine<Player>(this);
        this.mStateMachine.SetGlobalState(PlayerGlobalState.Instance);
        this.mStateMachine.SetCurrentState(PSNormal.Instance);

        this.SetType(Type.Player);

        //Hard code default image;
        this.mSelectImage='😃';
        this.mSize=79;

        this.mTiredness=0;
    }

    public ProcessInput(keyState:InputManager):void
    {
        this.mc.SetForwardSpeed(this.mc.CalculateForwardSpeed(keyState.GetMouseVec()));
    }
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        this.mStateMachine.Update();
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        this.DrawImage(context, this.mSelectImage, this.mSize);
    }
    
    public HandleMessage(telegram: Telegram): boolean
    {
        return this.mStateMachine.HandleMessage(telegram);
    }

    //Variables
    private mc:MovementComponent;
    private sc:SenseComponent;
    private mStateMachine:StateMachine<Player>;

    private mSelectImage:string;
    private mSize:number;

    //Attributes
    //Determine the substate of Normal State of Player,
    //Also, determining the max speed of player
    public mTiredness;

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

    public SetTiredness(tired:number)
    {
        this.mTiredness=tired;
    }
}