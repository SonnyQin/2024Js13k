"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MSWandering = exports.MSAttacking = exports.MSPursuiting = exports.MSHiding = void 0;
const State_1 = __importDefault(require("./State"));
const MessageType_1 = require("../../Message/MessageType");
class MonsterGlobalState extends State_1.default {
    constructor() {
        super();
    }
    Enter(owner) {
        owner.GetSteering().SeekOn();
    }
    OnMessage(owner, msg) {
        switch (msg.mMsg) {
            case MessageType_1.MessageType.MM_PERSUIT:
                owner.SetActive(true);
                if (!owner.GetFSM().isInState(MSPursuiting.Instance)) {
                    owner.GetFSM().ChangeState(MSPursuiting.Instance);
                }
                return true;
        }
        return false;
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = MonsterGlobalState;
class MSHiding extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.MSHiding = MSHiding;
class MSPursuiting extends State_1.default {
    constructor() {
        super();
    }
    Enter(owner) {
        owner.GetSteering().PursuitOn();
    }
    Execute(owner) {
    }
    Exit(owner) {
        owner.GetSteering().PursuitOff();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.MSPursuiting = MSPursuiting;
class MSAttacking extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.MSAttacking = MSAttacking;
class MSWandering extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.MSWandering = MSWandering;
//# sourceMappingURL=MonsterStates.js.map