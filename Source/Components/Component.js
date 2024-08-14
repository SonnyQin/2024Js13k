"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
class Component {
    constructor(actor, updateOrder = 100) {
        this.mOwner = actor;
        this.mUpdateOrder = updateOrder;
    }
    //virtual
    //TODO
    ProcessInput() {
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
}
exports.Component = Component;
