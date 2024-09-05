"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Actor_1 = require("../Actors/Actor");
const Math_1 = require("../Math");
const MessageDispatcher_1 = __importDefault(require("../AI/Message/MessageDispatcher"));
const MessageType_1 = require("../AI/Message/MessageType");
//May not compatible for monsters
//If collided, will send message to state, which will deal it
class CollisionComponent extends Component_1.Component {
    constructor(actor, updateOrder = 100, length) {
        super(actor, updateOrder);
        this.mCircleCollider = new Math_1.CircleCollider(this.GetOwner().GetPosition().Copy(), length);
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        this.mCircleCollider.mPosition = this.GetOwner().GetPosition().Copy();
        //Check for Actors
        for (let actor of this.GetOwner().GetGame().GetActors()) {
            //TODO May Optimize
            if (actor != this.GetOwner() && actor) {
                if (actor.GetType() == Actor_1.Type.Monster || actor.GetType() == Actor_1.Type.Player) {
                    this.Notice(actor);
                }
            }
        }
        //Check for terrain
    }
    Notice(actor) {
        if (actor.GetCollider().IntersectCircleCollider(this.GetCollider())) {
            //Only perform the OnCollide function of owner's self
            MessageDispatcher_1.default.Instance.DispatchMsg(0, actor, this.GetOwner(), MessageType_1.MessageType.CM_COLLIDE);
            //console.log("Collide");
        }
    }
    SetSize(length) {
        this.mCircleCollider.mLength = length;
    }
    GetCollider() {
        return this.mCircleCollider;
    }
}
exports.default = CollisionComponent;
//# sourceMappingURL=CollisionComponent.js.map