import {Component} from "./Component";
import {Actor} from "../Actors/Actor";
import {Vector2} from "../Math";

export default class MovementComponent extends Component
{
    constructor(actor:Actor, updateOrder:number=100)
    {
        super(actor,updateOrder);
        this.mMaxSpeedSq=10000;
        this.mForwardSpeed=new Vector2(0,0);
    }
    
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        let pos=this.GetOwner().GetPosition();
        pos.x+=this.mForwardSpeed.x;
        pos.y+=this.mForwardSpeed.y;
    }

    //Variables
    //hard code
    private mMaxSpeedSq:number;
    private mForwardSpeed:Vector2;

    public SetForwardSpeed(speed:Vector2):void
    {
        if(speed.LengthSq()<this.mMaxSpeedSq)
            this.mForwardSpeed=speed;
        else
            this.mForwardSpeed=
    }
    public GetForwardSpeed():Vector2
    {
        return this.mForwardSpeed;
    }
    public static CalculateForwardSpeed(mousepos:Vector2):Vector2
    {

    }
}