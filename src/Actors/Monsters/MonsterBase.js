"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//A boolean to decide whether the monster is evil or not
//Add steering Behaviors and statemachine to control the logic of monsters
//Might shake but don't change rotation which results in calculation
const Sprite_1 = __importDefault(require("../Sprite"));
const SteeringBehaviors_1 = __importDefault(require("../../AI/SteeringBehaviors"));
const Math_1 = require("../../Math");
const StateMachine_1 = __importDefault(require("../../AI/StateMachine/StateMachine"));
const Actor_1 = require("../Actor");
const MonsterStates_1 = __importStar(require("../../AI/StateMachine/States/MonsterStates"));
const MovementComponent_1 = __importDefault(require("../../Components/MovementComponent"));
const CollisionComponent_1 = __importDefault(require("../../Components/CollisionComponent"));
const Parameters_1 = require("../../Parameters");
class MonsterBase extends Sprite_1.default {
    constructor(game, drawOrder = 1, pos, scale, isEvil) {
        super(game, drawOrder, pos);
        this.mIsEvil = true;
        this.mSteeringBehaviors = new SteeringBehaviors_1.default(this);
        //先这么写
        this.mOffset = new Math_1.Vector2();
        this.mStateMachine = new StateMachine_1.default(this);
        this.mStateMachine.SetGlobalState(MonsterStates_1.default.Instance);
        this.mStateMachine.SetCurrentState(MonsterStates_1.MSHiding.Instance);
        this.mIsHide = true;
        this.SetType(Actor_1.Type.Monster);
        this.mc = new MovementComponent_1.default(this, 100, 150);
        this.cc = new CollisionComponent_1.default(this, 100, Parameters_1.paras.MonsterSize);
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        this.mStateMachine.Update();
        let SteeringForce = this.mSteeringBehaviors.Calculate().Copy();
        let Acceleration = (0, Math_1.VdN)(SteeringForce, Parameters_1.paras.MonsterMass);
        let Velocity = this.mc.GetForwardSpeed().Copy();
        Velocity.AddVec(Acceleration);
        Velocity.Truncate(Parameters_1.paras.MonsterMaxSpeed);
        this.mc.SetForwardSpeed(Velocity);
    }
    Draw(context) {
        super.Draw(context);
        if (this.mIsEvil && this.mStateMachine.GetCurrentState() != MonsterStates_1.MSHiding.Instance) {
            this.DrawThirteen(context, this.mOffset);
        }
        let pos = this.GetGame().GetCamera().TransformToView(this.GetPosition());
        context.arc(pos.x, pos.y, Parameters_1.paras.MonsterSize, 0, 2 * Math.PI);
        context.stroke();
    }
    //TODO May add some gradually appear and gradually disappear effect
    DrawThirteen(ctx, offset) {
        ctx.fillStyle = "red";
        ctx.font = "20px Georgia";
        let pos = this.TransformToView();
        ctx.fillText("13", pos.x + offset.x, pos.y + offset.y);
        ctx.stroke();
    }
    HandleMessage(telegram) {
        return this.mStateMachine.HandleMessage(telegram);
    }
    GetFSM() {
        return this.mStateMachine;
    }
    GetMaxSpeed() {
        return this.mc.GetMaxSpeed();
    }
    GetVelocity() {
        return this.mc.GetForwardSpeed();
    }
    GetCollider() {
        return this.cc.GetCollider();
    }
    GetSteering() {
        return this.mSteeringBehaviors;
    }
}
exports.default = MonsterBase;
//# sourceMappingURL=MonsterBase.js.map