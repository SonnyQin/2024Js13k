import {Actor} from "../Actor";
import {Game} from "../../Game";
import Sprite from "../Sprite";

//Defined as the most deep layer of the drawing, it will cover all the background of the game,
//and other layer of background, such as obstacles, decoration will be implemented as a sprite
export class Background extends Sprite
{
    constructor(game:Game)
    {
        super(game,9999);
    }

    UpdateActor(deltatime:number)
    {
        //this.count++;
    }
    Draw(ctx: CanvasRenderingContext2D)
    {
        super.Draw(ctx);
        ctx.font = '500px FontAwesome';
        ctx.fillText("🧝‍♀️",500,500,1000);
    }

    //Variables
}