import MonsterBase from "./MonsterBase";
import {Game} from "../../Game";
import {Vector2} from "../../Math";

export default class Treasure extends MonsterBase
{
    constructor(game:Game,drawOrder:number=1, pos:Vector2,scale:number,IsEvil:boolean)
    {
        super(game,drawOrder,pos,scale,IsEvil);
        this.mAssets={'🎃':97};
    }
}