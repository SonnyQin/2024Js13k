//Containing all types of monsters
import {Difficulty, DifficultyInfo} from "../Background/TerrainGenerator";
import {Game} from "../../Game";
import Alien from "./Alien";
import {Random, RandomInt, Vector2} from "../../Math";
import {paras} from "../../Parameters";
import {isBoolean} from "util";
import {Actor} from "../Actor";
import Beverage from "./Beverage";
import Disk from "./Disk";
import Light from "./Light";
import Clock from "./Clock";
import Watermelon from "./Watermelon";
import Treasure from "./Disk";
import MazeGenerator from "../Background/MazeGenerator";

export enum MonsterList
{
    Alien,
    Beverage,
    Clock,
    Disk,
    Light,
    Watermelon,
    LENGTH,
}

//Generate in random of different types of monsters
export default class MonsterGenerator
{
    constructor()
    {
        this.mMonsterMap=[];
        this.mMapLength=MazeGenerator.Instance.GetMapArr().length;
        for (let i = 0; i <this.mMapLength ; i++) {
            this.mMonsterMap[i] = [];
            for (let j = 0; j < this.mMapLength; j++) {
                this.mMonsterMap[i][j] = false;
            }
        }
    }

    private RandomOffset():number
    {
        return Random(-paras.blocklength, paras.blocklength/2);
    }

    private RandomScale():number
    {
        return Random(0.8,1.2);
    }

    private RandomLocation():Vector2
    {
        let vecx=RandomInt(0, this.mMapLength-1);
        let vecy=RandomInt(0, this.mMapLength-1);
        if(!this.mMonsterMap[vecx][vecy])
        {
            this.mMonsterMap[vecx][vecy]=true;
            let vec=MazeGenerator.Instance.GetLocation(new Vector2(vecx, vecy));
            return vec.AddVec(new Vector2(this.RandomOffset(), this.RandomOffset()));
        }
        else
            return this.RandomLocation();
    }

    private RandomChoose(game:Game, isEvil:boolean)
    {
        let r=RandomInt(0, MonsterList.LENGTH-1);
        switch (r)
        {
            case 0:
                return new Alien(game, 1,this.RandomLocation(),this.RandomScale(), isEvil);
            case 1:
                return new Beverage(game, 1,this.RandomLocation(),this.RandomScale(),isEvil);
            case 2:
                return new Clock(game, 1,this.RandomLocation(),this.RandomScale(),isEvil);
            case 3:
                return new Disk(game, 1,this.RandomLocation(),this.RandomScale(),isEvil);
            case 4:
                return new Light(game, 1,this.RandomLocation(),this.RandomScale(),isEvil);
            case 5:
                return new Watermelon(game, 1,this.RandomLocation(),this.RandomScale(),isEvil);
        }
    }

    public Generate(game:Game, info:any)
    {
        for(let i=0;i<info.numOfObjects;i++)
        {
            this.RandomChoose(game, false);
        }
        for(let i=0;i<info.numOfMonsters;i++)
        {
            this.RandomChoose(game, true);
        }
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:MonsterGenerator;
    
    private mMonsterMap:boolean[][];
    private mMapLength:number;
}