//Containing all types of monsters
export enum MonsterList
{

}
//Generate in random of different types of monsters
export default class MonsterGenerator
{
    constructor()
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