import Element from "../Element";
import Container from "../Containers/Container";
import {Vector2, Zone} from "../../Math";
import InputManager from "../../InputManager";
export default class Button extends Element
{
    constructor(owner:Container,pos:Vector2, zone:Zone)
    {
        super(owner, pos);
        let self=this;
        this.mZone=zone;
    }

    public Update()
    {
        super.Update();
        if(InputManager.Instance.leftbutton&&this.mZone.Inside(InputManager.Instance.GetMouseVec()))
        {
            this.OnClick();
        }
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {

    }

    //virtual
    public OnClick()
    {

    }

    //When the mouse click inside the zone, the button will active
    private mZone:Zone;
}