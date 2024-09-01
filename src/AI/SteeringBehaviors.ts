import {Vector2} from "../Math";
import {Actor} from "../Actors/Actor";

export enum BehaviorTypes
{
    none = 0x0000,
}

//TODO May implement more behaviors
//TODO May change some behaviors to make the devils looks funny when moving
export default class SteeringBehaviors
{
    constructor(owner:Actor)
    {
        this.mOwner=owner;
        this.mSteeringForce=new Vector2();
    }

    //TODO
    public AccumulateForce(sf:Vector2, ForceToAdd:Vector2)
    {

    }

    //TODO
    public SumForces():void
    {

    }

    private mOwner:Actor;
    private mSteeringForce:Vector2;
}