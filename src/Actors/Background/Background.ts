import {Actor} from "../Actor";
import {Game} from "../../Game";
import Sprite from "../Sprite";
import {Vector2} from "../../Math";
import InputManager from "../../InputManager";
import {paras} from "../../Parameters";

//Defined as the most deep layer of the drawing, it will cover all the background of the game,
//and other layer of background, such as obstacles, decoration will be implemented as a sprite
export class Background extends Sprite
{
    constructor(game:Game, map:number[][])
    {
        super(game,-1,new Vector2(0,0));
        this.mMap=map;
    }

    UpdateActor(deltatime:number)
    {
        //this.count++;
    }
    Draw(ctx: CanvasRenderingContext2D)
    {

        let curx=0;
        let cury=0;
        for(let r of this.mMap)
        {
            for(let c of r)
            {
                if(c==0)
                {
                    ctx.fillStyle='grey';
                }
                else
                {
                    ctx.fillStyle='red';
                }
                ctx.fillRect(curx, cury, paras.blocklength, paras.blocklength);
                curx+=paras.blocklength;
            }
            curx=0;
            cury+=paras.blocklength;
        }
    }

    //Variables
    private mMap:number[][];
}