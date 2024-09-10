import { Game } from "../../Game";
import Container from "../Containers/Container";
import Button from "../Buttons/Button";
import LevelController from "../../LevelController";
import {Vector2} from "../../Math";

export default class UIScreen {
    private mStack: Container[];

    constructor() {
        this.mStack = [];
        this.initialize();
    }

    private initialize(): void
    {
        let containter=new Container(this);
        let button=new Button(containter,new Vector2(100,100),100, 50, "Start");
        containter.AddElement(button);
        this.mStack.push(containter);
    }

    public Update(): void {
        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Update();
        }
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        LevelController.Instance.mContext.beginPath();
        let canvasw=LevelController.Instance.mCanvasWidth;
        let canvash=LevelController.Instance.mCanvasHeight;
        LevelController.Instance.mContext.clearRect(0,0,LevelController.Instance.mCanvasWidth,LevelController.Instance.mCanvasWidth);
        if (this.mStack.length) {
            this.mStack[this.mStack.length - 1].Draw(ctx);
        }
    }

    public AddContainer(container: Container): void {
        this.mStack.push(container);
    }

    public RemoveContainer(): void {
        this.mStack.pop();
    }
}
