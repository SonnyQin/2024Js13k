"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BehaviorTypes = void 0;
const Math_1 = require("../Math");
const Parameters_1 = require("../Parameters");
var BehaviorTypes;
(function (BehaviorTypes) {
    BehaviorTypes[BehaviorTypes["none"] = 0] = "none";
    BehaviorTypes[BehaviorTypes["seek"] = 1] = "seek";
    BehaviorTypes[BehaviorTypes["pursuit"] = 2] = "pursuit";
})(BehaviorTypes || (exports.BehaviorTypes = BehaviorTypes = {}));
//TODO May implement more behaviors
//TODO May change some behaviors to make the devils looks funny when moving
//TODO May Check the correctness of each behavior
class SteeringBehaviors {
    constructor(owner) {
        this.mOwner = owner;
        this.mSteeringForce = new Math_1.Vector2();
        this.mTarget = owner.GetGame().GetPlayer();
        this.mFlag = BehaviorTypes.none;
        this.mTargetPos = new Math_1.Vector2();
        this.MaxForce = 1000;
    }
    Seek(targetPos) {
        let DesiredVelocity = (0, Math_1.VmiV)(this.mTargetPos, this.mOwner.GetPosition()).Normalize().Multiply(this.mOwner.GetMaxSpeed());
        return DesiredVelocity.MinusVec(this.mOwner.GetVelocity());
    }
    Pursuit(evader) {
        let ToEvader = (0, Math_1.VmiV)(evader.GetPosition(), this.mOwner.GetPosition());
        //Assuming head towards player
        this.mOwner.SetHeading((0, Math_1.VmiV)(evader.GetPosition(), this.mOwner.GetPosition()).Normalize());
        let RelativeHeading = this.mOwner.GetHeading().Dot(evader.GetHeading());
        if ((ToEvader.Dot(this.mOwner.GetHeading()) > 0) &&
            (RelativeHeading < -0.95)) //acos(0.95)=18 degs
         {
            return this.Seek(evader.GetPosition());
        }
        let LookAheadTime = 0;
        if (evader.GetSpeed() != 0) {
            LookAheadTime = ToEvader.Length() / evader.GetSpeed();
        }
        //LookAheadTime*Player.Velocity+Player.pos
        this.mTargetPos = (0, Math_1.VaV)((0, Math_1.VmN)(evader.GetVelocity(), LookAheadTime), evader.GetPosition());
        return this.Seek(this.mTargetPos);
    }
    On(bt) {
        return (this.mFlag & bt) == bt;
    }
    SeekOn() { this.mFlag |= BehaviorTypes.seek; }
    PursuitOn() { this.mFlag |= BehaviorTypes.pursuit; }
    SeekOff() { if (this.On(BehaviorTypes.seek))
        this.mFlag ^= BehaviorTypes.seek; }
    PursuitOff() { if (this.On(BehaviorTypes.pursuit))
        this.mFlag ^= BehaviorTypes.pursuit; }
    AccumulateForce(RT, ForceToAdd) {
        let MagnitudeSoFar = RT.Length();
        let MagnitudeRemaining = this.MaxForce - MagnitudeSoFar;
        if (MagnitudeRemaining <= 0.0)
            return false;
        let MagnitudeToAdd = ForceToAdd.Length();
        if (MagnitudeToAdd < MagnitudeRemaining) {
            RT.AddVec(ForceToAdd);
        }
        else {
            //add it to the steering force
            RT.AddVec(ForceToAdd.Normalize().Multiply(MagnitudeRemaining));
        }
        return true;
    }
    //TODO
    SumForces() {
        let force = new Math_1.Vector2();
        if (this.On(BehaviorTypes.seek)) {
            force.AddVec(this.Seek(this.mTargetPos));
            if (!this.AccumulateForce(this.mSteeringForce, force))
                return this.mSteeringForce;
        }
        if (this.On(BehaviorTypes.pursuit) && this.mTarget) {
            force.AddVec(this.Pursuit(this.mTarget));
            if (!this.AccumulateForce(this.mSteeringForce, force))
                return this.mSteeringForce;
        }
        return this.mSteeringForce;
    }
    Calculate() {
        this.mSteeringForce = this.SumForces();
        this.mSteeringForce.Truncate(Parameters_1.paras.MonsterMaxForce);
        return this.mSteeringForce;
    }
}
exports.default = SteeringBehaviors;
//# sourceMappingURL=SteeringBehaviors.js.map