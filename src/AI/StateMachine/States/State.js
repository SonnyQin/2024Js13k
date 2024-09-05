"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor() {
    }
    Enter(owner) { if (!owner)
        return; }
    Execute(owner) { if (!owner)
        return; }
    Exit(owner) { if (!owner)
        return; }
    //virtual
    OnMessage(owner, msg) { if (!owner)
        return false; }
}
exports.default = State;
//# sourceMappingURL=State.js.map