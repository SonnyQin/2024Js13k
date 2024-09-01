import Sprite from "./Sprite";
import {Game} from "../Game";
import InputManager from "../InputManager";
import {Vector2} from "../Math";
import MovementComponent from "../Components/MovementComponent";

export default class Player extends Sprite
{
    constructor(game:Game,drawOrder:number=1,scale:number=1.0)
    {
        //hard code
        super(game,0,new Vector2(0,0),1.0);
        //Hard code Set up
        this.mAssets.set("😃",200);

        this.mc=new MovementComponent(this);
    }

    public ProcessInput(keyState:InputManager):void
    {

    }
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
    }

    //Variables
    private mc:MovementComponent;
}