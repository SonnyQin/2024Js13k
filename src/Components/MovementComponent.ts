import {Component} from "./Component";
import {Actor} from "../Actors/Actor";
import {Vector2} from "../Math";

export default class MovementComponent extends Component
{
    constructor(actor:Actor, updateOrder:number=100, maxSpeed:number=100)
    {
        super(actor,updateOrder);
        this.mMaxSpeed=maxSpeed;
        this.mForwardSpeed=new Vector2(0,0);
    }
    
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        //TODO
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

    public GetMaxSpeed():number
    {
        return this.mMaxSpeed;
    }
    public CalculateForwardSpeed(mousepos:Vector2):Vector2
    {
        let worldMousepos=this.GetOwner().GetGame().GetCamera().ReverseTransform(mousepos);
        let length=worldMousepos.MinusVec(this.GetOwner().GetPosition()).Length();
        this.GetOwner().SetHeading(worldMousepos.Normalize());
        if(length<30)
            return new Vector2();
        return worldMousepos.Normalize().Multiply(length/200*this.mMaxSpeed);
    }

    public SetMaxSpeed(speed:number)
    {
        this.mMaxSpeed=speed;
    }
}