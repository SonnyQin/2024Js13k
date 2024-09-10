import {Actor} from "./Actors/Actor";
import InputManager from "./InputManager";
import MessageDispatcher from "./AI/Message/MessageDispatcher";
import Player from "./Actors/Player";
import Camera from "./Camera/Camera";
import TerrainGenerator from "./Actors/Background/TerrainGenerator";
import Fog from "./Camera/Fog";
import LevelController, {GameResult} from "./LevelController";
import SoundPlayer from "./Sound/SoundPlayer";
import {paras} from "./Parameters";
import Clock from "./Actors/Monsters/Clock";
import { Vector2 } from "./Math";

export class Game
{
    constructor()
    {
        this.mIsRunning=true;
        this.mTickCount=0;
        this.mActors=[];
        // @ts-ignore
        this.mContext=null;
        //this.mInputManager=new InputManager();

        this.mCamera=new Camera(this);

        this.mIsFogged=false;
    }

    public Initialize():void
    {
        this.mTickCount=Date.now();

        this.mCanvas=LevelController.Instance.mCanvas;
        
        this.mCanvasWidth=LevelController.Instance.mCanvasWidth;
        this.mCanvasHeight=LevelController.Instance.mCanvasHeight;
        // @ts-ignore
        this.mContext=LevelController.Instance.mContext;

        //new Clock(this, 1, new Vector2(1000,1000),1.0, true);

    }

    public RunLoop():void
    {
        this.ProcessInput();
        this.UpdateGame();
        this.GenerateOutput();

        //console.log(Date.now());
    }
    public Stop():void
    {
        this.mIsRunning=false;
    }
    private ProcessInput():void
    {
        this.mPlayer.ProcessInput(InputManager.Instance);
    }
    private UpdateGame():void
    {
        //Make minimun 16ms a frame
        while (Date.now()<this.mTickCount+16)
            ;

        var deltatime=(Date.now()-this.mTickCount)/1000;
        //console.log(deltatime);
        this.mTickCount=Date.now();
        for(let iter of this.mActors)
        {
            iter.Update(deltatime);
        }

        //Regular update of Messages
        MessageDispatcher.Instance.DispatchDelayedMessages();

        this.mCamera.Update();
    }
    private GenerateOutput():void
    {
        this.mContext.beginPath();
        this.mContext.clearRect(0,0,this.mCanvasWidth,this.mCanvasHeight);
        for(let iter of this.mActors)
        {
            iter.Draw(this.mContext);
        }
        if(this.mIsFogged)
            this.mFog.Update();
        this.DrawLevel(this.mContext);
    }

    //Draw the level number on top right corner
    public DrawLevel(ctx:CanvasRenderingContext2D)
    {
        let text="LEVEL "+(LevelController.Instance.GetLevelNumber()+1);
        ctx.font = '30px Almendra'; // 选择合适的字体和大小
        ctx.fillStyle = '#FFFF00'; // 文字颜色
        ctx.textAlign = 'right'; // 文字右对齐
        ctx.textBaseline = 'top'; // 文字基线对齐
        ctx.fillText(text, this.mCanvasWidth-paras.UIx, paras.UIy);
    }
    //Variables
    // @ts-ignore
    private mCanvasHeight:number;
    // @ts-ignore
    private mCanvasWidth:number;
    private mTickCount:number;
    public mIsRunning:boolean;
    //Sorted by Drawing Order
    private mActors:Actor[];
    // @ts-ignore
    private mCanvas:HTMLCanvasElement;
    //Canvas context
    private mContext:CanvasRenderingContext2D;
    //private mInputManager:InputManager;
    // @ts-ignore
    private mPlayer:Player;
    private mCamera:Camera;
    // @ts-ignore
    private mFog:Fog;
    private mIsFogged;

//Functions about actors
    //TODO Optimization
    AddActor(actor:Actor):void
    {
        let i=0;
        for(;i<this.mActors.length;i++)
        {
            if(this.mActors[i].GetDrawOrder()>actor.GetDrawOrder())
                break;
        }
        this.mActors.splice(i, 0, actor);
    }
    RemoveActor(actor:Actor):void
    {
        this.mActors=this.mActors.filter((iter)=>iter!=actor);
    }

    //Getters and Setters
    public GetContext()
    {
        return this.mContext;
    }

    public GetActors():Actor[]
    {
        return this.mActors;
    }

    public GetPlayer()
    {
        return this.mPlayer;
    }

    public GetCamera()
    {
        return this.mCamera;
    }

    public GetCanvasWidth()
    {
        return this.mCanvasWidth;
    }

    public GetCanvasHeight()
    {
        return this.mCanvasHeight;
    }

    public GetCanvas()
    {
        return this.mCanvas;
    }

    public WIN()
    {
        LevelController.Instance.SetStatus(1);
        LevelController.Instance.SetGameResult(GameResult.WIN);
        SoundPlayer.Instance.Stop();
        MessageDispatcher.Instance.Clear();
    }

    public LOSE()
    {
        LevelController.Instance.SetStatus(-1);
        LevelController.Instance.SetGameResult(GameResult.LOSE);
        SoundPlayer.Instance.Stop();
        MessageDispatcher.Instance.Clear();
    }

    public SetPlayer(player:Player)
    {
        this.mPlayer=player;
    }
    
    public SetIsFogged(fog:boolean)
    {
        this.mIsFogged=fog;
    }

    public SetFog(fog:Fog)
    {
        this.mFog=fog;
    }
}