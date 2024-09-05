"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Element {
    constructor(owner, pos) {
        this.mOwner = owner;
        this.mPosition = pos;
    }
    GetPosition() {
        return this.mPosition;
    }
    //Receiving input and update itself
    //virtual
    Update() {
    }
    //virtual
    Draw(ctx) {
    }
    GetOwner() {
        return this.mOwner;
    }
}
exports.default = Element;
//# sourceMappingURL=Element.js.map