import {Actor} from "../../Actors/Actor";

export default class Telegram
{
    constructor(Sender:Actor, Receiver:Actor, Msg:number, DispatchTime:number,ExtraInfo:any)
    {
        this.mSender=Sender;
        this.mReceiver=Receiver;
        this.mMsg=Msg;
        this.mDispatchTime=DispatchTime;
        this.mExtraInfo=ExtraInfo;
    }
    public mSender:Actor;
    public mReceiver:Actor;
    public mMsg:number;
    public mDispatchTime:number;
    public mExtraInfo:any;

    //TODO Dereference to Type
}