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
const SoundManager_1 = __importDefault(require("../../../Sound/SoundManager"));
/*import SoundPlayer from "../../../Sound/SoundPlayer";*/
function CChangeState(owner, newState) {
    if (!owner.GetFSM().isInState(newState) && !owner.GetFSM().isInState(PSWIN.Instance) && !owner.GetFSM().isInState(PSLOSE.Instance))
        owner.GetFSM().ChangeState(newState);
}
function Check(owner) {
    return owner.GetFSM().isInState(PSWIN.Instance) || owner.GetFSM().isInState(PSLOSE.Instance);
}
class PlayerGlobalState extends State_1.default {
    constructor() {
        super();
    }
    Enter(owner) {
    }
    Execute(owner) {
        if (Check(owner))
            return;
        if (owner.GetTiredness() > Parameters_1.paras.TThre) {
            if (!owner.GetFSM().isInState(PSTired.Instance))
                CChangeState(owner, PSTired.Instance);
        }
    }
    Exit(owner) {
        super.Exit(owner);
    }
    OnMessage(owner, msg) {
        switch (msg.mMsg) {
            case MessageType_1.MessageType.PM_NORMAL:
                if (!Check(owner))
                    CChangeState(owner, PSNormal.Instance);
                return true;
            case MessageType_1.MessageType.PM_ALERT:
                owner.AddPursuit(msg.mSender);
                //If already in EScape state, Ignore Alert
                if (!owner.GetFSM().isInState(PSEscape.Instance) && !owner.GetFSM().isInState(PSTired.Instance))
                    if (!Check(owner))
                        CChangeState(owner, PSAlert.Instance);
                return true;
            case MessageType_1.MessageType.PM_ESCAPE:
                owner.AddPursuit(msg.mSender);
                if (!Check(owner) && !owner.GetFSM().isInState(PSTired.Instance))
                    CChangeState(owner, PSEscape.Instance);
                return true;
            case MessageType_1.MessageType.PM_WIN:
                if (!Check(owner))
                    CChangeState(owner, PSWIN.Instance);
                //TODO Set the song to play once and clear all other sound
                MessageDispatcher_1.default.Instance.DispatchMsg(4000, owner, owner, MessageType_1.MessageType.GAMEWIN);
                return true;
            case MessageType_1.MessageType.PM_LOSE:
                if (!Check(owner))
                    CChangeState(owner, PSLOSE.Instance);
                MessageDispatcher_1.default.Instance.DispatchMsg(4000, owner, owner, MessageType_1.MessageType.GAMELOSE);
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
                        if (!Check(owner))
                            CChangeState(owner, PSTired.Instance);
                    }
                    else if (owner.GetTiredness() < Parameters_1.paras.TThre && owner.GetTiredness() > Parameters_1.paras.TRThre) {
                        if (!Check(owner))
                            CChangeState(owner, PSRelief.Instance);
                    }
                    else {
                        if (!Check(owner))
                            CChangeState(owner, PSNormal.Instance);
                    }
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerNormalSpeed);
        SoundManager_1.default.Instance.Play('S_Normal');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Normal');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerReliefSpeed);
        SoundManager_1.default.Instance.Play('S_Alert');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.FearTiredness);
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Alert');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerEscapeSpeed);
        SoundManager_1.default.Instance.Play('S_Escape');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.EscapeTiredness);
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Escape');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerTiredSpeed);
        SoundManager_1.default.Instance.Play('S_Tired');
    }
    Execute(owner) {
        if (owner.IsPursuited())
            owner.AddTiredness(Parameters_1.paras.TiredTiredness);
        else
            owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Tired');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerReliefSpeed);
        SoundManager_1.default.Instance.Play('S_Relief');
    }
    Execute(owner) {
        owner.AddTiredness(Parameters_1.paras.RecoverTiredness);
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Relief');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerNormalSpeed);
        SoundManager_1.default.Instance.Play('S_Win');
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Win');
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
        owner.SetMaxSpeed(Parameters_1.paras.PlayerNormalSpeed);
        SoundManager_1.default.Instance.Play('S_Lose');
    }
    Exit(owner) {
        SoundManager_1.default.Instance.Stop('S_Lose');
    }
}
exports.PSLOSE = PSLOSE;
//# sourceMappingURL=PlayerStates.js.map