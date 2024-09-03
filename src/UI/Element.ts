import {Vector2} from "../Math";
import {Game} from "../Game";
import Container from "./Containers/Container";


export default class Element
{
    constructor(owner:Container,pos:Vector2)
    {
        this.mOwner=owner;
        this.mPosition=pos;
    }

    public GetPosition():Vector2
    {
        return this.mPosition;
    }

    //Receiving input and update itself
    //virtual
    public Update()
    {

    }

    //virtual
    public Draw(ctx:CanvasRenderingContext2D)
    {

    }

    public GetOwner()
    {
        return this.mOwner;
    }

    private mOwner:Container;
    private mPosition:Vector2;
}