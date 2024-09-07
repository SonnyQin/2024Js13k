import Player from "../../../Actors/Player";
import State from "./State";
import Telegram from "../../Message/Telegram";
import {MessageType} from "../../Message/MessageType";
import {paras} from "../../../Parameters";
import MessageDispatcher from "../../Message/MessageDispatcher";

export default class PlayerGlobalState extends State<Player>
{
    constructor() {
        super();
    }

    Enter(owner: Player)
    {

    }

    Execute(owner: Player)
    {
        if(owner.GetFSM().isInState(PSWIN.Instance)||owner.GetFSM().isInState(PSLOSE.Instance))
            return;
        if(owner.GetTiredness()>paras.TThre)
        {
            owner.GetFSM().ChangeState(PSTired.Instance);
        }
        if(owner.GetFSM().GetCurrentState())
            console.log(owner.GetFSM().GetCurrentState());
    }

    Exit(owner: Player | null) {
        super.Exit(owner);
    }

    OnMessage(owner: Player, msg: Telegram): boolean
    {
        switch (msg.mMsg)
        {
            case MessageType.PM_NORMAL:
                owner.GetFSM().ChangeState(PSNormal.Instance);
                return true;
            case MessageType.PM_ALERT:
                owner.AddPursuit(msg.mSender);
                //If already in EScape state, Ignore Alert
                if(!owner.GetFSM().isInState(PSEscape.Instance))
                    owner.GetFSM().ChangeState(PSAlert.Instance);
                return true;
            case MessageType.PM_ESCAPE:
                owner.AddPursuit(msg.mSender);
                owner.GetFSM().ChangeState(PSEscape.Instance);
                return true;
            case MessageType.PM_WIN:
                owner.GetFSM().ChangeState(PSWIN.Instance);
                MessageDispatcher.Instance.DispatchMsg(300,owner,owner,MessageType.GAMELOSE);
                return true;
            case MessageType.PM_LOSE:
                owner.GetFSM().ChangeState(PSLOSE.Instance);
                MessageDispatcher.Instance.DispatchMsg(300,owner,owner,MessageType.GAMELOSE);
                return true;
            case MessageType.GAMEWIN:
                owner.GetGame().Stop();
                owner.GetGame().WIN();
                return true;
            case MessageType.GAMELOSE:
                owner.GetGame().Stop();
                owner.GetGame().LOSE();
                return true;
            //Meaning the player escaped the pursuit
            case MessageType.PM_FLED:
                owner.RemovePursuit(msg.mSender);
                if(!owner.IsPursuited())
                {
                    if(owner.GetTiredness()>paras.TThre)
                    {
                        owner.GetFSM().ChangeState(PSTired.Instance);
                    }
                    else
                    if(owner.GetTiredness()<paras.TThre&&owner.GetTiredness()>paras.TRThre)
                    {
                        owner.GetFSM().ChangeState(PSRelief.Instance);
                    }
                    else
                    {
                        owner.GetFSM().ChangeState(PSNormal.Instance);
                    }
                }

        }
        return false;
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:PlayerGlobalState;
}

export class PSNormal extends State<Player>
{
    constructor() {
        super();
    }
    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player)
    {
        super.Enter(owner);
        owner.SetSelectImage('😃');
        owner.SetSpeed(paras.PlayerNormalSpeed);
    }

    Execute(owner: Player)
    {
        owner.AddTiredness(paras.RecoverTiredness);
    }

    Exit(owner: Player)
    {

    }

    private static _Instance:PSNormal;
}
export class PSAlert extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player)
    {
        owner.SetSelectImage('😨');
        owner.SetSpeed(paras.PlayerReliefSpeed);

    }

    Execute(owner: Player)
    {
        owner.AddTiredness(paras.FearTiredness);
    }

    Exit(owner: Player)
    {

    }

    private static _Instance:PSAlert;
}

export class PSEscape extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player) {
        owner.SetSelectImage('😱');
        owner.SetSpeed(paras.PlayerEscapeSpeed);
    }

    Execute(owner: Player)
    {
            owner.AddTiredness(paras.EscapeTiredness);
    }

    private static _Instance:PSEscape;
}

export class PSTired extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player) {
        owner.SetSelectImage('🥵');
        owner.SetSpeed(paras.PlayerTiredSpeed);
    }

    Execute(owner: Player)
    {
        if(owner.IsPursuited())
            owner.AddTiredness(paras.TiredTiredness);
        else
            owner.AddTiredness(paras.RecoverTiredness);
    }

    private static _Instance:PSTired;
}

export class PSRelief extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player) {
        owner.SetSelectImage('🥶');
        owner.SetSpeed(paras.PlayerReliefSpeed);
    }
    Execute(owner: Player)
    {
        owner.AddTiredness(paras.RecoverTiredness);
    }

    private static _Instance:PSRelief;
}

export class PSWIN extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player) {
        owner.SetSelectImage('🥳');
        owner.SetSpeed(paras.PlayerNormalSpeed);
    }

    private static _Instance:PSWIN;
}

export class PSLOSE extends State<Player>
{
    constructor() {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    Enter(owner: Player) {
        owner.SetSelectImage('😭');
        owner.SetSpeed(paras.PlayerNormalSpeed);
    }

    private static _Instance:PSLOSE;
}
