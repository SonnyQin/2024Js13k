"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(actor, updateOrder = 100) {
        this.mOwner = actor;
        this.mUpdateOrder = updateOrder;
        actor.AddComponent(this);
    }
    //virtual
    Update(deltaTime) {
    }
    //Getters and Setters
    GetUpdateOrder() {
        return this.mUpdateOrder;
    }
    SetUpdateOrder(updateOrder) {
        this.mUpdateOrder = updateOrder;
    }
    GetOwner() {
        return this.mOwner;
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map