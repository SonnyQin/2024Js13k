import {Type} from "../Actor";
import {Game} from "../../Game";
import Sprite from "../Sprite";
import {RandomInt, Vector2} from "../../Math";
import {paras} from "../../Parameters";
import {color} from "ansi-styles";
import LevelController from "../../LevelController";

//TODO Sequence may change
let Colors=["#8B0000", "#4B0082","#006400"];

//Defined as the most deep layer of the drawing, it will cover all the background of the game,
//and other layer of background, such as obstacles, decoration will be implemented as a sprite
export class Background extends Sprite
{
    constructor(game:Game, map:number[][])
    {
        super(game,-1,new Vector2(0,0));
        this.mMap=map;
        this.SetType(Type.Terrain);
        this.mSelectColor=Colors[LevelController.Instance.GetLevelNumber()];
    }

    UpdateActor(deltatime:number)
    {
        //this.count++;
    }
    Draw(ctx: CanvasRenderingContext2D)
    {
        //Maze's start position in world always be 0,0
        let cur=this.GetGame().GetCamera().TransformToView(new Vector2(0,0));
        let curx=cur.x;
        let cury=cur.y;

        for(let r of this.mMap)
        {
            for(let c of r)
            {
                switch (c)
                {
                    case 0:
                        ctx.fillStyle='grey';
                        break;
                    case 1:
                        ctx.fillStyle=this.mSelectColor;
                        break;
                    case 3:
                        ctx.fillStyle='#E3EDCD';
                        break;
                    case 4:
                        ctx.fillStyle='#FFD700';
                        break;
                }
                ctx.fillRect(curx, cury, paras.blocklength, paras.blocklength);
                curx+=paras.blocklength;
            }
            curx=cur.x;
            cury+=paras.blocklength;
        }
    }

    //Variables
    private mMap:number[][];
    private mSelectColor:string;
}