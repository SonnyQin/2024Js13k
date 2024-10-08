import Player from "../../../Actors/Player";
import State from "./State";
import Telegram from "../../Message/Telegram";
import {MessageType} from "../../Message/MessageType";
import {paras} from "../../../Parameters";
import MessageDispatcher from "../../Message/MessageDispatcher";
import {CPlayer} from "../../../Sound/SoundBox";
import {S_Normal} from "../../../Sound/Songs/S_Normal";
import SoundPlayer from "../../../Sound/SoundPlayer";
import {S_Win} from "../../../Sound/Songs/S_Win";
import {S_Escape} from "../../../Sound/Songs/S_Escape";
import {S_Lose} from "../../../Sound/Songs/S_Lose";
import {S_Relief} from "../../../Sound/Songs/S_Relief";
import {S_Alert} from "../../../Sound/Songs/S_Alert";
import SoundManager from "../../../Sound/SoundManager";
import {Instance} from "chalk";
/*import SoundPlayer from "../../../Sound/SoundPlayer";*/

function CChangeState(owner:Player, newState:any)
{
    if(!owner.GetFSM().isInState(newState)&&!owner.GetFSM().isInState(PSWIN.Instance)&&!owner.GetFSM().isInState(PSLOSE.Instance))
    owner.GetFSM().ChangeState(newState);
}

function Check(owner:Player)
{
    return owner.GetFSM().isInState(PSWIN.Instance) || owner.GetFSM().isInState(PSLOSE.Instance);

}
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
        if(Check(owner))
            return;
        if(owner.GetTiredness()>paras.TThre)
        {
            if(!owner.GetFSM().isInState(PSTired.Instance))
                CChangeState(owner,PSTired.Instance);
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
                if(!Check(owner))
                    CChangeState(owner,PSNormal.Instance);
                return true;
            case MessageType.PM_ALERT:
                owner.AddPursuit(msg.mSender);
                //If already in EScape state, Ignore Alert
                if(!owner.GetFSM().isInState(PSEscape.Instance)&&!owner.GetFSM().isInState(PSTired.Instance))
                    if(!Check(owner))
                        CChangeState(owner,PSAlert.Instance);
                return true;
            case MessageType.PM_ESCAPE:
                owner.AddPursuit(msg.mSender);
                if(!Check(owner)&&!owner.GetFSM().isInState(PSTired.Instance))
                    CChangeState(owner,PSEscape.Instance);
                return true;
            case MessageType.PM_WIN:
                if(!Check(owner))
                CChangeState(owner,PSWIN.Instance);
                //TODO Set the song to play once and clear all other sound
                MessageDispatcher.Instance.DispatchMsg(4000,owner,owner,MessageType.GAMEWIN);
                return true;
            case MessageType.PM_LOSE:
                if(!Check(owner))
                    CChangeState(owner,PSLOSE.Instance);
                MessageDispatcher.Instance.DispatchMsg(4000,owner,owner,MessageType.GAMELOSE);
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
                        if(!Check(owner))
                        CChangeState(owner, PSTired.Instance);
                    }
                    else
                    if(owner.GetTiredness()<paras.TThre&&owner.GetTiredness()>paras.TRThre)
                    {
                        if(!Check(owner))
                            CChangeState(owner,PSRelief.Instance);
                    }
                    else
                    {
                        if(!Check(owner))
                        CChangeState(owner,PSNormal.Instance);
                    }
                }
                return true;

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
        owner.SetMaxSpeed(paras.PlayerNormalSpeed);

        SoundManager.Instance.Play('S_Normal');

    }

    Execute(owner: Player)
    {
        owner.AddTiredness(paras.RecoverTiredness);
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Normal');
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
        owner.SetMaxSpeed(paras.PlayerReliefSpeed);
        SoundManager.Instance.Play('S_Alert');
    }

    Execute(owner: Player)
    {
        owner.AddTiredness(paras.FearTiredness);
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Alert');
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
        owner.SetMaxSpeed(paras.PlayerEscapeSpeed);
        SoundManager.Instance.Play('S_Escape');
    }

    Execute(owner: Player)
    {
            owner.AddTiredness(paras.EscapeTiredness);
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Escape');
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

    Enter(owner: Player)
    {
        owner.SetSelectImage('🥵');
        owner.SetMaxSpeed(paras.PlayerTiredSpeed);

        SoundManager.Instance.Play('S_Tired');
    }

    Execute(owner: Player)
    {
        if(owner.IsPursuited())
            owner.AddTiredness(paras.TiredTiredness);
        else
            owner.AddTiredness(paras.RecoverTiredness);
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Tired');
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
        owner.SetMaxSpeed(paras.PlayerReliefSpeed);
        SoundManager.Instance.Play('S_Relief');
    }
    Execute(owner: Player)
    {
        owner.AddTiredness(paras.RecoverTiredness);
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Relief');
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
        owner.SetMaxSpeed(paras.PlayerNormalSpeed);
        SoundManager.Instance.Play('S_Win');
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Win');
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
        owner.SetMaxSpeed(paras.PlayerNormalSpeed);
        SoundManager.Instance.Play('S_Lose');
    }

    Exit(owner: Player)
    {
        SoundManager.Instance.Stop('S_Lose');
    }

    private static _Instance:PSLOSE;
}
