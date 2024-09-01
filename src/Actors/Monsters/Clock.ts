import MonsterBase from "./MonsterBase";
import {Game} from "../../Game";

//A base for mosters that changing its image
export default class Clock extends MonsterBase
{
    constructor(game:Game,drawOrder:number=1, scale:number,isEvil:boolean)
    {
        super(game, drawOrder, scale, isEvil);
    }
}