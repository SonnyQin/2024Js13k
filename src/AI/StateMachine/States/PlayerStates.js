"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PSLOSE = exports.PSWIN = exports.PSRelief = exports.PSTired = exports.PSEscape = exports.PSAlert = exports.PSNormal = void 0;
const State_1 = __importDefault(require("./State"));
const MessageType_1 = require("../../Message/MessageType");
const Parameters_1 = require("../../../Parameters");
const MessageDispatcher_1 = __importDefault(require("../../Message/MessageDispatcher"));
class PlayerGlobalState extends State_1.default {
    constructor() {
        super();
    }
    Enter(owner) {
    }
    Execute(owner) {
        if (owner.GetFSM().isInState(PSWIN.Instance) || owner.GetFSM().isInState(PSLOSE.Instance))
            return;
        if (owner.GetTiredness() > Parameters_1.paras.TThre) {
            owner.GetFSM().ChangeState(PSTired.Instance);
        }
        if (owner.GetFSM().GetCurrentState())
            console.log(owner.GetFSM().GetCurrentState());
    }
    Exit(owner) {
        super.Exit(owner);
    }
    OnMessage(owner, msg) {
        switch (msg.mMsg) {
            case MessageType_1.MessageType.PM_NORMAL:
                owner.GetFSM().ChangeState(PSNormal.Instance);
                return true;
            case MessageType_1.MessageType.PM_ALERT:
                owner.AddPursuit(msg.mSender);
                //If already in EScape state, Ignore Alert
                if (!owner.GetFSM().isInState(PSEscape.Instance))
                    owner.GetFSM().ChangeState(PSAlert.Instance);
                return true;
            case MessageType_1.MessageType.PM_ESCAPE:
                owner.AddPursuit(msg.mSender);
                owner.GetFSM().ChangeState(PSEscape.Instance);
                return true;
            case MessageType_1.MessageType.PM_WIN:
                owner.GetFSM().ChangeState(PSWIN.Instance);
                MessageDispatcher_1.default.Instance.DispatchMsg(300, owner, owner, MessageType_1.MessageType.GAMELOSE);
                return true;
            case MessageType_1.MessageType.PM_LOSE:
                owner.GetFSM().ChangeState(PSLOSE.Instance);
                MessageDispatcher_1.default.Instance.DispatchMsg(300, owner, owner, MessageType_1.MessageType.GAMELOSE);
                return true;
            case MessageType_1.MessageType.GAMEWIN:
                owner.GetGame().Stop();
                owner.GetGame().WIN();
                return true;
            case MessageType_1.MessageType.GAMELOSE:
                owner.GetGame().Stop();
                owner.GetGame().LOSE();
                return true;
            //Meaning the player escaped the pursuit
            case MessageType_1.MessageType.PM_FLED:
                owner.RemovePursuit(msg.mSender);
                if (!owner.IsPursuited()) {
                    if (owner.GetTiredness() > Parameters_1.paras.TThre) {
                        owner.GetFSM().ChangeState(PSTired.Instance);
                    }
                    else if (owner.GetTiredness() < Parameters_1.paras.TThre && owner.GetTiredness() > Parameters_1.paras.TRThre) {
                        owner.GetFSM().ChangeState(PSRelief.Instance);
                    }
                    else {
                        owner.GetFSM().ChangeState(PSNormal.Instance);
                    }
                }
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
        owner.SetSpeed(Parameters_1.paras.PlayerNormalSpeed);
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
        owner.SetSpeed(Parameters_1.paras.PlayerReliefSpeed);
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
        owner.SetSpeed(Parameters_1.paras.PlayerEscapeSpeed);
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
        owner.SetSpeed(Parameters_1.paras.PlayerTiredSpeed);
    }
    Execute(owner) {
        if (owner.IsPursuited())
            owner.AddTiredness(Parameters_1.paras.TiredTiredness);
        else
            owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
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
        owner.SetSpeed(Parameters_1.paras.PlayerReliefSpeed);
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
        owner.SetSpeed(Parameters_1.paras.PlayerNormalSpeed);
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
        owner.SetSpeed(Parameters_1.paras.PlayerNormalSpeed);
    }
}
exports.PSLOSE = PSLOSE;
//# sourceMappingURL=PlayerStates.js.map