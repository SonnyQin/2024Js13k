//TODO Optimization
import Telegram from "./Telegram";
import {Actor} from "../../Actors/Actor";

export default class MessageDispatcher
{
    constructor()
    {
        this.mQueue=[];
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    public Discharge(receiver:Actor, telegram:Telegram)
    {
        if(!receiver.HandleMessage(telegram))
        {
            console.log(telegram.mMsg);
            console.log("Message unhandled");
        }
    }

    public DispatchMsg(delay:number, sender:Actor, receiver:Actor, msg:number, ExtraInfo:any=null):void
    {
        if(!receiver)
        {
            return;
        }

        let telegram=new Telegram(sender, receiver, msg, 0, ExtraInfo);
        if(delay<=0)
        {
            this.Discharge(receiver, telegram);
        }
        else
        {
            let currentTime=Date.now();
            telegram.mDispatchTime=currentTime+delay;
            this.Insert(telegram);
        }
    }

    public DispatchDelayedMessages():void
    {
        let currentTime=Date.now();
        while (this.mQueue.length>0&&this.mQueue[0].mDispatchTime<currentTime&&this.mQueue[0].mDispatchTime>0)
        {
            this.Discharge(this.mQueue[0].mReceiver,this.mQueue[0]);
            this.mQueue.splice(0,1);
        }
    }
    public Insert(telegram:Telegram):void
    {
        let i=0;
        for(;i<this.mQueue.length;i++)
        {
            if(this.mQueue[i].mDispatchTime>telegram.mDispatchTime)
                break;
        }
        this.mQueue.splice(i, 0, telegram);
    }

    private mQueue:Telegram[];
    private static _Instance:MessageDispatcher;
}