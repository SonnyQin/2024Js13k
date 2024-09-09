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
        this.mCircleCollider = new Math_1.CircleCollider(this.GetOwner().GetPosition(), length);
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        if (this.GetOwner().GetType() != Actor_1.Type.Player)
            return;
        this.mCircleCollider.mPosition = this.GetOwner().GetPosition().Copy();
        //Check for Actors
        for (let actor of this.GetOwner().GetGame().GetActors()) {
            if (actor.GetType() == Actor_1.Type.Monster) {
                // @ts-ignore
                if (actor.GetCollider().IntersectCircleCollider(this.GetCollider())) {
                    if (actor != this.GetOwner() && actor && actor.GetIsEvil()) {
                        MessageDispatcher_1.default.Instance.DispatchMsg(0, actor, this.GetOwner(), MessageType_1.MessageType.PM_LOSE);
                        return;
                    }
                }
            }
        }
        //Check for terrain
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