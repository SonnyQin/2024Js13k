import {Game} from "../Game";
import {Component} from "../Components/Component";
import {Vector2} from "../Math";
import Telegram from "../AI/Message/Telegram";

export enum Type
{
    Actor,
    Player,
    Monster,
    Terrain,
}


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
        this.mType=Type.Actor;
        this.mHeading=new Vector2();
        this.mGame=game;
        this.mIsTagged=false;
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

    public TransformToView()
    {
        return this.GetGame().GetCamera().TransformToView(this.GetPosition());
    }

    //Variables
    private mPosition:Vector2;
    //TODO Might abandon this attribute
    private mRotation:number;
    private mHeading:Vector2;
    private mComponents:Component[];
    private mGame:Game;
    //Painter's algorithm
    private mDrawOrder:number;
    private mType:Type;
    private mIsTagged:boolean;

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

    public GetType():Type
    {
        return this.mType;
    }

    public SetType(type:Type):void
    {
        this.mType=type;
    }
    
    public GetGame():Game
    {
        return this.mGame;
    }

    public GetHeading():Vector2
    {
        return this.mHeading;
    }

    public SetHeading(heading:Vector2)
    {
        this.mHeading=heading;
    }

    public GetTag()
    {
        return this.mIsTagged;
    }

    public SetTag(tag:boolean)
    {
        this.mIsTagged=tag;
    }
}