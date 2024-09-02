import {Component} from "./Component";
import {Actor} from "../Actors/Actor";
import {Vector2} from "../Math";

export default class MovementComponent extends Component
{
    constructor(actor:Actor, updateOrder:number=100)
    {
        super(actor,updateOrder);
        this.mMaxSpeed=100;
        this.mForwardSpeed=new Vector2(0,0);
    }
    
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        let pos=this.GetOwner().GetPosition();
        pos.AddVec(this.mForwardSpeed.Multiply(deltaTime));
    }

    //Variables
    //hard code
    private mMaxSpeed:number;
    private mForwardSpeed:Vector2;

    public SetForwardSpeed(speed:Vector2):void
    {
        if(speed.LengthSq()<this.mMaxSpeed*this.mMaxSpeed)
            this.mForwardSpeed=speed;
        else
        {
            this.mForwardSpeed=speed.Normalize().Multiply(this.mMaxSpeed);
        }
    }
    public GetForwardSpeed():Vector2
    {
        return this.mForwardSpeed;
    }
    public CalculateForwardSpeed(mousepos:Vector2):Vector2
    {
        let length=mousepos.MinusVec(this.GetOwner().GetPosition()).Length();
        if(length<30)
            return new Vector2();
        return mousepos.Normalize().Multiply(length/200*this.mMaxSpeed);
    }
}