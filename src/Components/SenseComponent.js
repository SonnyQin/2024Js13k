"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Actor_1 = require("../Actors/Actor");
const MessageDispatcher_1 = __importDefault(require("../AI/Message/MessageDispatcher"));
const MessageType_1 = require("../AI/Message/MessageType");
class SenseComponent extends Component_1.Component {
    constructor(actor, updateOrder = 100) {
        super(actor, updateOrder);
        this.mAlertDis = 500;
        this.mDangerDis = 300;
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        for (let actor of this.GetOwner().GetGame().GetActors()) {
            if (actor.GetType() == Actor_1.Type.Monster && actor.GetIsEvil()) {
                let dis = actor.GetPosition().DisTo(this.GetOwner().GetPosition());
                if (dis < this.mDangerDis) {
                    //Change State to escape
                    MessageDispatcher_1.default.Instance.DispatchMsg(0, actor, this.GetOwner(), MessageType_1.MessageType.PM_ESCAPE);
                    //Ask monster to pursuit
                    MessageDispatcher_1.default.Instance.DispatchMsg(0.5, this.GetOwner(), actor, MessageType_1.MessageType.MM_PERSUIT);
                }
                else if (dis < this.mAlertDis) {
                    //Change State to escape
                    MessageDispatcher_1.default.Instance.DispatchMsg(0, actor, this.GetOwner(), MessageType_1.MessageType.PM_ALERT);
                }
                else {
                    MessageDispatcher_1.default.Instance.DispatchMsg(0, actor, this.GetOwner(), MessageType_1.MessageType.PM_FLED);
                }
            }
        }
    }
}
exports.default = SenseComponent;
//# sourceMappingURL=SenseComponent.js.map