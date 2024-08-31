import {Actor} from "../Actor";
import {Game} from "../../Game";

export class Background extends Actor
{
    constructor(game:Game)
    {
        super(game,9999);
        //this.count=0;
    }

    UpdateActor(deltatime:number)
    {
        //this.count++;
    }
    Draw(ctx: CanvasRenderingContext2D)
    {
        super.Draw(ctx);
    }

    //Variables
    //public count:number;
}