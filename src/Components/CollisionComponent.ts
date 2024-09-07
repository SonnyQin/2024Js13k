import {Component} from "./Component";
import {Actor, Type} from "../Actors/Actor";
import {CircleCollider} from "../Math";
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
        if(this.GetOwner().GetType()!=Type.Player)
            return;
        this.mCircleCollider.mPosition=this.GetOwner().GetPosition().Copy();
        //Check for Actors
        for(let actor of this.GetOwner().GetGame().GetActors())
        {
            if(actor.GetType()==Type.Monster)
            {
                if(actor!=this.GetOwner()&&actor)
                {
                    // @ts-ignore
                    if(actor.GetCollider().IntersectCircleCollider(this.GetCollider()))
                    {
                        MessageDispatcher.Instance.DispatchMsg(0,actor, this.GetOwner(), MessageType.PM_LOSE);
                        return;
                    }
                }
            }
        }

        //Check for terrain
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