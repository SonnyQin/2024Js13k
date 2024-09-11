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

        let posx = this.GetPosition().x - this.mZone.mWidth / 2;
        let posy = this.GetPosition().y - this.mZone.mLength / 2;

// 设置厄运风格的背景色（深灰色或黑色）
        ctx.fillStyle = "#333333"; // 深灰色
        ctx.fillRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);

// 设置厄运风格的边框颜色（暗红色）
        ctx.strokeStyle = "#8B0000"; // 暗红色
        ctx.strokeRect(posx, posy, this.mZone.mWidth, this.mZone.mLength);

// 设置厄运风格的文本颜色（白色或暗红色）
        ctx.fillStyle = "#FFFFFF"; // 白色
        ctx.font = "bold 18px 'Georgia'"; // 更具戏剧性的字体
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.label, posx + this.mZone.mWidth / 2, posy + this.mZone.mLength / 2);

    }
}
