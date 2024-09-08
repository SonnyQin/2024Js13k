//Randomly generating terrains for different time player start the game
import MazeGenerator from "./MazeGenerator";
import MonsterGenerator from "../Monsters/MonsterGenerator";
import {paras} from "../../Parameters";
import {Vector2} from "../../Math";
import { Game } from "../../Game";
import Fog from "../../Camera/Fog";
import {Background} from "./Background";
import Player from "../Player";

export enum Difficulty
{
    Easy,
    Medium,
    Hard,
}

export let DifficultyInfo=
    {
        0:{
            numOfObjects:10,
            numOfMonsters:10,
            mapSize:10,
            isFogged:false,
        },
        1:{
            numOfObjects:20,
            numOfMonsters:15,
            mapSize: 20,
            isFogged: false,
        },
        2:{
            numOfObjects:40,
            numOfMonsters:35,
            mapSize:40,
            isFogged:true,
        }
}

export default class TerrainGenerator
{
    constructor()
    {
        this.mDifficulty=Difficulty.Easy;
    }

    public Generate(game:Game)
    {
        //new Treasure(this,1,MazeGenerator.Instance.GetWinZone().mPosition,1.0);
        let info = DifficultyInfo[this.mDifficulty as keyof typeof DifficultyInfo];

        MazeGenerator.Instance.creatMap(info.mapSize, info.mapSize);
        MazeGenerator.Instance.DetermineSE();

        game.SetPlayer(new Player(game));

        new Background(game, MazeGenerator.Instance.GetMapArr());

        if(info.isFogged)
            new Fog(game);

        //MonsterGenerator.Instance.Generate(game, info);

    }

    public AddDifficulty()
    {
        this.mDifficulty++;
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:TerrainGenerator;

    private mDifficulty:number;

}