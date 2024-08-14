import {Game} from "../Game";
import {Component} from "../Components/Component";
import {Vector2} from "../Math";

export class Actor
{

    constructor(game:Game)
    {
        //Remember to initilize all variables
        this.mPosition=new Vector2(0,0);
        this.mRotation=0;
        this.mComponents=[];
        this.mGame=game;
    }
    public AddComponent(component:Component):void
    {
        for(let i=0;i<this.mComponents.length;i++)
        {
            if(this.mComponents[i].GetUpdateOrder()>component.GetUpdateOrder())
            {
                this.mComponents=this.mComponents.splice(i, 0, component);
            }
        }
    }
    public RemoveComponent(component:Component):void
    {
        //Need to be checked
        this.mComponents=this.mComponents.filter((iter)=>iter!=component);
    }
    public Update(deltaTime:number):void
    {
        this.UpdateActor(deltaTime);
        this.UpdateComponents(deltaTime);
    }
    //Virtual Function, determined by implementation
    private UpdateActor(deltaTime:number):void
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
    public Draw():void
    {

    }

    //Variables
    private mPosition:Vector2;
    private mRotation:number;
    private mComponents:Component[];
    private mGame:Game;

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
    
}