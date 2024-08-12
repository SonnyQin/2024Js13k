import {Actor} from "./Actor";

export class Game
{
    constructor()
    {
        this.mIsRunning=true;
        this.mTickCount=0;
    }

    public Initialize():void
    {

    }

    public RunLoop():void
    {
        this.ProcessInput();
        this.UpdateGame();
        this.GenerateOutput();
        //console.log("Looping");
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

    }
    private GenerateOutput():void
    {

    }
    //Variables
    private mTickCount:number;
    public mIsRunning:boolean;
    //private mActors:Actor[];
//Functions about actors
    /*AddActor(actor:Actor):void
    {
        this.mActors.push(actor);
    }
    RemoveActor(actor:Actor):void
    {

    }*/
}