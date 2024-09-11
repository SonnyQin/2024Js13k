import {Component} from "./Component";
import {Actor, Type} from "../Actors/Actor";
import MessageDispatcher from "../AI/Message/MessageDispatcher";
import {MessageType} from "../AI/Message/MessageType";
import Player from "../Actors/Player";
import MonsterBase from "../Actors/Monsters/MonsterBase";

export default class SenseComponent extends Component
{
    constructor(actor:Player, updateOrder:number=100)
    {
        super(actor, updateOrder);
        this.mAlertDis=800;
        this.mDangerDis=350;
    }

    Update(deltaTime: number)
    {
        super.Update(deltaTime);
        for(let actor of this.GetOwner().GetGame().GetActors())
        {
            if(actor.GetType()==Type.Monster&&(actor as MonsterBase).GetIsEvil())
            {
                let dis=actor.GetPosition().DisTo(this.GetOwner().GetPosition());
                if(dis<this.mDangerDis)
                {
                    //Change State to escape
                    MessageDispatcher.Instance.DispatchMsg(0,actor, this.GetOwner(), MessageType.PM_ESCAPE);

                    //Ask monster to pursuit
                    MessageDispatcher.Instance.DispatchMsg(0.5,this.GetOwner(),actor,MessageType.MM_PERSUIT);
                }
                else
                    if(dis<this.mAlertDis)
                    {
                        //Change State to escape
                        MessageDispatcher.Instance.DispatchMsg(0,actor, this.GetOwner() , MessageType.PM_ALERT);
                    }
                    else
                    {
                        MessageDispatcher.Instance.DispatchMsg(0,actor, this.GetOwner() , MessageType.PM_FLED);
                    }
            }
        }
    }

    //Within this distance, the player will change in to
    private mAlertDis:number;
    //Within this distance, the monster will start to chase
    private mDangerDis:number;
}