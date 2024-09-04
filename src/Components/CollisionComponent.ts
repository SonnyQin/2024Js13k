import {Component} from "./Component";
import {Actor, Type} from "../Actors/Actor";
import {CircleCollider} from "../Math";
import MonsterBase from "../Actors/Monsters/MonsterBase";
import Player from "../Actors/Player";
import MessageDispatcher from "../AI/Message/MessageDispatcher";
import {MessageType} from "../AI/Message/MessageType";

//May not compatible for monsters
//If collided, will send message to state, which will deal it
export default class CollisionComponent extends Component
{
    constructor(actor:Actor, updateOrder:number=100, length:number)
    {
        super(actor, updateOrder);
        this.mCircleCollider=new CircleCollider(this.GetOwner().GetPosition().Copy(), length);
    }

    Update(deltaTime: number)
    {
        super.Update(deltaTime);
        this.mCircleCollider.mPosition=this.GetOwner().GetPosition().Copy();
        //Check for Actors
        for(let actor of this.GetOwner().GetGame().GetActors())
        {
            //TODO May Optimize
            if(actor!=this.GetOwner()&&actor)
            {
                if(actor.GetType()==Type.Monster||actor.GetType()==Type.Player)
                {
                    this.Notice(actor as MonsterBase|Player)
                }
            }
        }

        //Check for terrain
    }

    public Notice(actor:any)
    {
        if(actor.GetCollider().IntersectCircleCollider(this.GetCollider()))
        {
            //Only perform the OnCollide function of owner's self
            MessageDispatcher.Instance.DispatchMsg(0,actor, this.GetOwner(), MessageType.CM_COLLIDE);
            //console.log("Collide");
        }
    }

    public SetSize(length:number)
    {
        this.mCircleCollider.mLength=length;
    }

    public GetCollider()
    {
        return this.mCircleCollider;
    }

    //AABBBox wrap around the actor
    private mCircleCollider:CircleCollider;
}