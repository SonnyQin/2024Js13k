import Element from "../Element";
import Container from "../Containers/Container";
import {Vector2, Zone} from "../../Math";
import InputManager from "../../InputManager";
export default class Button extends Element
{
    constructor(owner:Container,pos:Vector2, width:number, length:number)
    {
        super(owner, pos);
        let self=this;
        this.mZone=new Zone(pos, width, length);
    }

    public Update()
    {
        super.Update();
        //console.log(InputManager.Instance.leftbutton)
        if(InputManager.Instance.leftbutton)
        {
            //console.log(InputManager.Instance.GetMouseVec());
            if(this.mZone.Inside(InputManager.Instance.GetMouseVec()))
            {
                this.OnClick();
            }
        }
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {

    }

    //virtual
    public OnClick()
    {

    }

    public GetZone()
    {
        return this.mZone;
    }

    //When the mouse click inside the zone, the button will active
    private mZone:Zone;
}