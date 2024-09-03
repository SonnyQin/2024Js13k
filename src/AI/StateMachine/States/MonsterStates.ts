import State from "./State";
import MonsterBase from "../../../Actors/Monsters/MonsterBase";
import Telegram from "../../Message/Telegram";
import {MessageType} from "../../Message/MessageType";

export default class MonsterGlobalState extends State<MonsterBase>
{
    constructor()
    {
        super();
    }

    Enter(owner: MonsterBase) {

    }


    OnMessage(owner: MonsterBase, msg: Telegram): boolean
    {
        switch (msg.mMsg)
        {
            case MessageType.MM_PERSUIT:
                owner.GetFSM().ChangeState(MSPursuiting.Instance);
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

    private static _Instance:MonsterGlobalState;
}

export class MSHiding extends State<MonsterBase>
{
    constructor()
    {
        super();
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:MSHiding;
}

export class MSPursuiting extends State<MonsterBase>
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

    private static _Instance:MSPursuiting;
}

export class MSAttacking extends State<MonsterBase>
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

    private static _Instance:MSAttacking;
}

export class MSTargetLost extends State<MonsterBase>
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

    private static _Instance:MSTargetLost;
}