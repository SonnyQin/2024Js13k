import {Actor} from "./Actors/Actor";
import { Background } from "./Actors/Background/Background";
import {data} from "browserslist";
import InputManager from "./InputManager";
import MessageDispatcher from "./AI/Message/MessageDispatcher";
import Player from "./Actors/Player";
import Clock from "./Actors/Monsters/Clock";
import {Vector2} from "./Math";
export class Game
{
    constructor()
    {
        this.mIsRunning=true;
        this.mTickCount=0;
        this.mActors=[];
        // @ts-ignore
        this.mContext=null;
        this.mInputManager=new InputManager();
    }

    public Initialize():void
    {
        this.mTickCount=Date.now();

        let Canvas=document.createElement('canvas');
        if(!Canvas)
        {
            console.log("Unable to create Canvas");
            return;
        }
        this.mCanvasWidth=Canvas.width=window.innerWidth;
        this.mCanvasHeight=Canvas.height=window.innerHeight;
        document.body.appendChild(Canvas);
        // @ts-ignore
        this.mContext=Canvas.getContext('2d');
        if(!this.mContext)
        {
            console.log("Unable to create Context");
            return;
        }


        new Background(this);
        this.mPlayer=new Player(this);
        new Clock(this,1,new Vector2(100,100),1.0,true);


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
        this.mPlayer.ProcessInput(this.mInputManager);
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
    }
    private GenerateOutput():void
    {
        this.mContext.beginPath();
        this.mContext.clearRect(0,0,this.mCanvasWidth,this.mCanvasHeight);
        for(let iter of this.mActors)
        {
            iter.Draw(this.mContext);
        }
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
    //Canvas context
    private mContext:CanvasRenderingContext2D;
    private mInputManager:InputManager;
    // @ts-ignore
    private mPlayer:Player;

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
        this.mActors.filter((iter)=>iter!=actor);
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
}