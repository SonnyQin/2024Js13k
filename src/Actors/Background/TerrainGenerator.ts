//Randomly generating terrains for different time player start the game
import MazeGenerator from "./MazeGenerator";
import MonsterGenerator from "../Monsters/MonsterGenerator";
import {paras} from "../../Parameters";
import {Vector2} from "../../Math";

export default class TerrainGenerator
{
    constructor()
    {
        MazeGenerator.Instance.creatMap(paras.MapR, paras.MapC);
        MazeGenerator.Instance.DetermineSE();
    }


    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:TerrainGenerator;

}