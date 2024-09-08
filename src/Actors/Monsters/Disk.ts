import MonsterBase from "./MonsterBase";
import {Game} from "../../Game";
import {Vector2} from "../../Math";

export default class Treasure extends MonsterBase
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number, isEvil:boolean)
    {
        super(game,drawOrder,pos,scale,isEvil);
        this.mAssets={'🛸':97};
    }
}