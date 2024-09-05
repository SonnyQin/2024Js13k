import Player from "../../../Actors/Player";
import State from "./State";
import Telegram from "../../Message/Telegram";
import {MessageType} from "../../Message/MessageType";
import {paras} from "../../../Parameters";

export default class PlayerGlobalState extends State<Player>
{
    constructor() {
        super();
    }

    Enter(owner: Player | null) {
        super.Enter(owner);
    }

    Execute(owner: Player)
    {
        if(owner.GetTiredness()>paras.TThre)
        {
            owner.GetFSM().ChangeState(PSTired.Instance);
        }
        else
            if(owner.GetTiredness()>paras.TRThre)
            {
                if((owner.GetFSM().isInState(PSAlert.Instance)&&!owner.IsPursuited())||owner.GetFSM().isInState(PSTired.Instance))
                {
                    owner.GetFSM().ChangeState(PSRelief.Instance);
                }
                else
                    owner.GetFSM().ChangeState(PSNormal.Instance);
            }
            else
            {
                if(!owner.IsPursuited())
                    owner.GetFSM().ChangeState(PSNormal.Instance);
            }
    }

    Exit(owner: Player | null) {
        super.Exit(owner);
    }

    OnMessage(owner: Player, msg: Telegram): boolean
    {
        switch (msg.mMsg)
        {
            case MessageType.PM_NORMAL:
                owner.SetIsPursuited(false);
                owner.GetFSM().ChangeState(PSNormal.Instance);
                return true;
            case MessageType.PM_ALERT:
                owner.SetIsPursuited(true);
                owner.GetFSM().ChangeState(PSAlert.Instance);
                return true;
            case MessageType.PM_ESCAPE:
                owner.SetIsPursuited(true);
                owner.GetFSM().ChangeState(PSEscape.Instance);
                return true;
            case MessageType.PM_WIN:
                owner.GetFSM().ChangeState(PSWIN.Instance);
                return true;
            case MessageType.PM_LOSE:
                owner.GetFSM().ChangeState(PSLOSE.Instance);
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
    }

    Execute(owner: Player)
    {
        owner.AddTiredness(paras.TiredTiredness);
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
    }

    private static _Instance:PSLOSE;
}
