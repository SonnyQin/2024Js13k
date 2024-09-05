"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSLOSE = exports.PSWIN = exports.PSRelief = exports.PSTired = exports.PSEscape = exports.PSAlert = exports.PSNormal = void 0;
const State_1 = __importDefault(require("./State"));
const MessageType_1 = require("../../Message/MessageType");
const Parameters_1 = require("../../../Parameters");
class PlayerGlobalState extends State_1.default {
    constructor() {
        super();
    }
    Enter(owner) {
        super.Enter(owner);
    }
    Execute(owner) {
        if (owner.GetTiredness() > Parameters_1.paras.TThre) {
            owner.GetFSM().ChangeState(PSTired.Instance);
        }
        else if (owner.GetTiredness() > Parameters_1.paras.TRThre) {
            if ((owner.GetFSM().isInState(PSAlert.Instance) && !owner.IsPursuited()) || owner.GetFSM().isInState(PSTired.Instance)) {
                owner.GetFSM().ChangeState(PSRelief.Instance);
            }
            else
                owner.GetFSM().ChangeState(PSNormal.Instance);
        }
        else {
            if (!owner.IsPursuited())
                owner.GetFSM().ChangeState(PSNormal.Instance);
        }
    }
    Exit(owner) {
        super.Exit(owner);
    }
    OnMessage(owner, msg) {
        switch (msg.mMsg) {
            case MessageType_1.MessageType.PM_NORMAL:
                owner.SetIsPursuited(false);
                owner.GetFSM().ChangeState(PSNormal.Instance);
                return true;
            case MessageType_1.MessageType.PM_ALERT:
                owner.SetIsPursuited(true);
                owner.GetFSM().ChangeState(PSAlert.Instance);
                return true;
            case MessageType_1.MessageType.PM_ESCAPE:
                owner.SetIsPursuited(true);
                owner.GetFSM().ChangeState(PSEscape.Instance);
                return true;
            case MessageType_1.MessageType.PM_WIN:
                owner.GetFSM().ChangeState(PSWIN.Instance);
                return true;
            case MessageType_1.MessageType.PM_LOSE:
                owner.GetFSM().ChangeState(PSLOSE.Instance);
        }
        return false;
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
}
exports.default = PlayerGlobalState;
class PSNormal extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        super.Enter(owner);
        owner.SetSelectImage('😃');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
    }
    Exit(owner) {
    }
}
exports.PSNormal = PSNormal;
class PSAlert extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('😨');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.FearTiredness);
    }
    Exit(owner) {
    }
}
exports.PSAlert = PSAlert;
class PSEscape extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('😱');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.EscapeTiredness);
    }
}
exports.PSEscape = PSEscape;
class PSTired extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('🥵');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.TiredTiredness);
    }
}
exports.PSTired = PSTired;
class PSRelief extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('🥶');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
    }
}
exports.PSRelief = PSRelief;
class PSWIN extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('🥳');
    }
}
exports.PSWIN = PSWIN;
class PSLOSE extends State_1.default {
    constructor() {
        super();
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Enter(owner) {
        owner.SetSelectImage('😭');
    }
}
exports.PSLOSE = PSLOSE;
//# sourceMappingURL=PlayerStates.js.map