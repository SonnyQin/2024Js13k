import {VaV, Vector2, VmiV, VmN, VmV} from "../Math";
import {Actor} from "../Actors/Actor";
import Player from "../Actors/Player";
import now from "performance-now";
import MonsterBase from "../Actors/Monsters/MonsterBase";
import {paras} from "../Parameters";

export enum BehaviorTypes
{
    none = 0x0000,
    seek=0x0001,
    pursuit=0x0002,
}

//TODO May implement more behaviors
//TODO May change some behaviors to make the devils looks funny when moving
//TODO May Check the correctness of each behavior
export default class SteeringBehaviors
{
    constructor(owner:MonsterBase)
    {
        this.mOwner=owner;
        this.mSteeringForce=new Vector2();
        this.mTarget=owner.GetGame().GetPlayer();
        this.mFlag=BehaviorTypes.none;
        this.mTargetPos=new Vector2();
        this.MaxForce=1000;
    }

    public Seek(targetPos:Vector2):Vector2
    {
        let DesiredVelocity= VmiV(this.mTargetPos,this.mOwner.GetPosition()).Normalize().Multiply(this.mOwner.GetMaxSpeed());
        return DesiredVelocity.MinusVec(this.mOwner.GetVelocity());
    }

    public Pursuit(evader:Player):Vector2
    {
        let ToEvader=VmiV(evader.GetPosition(), this.mOwner.GetPosition());

        //Assuming head towards player
        this.mOwner.SetHeading(VmiV(evader.GetPosition(),this.mOwner.GetPosition()).Normalize());

        let RelativeHeading=this.mOwner.GetHeading().Dot(evader.GetHeading());
        if ( (ToEvader.Dot(this.mOwner.GetHeading()) > 0) &&
            (RelativeHeading < -0.95))  //acos(0.95)=18 degs
        {
            return this.Seek(evader.GetPosition());
        }


        let LookAheadTime=0;
        if(evader.GetSpeed()!=0)
        {
            LookAheadTime=ToEvader.Length()/evader.GetSpeed();
        }
        //LookAheadTime*Player.Velocity+Player.pos
        this.mTargetPos=VaV(VmN(evader.GetVelocity(),LookAheadTime),evader.GetPosition());
        return this.Seek(this.mTargetPos);
    }

    public On(bt:BehaviorTypes):boolean
    {
        return (this.mFlag & bt) == bt;
    }

    public SeekOn(){this.mFlag |= BehaviorTypes.seek;}
    public PursuitOn(){this.mFlag |= BehaviorTypes.pursuit;}



    public SeekOff()  {if(this.On(BehaviorTypes.seek))   this.mFlag ^=BehaviorTypes.seek;}
    public PursuitOff(){if(this.On(BehaviorTypes.pursuit)) this.mFlag ^=BehaviorTypes.pursuit;}



    public AccumulateForce(RT:Vector2, ForceToAdd:Vector2):boolean
    {
        let MagnitudeSoFar=RT.Length();
        let MagnitudeRemaining=this.MaxForce-MagnitudeSoFar;
        if (MagnitudeRemaining <= 0.0) return false;
        let MagnitudeToAdd = ForceToAdd.Length();

        if (MagnitudeToAdd < MagnitudeRemaining)
        {
            RT.AddVec(ForceToAdd);
        }

        else
        {
            //add it to the steering force
            RT.AddVec(ForceToAdd.Normalize().Multiply(MagnitudeRemaining))
        }
        return true;
    }

    //TODO
    public SumForces():Vector2
    {
        let force=new Vector2();
        if(this.On(BehaviorTypes.seek))
        {
            force.AddVec(this.Seek(this.mTargetPos))
            if (!this.AccumulateForce(this.mSteeringForce, force)) return this.mSteeringForce;
        }
        if(this.On(BehaviorTypes.pursuit)&&this.mTarget)
        {
            force.AddVec(this.Pursuit(this.mTarget))
            if (!this.AccumulateForce(this.mSteeringForce, force)) return this.mSteeringForce;
        }
        return this.mSteeringForce;
    }

    public Calculate()
    {
        this.mSteeringForce=this.SumForces();
        this.mSteeringForce.Truncate(paras.MonsterMaxForce);
        return this.mSteeringForce;
    }

    private mOwner:MonsterBase;
    private mSteeringForce:Vector2;
    private mTarget:Player|null;
    private mTargetPos:Vector2;
    private mFlag;
    private MaxForce:number;
}