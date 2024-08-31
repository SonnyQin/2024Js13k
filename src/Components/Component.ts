import {Actor} from "../Actors/Actor";

export class Component
{
    constructor(actor:Actor, updateOrder:number=100)
    {
        this.mOwner=actor;
        this.mUpdateOrder=updateOrder;
    }
    //virtual
    //TODO
    ProcessInput():void
    {

    }
    //virtual
    Update(deltaTime:number):void
    {

    }
    //Variables
    private mOwner:Actor;
    private mUpdateOrder:number;


    //Getters and Setters
    public GetUpdateOrder():number
    {
        return this.mUpdateOrder;
    }

    public SetUpdateOrder(updateOrder:number):void
    {
        this.mUpdateOrder=updateOrder;
    }
}