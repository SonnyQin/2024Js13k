//Containing all types of monsters
import {Difficulty, DifficultyInfo} from "../Background/TerrainGenerator";
import {Game} from "../../Game";

export enum MonsterList
{

}
//Generate in random of different types of monsters
export default class MonsterGenerator
{
    constructor()
    {

    }

    public Generate(game:Game, info)
    {

    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:MonsterGenerator;
}