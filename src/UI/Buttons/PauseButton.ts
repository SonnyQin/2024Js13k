import Button from "./Button";
import Container from "../Containers/Container";
import {Vector2, Zone} from "../../Math";

export default class PauseButton extends Button
{
    constructor(owner:Container)
    {
        super(owner, new Vector2(500,100), 100, 50);
    }

    public Update()
    {
        super.Update();
    }

    public Draw(ctx: CanvasRenderingContext2D)
    {
        super.Draw(ctx);
        ctx.fillStyle='blue';
        ctx.font='20px';
        ctx.fillRect(this.GetPosition().x-50, this.GetPosition().y-25, 100, 50);
        //ctx.fillText("Pause",this.GetPosition().x, this.GetPosition().y);
        ctx.stroke();
        //"⌛"
    }

    public OnClick()
    {
        super.OnClick();
    }
}