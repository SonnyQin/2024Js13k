import Sprite from "./Sprite";
import {Game} from "../Game";
import InputManager from "../InputManager";
import {Vector2, VmiV, Zone} from "../Math";
import MovementComponent from "../Components/MovementComponent";
import StateMachine from "../AI/StateMachine/StateMachine";
import Telegram from "../AI/Message/Telegram";
import {Actor, Type} from "./Actor";
import SenseComponent from "../Components/SenseComponent";
import PlayerGlobalState, {PSNormal} from "../AI/StateMachine/States/PlayerStates";
import CollisionComponent from "../Components/CollisionComponent";
import {paras} from "../Parameters";
import MazeGenerator from "./Background/MazeGenerator";
import MessageDispatcher from "../AI/Message/MessageDispatcher";
import {MessageType} from "../AI/Message/MessageType";
import MonsterBase from "./Monsters/MonsterBase";
import WallComponent from "../Components/WallComponent";
//May not use mAssets, use SelectAssets Instead, and will hard code the
//image in state
export default class Player extends Sprite
{
    constructor(game:Game,drawOrder:number=1,scale:number=1.0)
    {
        //hard code
        let pos=MazeGenerator.Instance.GetLocation(MazeGenerator.Instance.GetStartPos());
        super(game,0,new Vector2(pos.x,pos.y),1.0);

        this.mc=new MovementComponent(this,100,paras.PlayerNormalSpeed);
        this.sc=new SenseComponent(this);
        this.cc=new CollisionComponent(this, 100, paras.PlayerCollisionSize);
        this.wc=new WallComponent(this);

        this.mStateMachine=new StateMachine<Player>(this);
        this.mStateMachine.SetGlobalState(PlayerGlobalState.Instance);
        this.mStateMachine.SetCurrentState(PSNormal.Instance);
        //Additional Enter to trigger the sound initially
        PSNormal.Instance.Enter(this);

        this.SetType(Type.Player);

        //Hard code default image;
        this.mSelectImage='😃';
        this.mSize=paras.PlayerSize;

        this.mTiredness=0;
        this.mActive=false;
        this.mPursuitMonsters=new Set();
    }

    public ProcessInput(keyState:InputManager):void
    {
        if(keyState.keysDown['t'])
            this.SetPosition(MazeGenerator.Instance.GetLocation(MazeGenerator.Instance.GetEndPos()));
        if(keyState.leftbutton)
            this.mActive=true;
        if(this.mActive)
            this.mc.SetForwardSpeed(this.mc.CalculateForwardSpeed(keyState.GetMouseVec()));
    }
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        //console.log(this.GetFSM().GetCurrentState());
        this.mStateMachine.Update();
        if(MazeGenerator.Instance.GetWinZone().Inside(this.GetPosition()))
        {
            MessageDispatcher.Instance.DispatchMsg(0,this,this, MessageType.PM_WIN);
        }
    }

    public Draw(context: CanvasRenderingContext2D)
    {
        /*let b=context.measureText(this.mSelectImage);*/
        this.DrawImage(context, this.mSelectImage, paras.PlayerSize, paras.offsetx, paras.offsety);
        let pos=this.TransformToView();
/*        context.arc(pos.x, pos.y, paras.PlayerCollisionSize,0,2*Math.PI);
        context.stroke();
        context.closePath();*/
        //context.stroke()
    }
    
    public HandleMessage(telegram: Telegram): boolean
    {
        return this.mStateMachine.HandleMessage(telegram);
    }

    //Variables
    private mc:MovementComponent;
    private sc:SenseComponent;
    private cc:CollisionComponent;
    private wc:WallComponent;
    private mStateMachine:StateMachine<Player>;

    private mSelectImage:string;
    private mSize:number;

    //Attributes
    //Determine the substate of Normal State of Player,
    //Also, determining the max speed of player
    private mTiredness;
    //Monsters that are pursuiting the player
    private mPursuitMonsters:Set<any>;

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

    public SetMaxSpeed(speed:number)
    {
        this.mc.SetMaxSpeed(speed);
    }

    public StopMoving(deltatime: number, Wall: Vector2)
    {
        // 获取当前角色位置并复制
        let pos = this.GetPosition().Copy();

        // 计算从墙壁到角色位置的向量，并标准化
        let WallToPos = (VmiV(pos, Wall)).Normalize();

        // 计算调整量
        // 注意：deltatime * this.GetSpeed() 表示在这段时间内的移动距离
        let adjustment = WallToPos.Multiply(deltatime * 1.5*this.GetSpeed());
        // 更新位置
        pos.AddVec(adjustment);

        // 设置新位置
        this.SetPosition(pos);
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

    public GetCollider()
    {
        return this.cc.GetCollider();
    }

    public IsPursuited():boolean
    {
        return this.mPursuitMonsters.size > 0;

    }
    
    public AddPursuit(monster:Actor):void
    {
        this.mPursuitMonsters.add(monster);
    }

    public RemovePursuit(monster:Actor):void
    {
        this.mPursuitMonsters.delete(monster);
    }
}