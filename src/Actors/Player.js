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
const Sprite_1 = __importDefault(require("./Sprite"));
const Math_1 = require("../Math");
const MovementComponent_1 = __importDefault(require("../Components/MovementComponent"));
const StateMachine_1 = __importDefault(require("../AI/StateMachine/StateMachine"));
const Actor_1 = require("./Actor");
const SenseComponent_1 = __importDefault(require("../Components/SenseComponent"));
const PlayerStates_1 = __importStar(require("../AI/StateMachine/States/PlayerStates"));
const CollisionComponent_1 = __importDefault(require("../Components/CollisionComponent"));
const Parameters_1 = require("../Parameters");
const MazeGenerator_1 = __importDefault(require("./Background/MazeGenerator"));
//May not use mAssets, use SelectAssets Instead, and will hard code the
//image in state
class Player extends Sprite_1.default {
    constructor(game, drawOrder = 1, scale = 1.0) {
        //hard code
        let pos = MazeGenerator_1.default.Instance.GetLocation(MazeGenerator_1.default.Instance.GetStartPos());
        super(game, 0, new Math_1.Vector2(pos.x, pos.y), 1.0);
        this.mc = new MovementComponent_1.default(this, 100, 500);
        this.sc = new SenseComponent_1.default(this);
        this.cc = new CollisionComponent_1.default(this, 100, Parameters_1.paras.PlayerSize);
        this.mStateMachine = new StateMachine_1.default(this);
        this.mStateMachine.SetGlobalState(PlayerStates_1.default.Instance);
        this.mStateMachine.SetCurrentState(PlayerStates_1.PSNormal.Instance);
        this.SetType(Actor_1.Type.Player);
        //Hard code default image;
        this.mSelectImage = '😃';
        this.mSize = Parameters_1.paras.PlayerSize;
        this.mTiredness = 0;
        this.mIsPursuited = false;
        this.mActive = false;
    }
    ProcessInput(keyState) {
        if (keyState.leftbutton)
            this.mActive = true;
        if (this.mActive)
            this.mc.SetForwardSpeed(this.mc.CalculateForwardSpeed(keyState.GetMouseVec()));
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        this.mStateMachine.Update();
        console.log(this.mTiredness);
        console.log(this.IsPursuited());
    }
    Draw(context) {
        this.DrawImage(context, this.mSelectImage, this.mSize);
        let pos = this.GetGame().GetCamera().TransformToView(this.GetPosition());
        context.arc(pos.x, pos.y, this.mSize, 0, 2 * Math.PI);
        context.stroke();
        context.moveTo(0, 0);
        context.lineTo(pos.x, pos.y);
        context.stroke();
    }
    HandleMessage(telegram) {
        return this.mStateMachine.HandleMessage(telegram);
    }
    GetFSM() {
        return this.mStateMachine;
    }
    SetSelectImage(image) {
        this.mSelectImage = image;
    }
    SetSize(num) {
        this.mSize = num;
    }
    GetSpeed() {
        return this.mc.GetForwardSpeed().Length();
    }
    GetVelocity() {
        return this.mc.GetForwardSpeed();
    }
    GetMaxSpeed() {
        return this.mc.GetMaxSpeed();
    }
    GetTiredness() {
        return this.mTiredness;
    }
    AddTiredness(tired) {
        this.mTiredness += tired;
        if (this.mTiredness < 0)
            this.mTiredness = 0;
        if (this.mTiredness > Parameters_1.paras.MaxTiredness)
            this.mTiredness = Parameters_1.paras.MaxTiredness;
    }
    //Determine the velocity according to how tired
    TiredVelocity() {
    }
    GetCollider() {
        return this.cc.GetCollider();
    }
    IsPursuited() {
        return this.mIsPursuited;
    }
    SetIsPursuited(is) {
        this.mIsPursuited = is;
    }
}
exports.default = Player;
//# sourceMappingURL=Player.js.map