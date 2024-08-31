import {Actor} from "./Actors/Actor";
import { Background } from "./Actors/Background/Background";
import {data} from "browserslist";
import InputManager from "./InputManager";
import MessageDispatcher from "./AI/Message/MessageDispatcher";
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
        Canvas.width=window.innerWidth;
        Canvas.height=window.innerHeight;
        document.body.appendChild(Canvas);
        // @ts-ignore
        this.mContext=Canvas.getContext('2d');
        if(!this.mContext)
        {
            console.log("Unable to create Context");
            return;
        }


        new Background(this);

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
        for(let iter of this.mActors)
        {
            iter.Draw(this.mContext);
        }
    }
    //Variables
    private mTickCount:number;
    public mIsRunning:boolean;
    //Sorted by Drawing Order
    private mActors:Actor[];
    //Canvas context
    private mContext:CanvasRenderingContext2D;
    private mInputManager:InputManager;
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

    //TODO: Get load texture for each actor
    public GetTexture(TextureName:string)
    {

    }
}