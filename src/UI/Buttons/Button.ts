import Element from "../Element";
import Container from "../Containers/Container";
import { Vector2, Zone } from "../../Math";
import InputManager from "../../InputManager";
import LevelController, {LevelStatus} from "../../LevelController";

export default class Button extends Element {
    private mZone: Zone;

    constructor(owner: Container, pos: Vector2, width: number, height: number, label: string) {
        super(owner, pos);
        this.mZone = new Zone(pos, width, height);
        this.label = label;
    }

    private label: string;

    public Update(): void {
        super.Update();

        const mousePosition = InputManager.Instance.GetMouseVec();
        const isMouseOver = this.mZone.Inside(mousePosition);

        if (InputManager.Instance.leftbutton)
        {
            if (isMouseOver)
            {
                this.OnClick();
            }
        }
    }

    //virtual
    public OnClick()
    {
        LevelController.Instance.SetStatus(LevelStatus.GameState);
        LevelController.Instance.BeginLevel();
    }

    public Draw(ctx: CanvasRenderingContext2D): void {

        let posx=this.GetPosition().x-this.mZone.mWidth/2;
        let posy=this.GetPosition().y-this.mZone.mLength/2;

        ctx.fillStyle = "lightgrey";
        ctx.fillRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);

        ctx.strokeStyle = "black";
        ctx.strokeRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, posx + this.mZone.mWidth / 2, posy + this.mZone.mLength / 2);
    }
}
