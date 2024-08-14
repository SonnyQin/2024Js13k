import {Actor} from "./Actors/Actor";
export class Game
{
    constructor()
    {
        this.mIsRunning=true;
        this.mTickCount=0;
        this.mActors=[];
    }

    public Initialize():void
    {
        this.mTickCount=Date.now();
        this.mCanvas=document.getElementById('canvas');
    }

    public RunLoop():void
    {
        this.ProcessInput();
        this.UpdateGame();
        this.GenerateOutput();
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
        console.log(deltatime);
        this.mTickCount=Date.now();
        for(let iter of this.mActors)
        {
            iter.Update(deltatime);
        }
    }
    private GenerateOutput():void
    {
        for(let iter of this.mActors)
        {
            iter.Draw();
        }
    }
    //Variables
    private mTickCount:number;
    public mIsRunning:boolean;
    private mActors:Actor[];
    private mCanvas:;
//Functions about actors
    /*AddActor(actor:Actor):void
    {
        this.mActors.push(actor);
    }
    RemoveActor(actor:Actor):void
    {

    }*/

    //Getters and Setters
    public GetCanvas()
    {
        return this.mCanvas;
    }
}