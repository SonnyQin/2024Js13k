import {Game} from "../Game";
import {Component} from "../Components/Component";
import {Vector2} from "../Math";
import Telegram from "../AI/Message/Telegram";

export class Actor
{

    constructor(game:Game,drawOrder:number=1, position:Vector2)
    {
        //Remember to initilize all variables
        this.mPosition=position;
        this.mRotation=0;
        this.mComponents=[];
        this.mGame=game;
        this.mDrawOrder=drawOrder;
        game.AddActor(this);
    }
    public AddComponent(component:Component):void
    {
        let i=0;
        for(;i<this.mComponents.length;i++)
        {
            if(this.mComponents[i].GetUpdateOrder()>component.GetUpdateOrder())
                break;
        }
       this.mComponents.splice(i, 0, component);
    }
    public RemoveComponent(component:Component):void
    {
        //Need to be checked
        this.mComponents.filter((iter)=>iter!=component);
    }
    public Update(deltaTime:number):void
    {
        this.UpdateActor(deltaTime);
        this.UpdateComponents(deltaTime);
    }
    //Virtual Function, determined by implementation
    protected UpdateActor(deltaTime:number):void
    {

    }
    private UpdateComponents(deltaTime:number):void
    {
        for(let iter of this.mComponents)
        {
            iter.Update(deltaTime);
        }
    }

    //virtual
    public Draw(context:CanvasRenderingContext2D):void
    {

    }

    //pure virtual
    //TODO May Check for return
    public HandleMessage(telegram:Telegram):boolean|void
    {

    }

    //Variables
    private mPosition:Vector2;
    //TODO Might abandon this attribute
    private mRotation:number;
    private mComponents:Component[];
    private mGame:Game;
    //Painter's algorithm
    private mDrawOrder:number;

    //Getter and Setter
    public SetPosition(vec:Vector2):void
    {
        this.mPosition=vec;
    }
    public GetPosition():Vector2
    {
        return  this.mPosition;
    }
    public SetRotation(rotation:number):void
    {
        this.mRotation=rotation;
    }
    public GetRotation():number
    {
        return this.mRotation;
    }

    public GetDrawOrder():number
    {
        return this.mDrawOrder;
    }

    public SetDrawOrder(drawOrder:number):void
    {
        this.mDrawOrder=drawOrder;
    }

}