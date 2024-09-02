import Sprite from "./Sprite";
import {Game} from "../Game";
import InputManager from "../InputManager";
import {Vector2} from "../Math";
import MovementComponent from "../Components/MovementComponent";
import StateMachine from "../AI/StateMachine/StateMachine";

export default class Player extends Sprite
{
    constructor(game:Game,drawOrder:number=1,scale:number=1.0)
    {
        //hard code
        super(game,0,new Vector2(100,100),1.0);
        //Hard code Set up
        this.mAssets={"😃":79,"🥵":79,"🥶":79,"🥳":79,"😱":79,"😖":79};

        this.mc=new MovementComponent(this);

        this.mStateMachine=new StateMachine<Player>();
    }

    public ProcessInput(keyState:InputManager):void
    {
        this.mc.SetForwardSpeed(this.mc.CalculateForwardSpeed(keyState.GetMouseVec()));
    }
    public Update(deltaTime: number)
    {
        super.Update(deltaTime);
        this.mStateMachine.Update();
    }

    public Draw(context: CanvasRenderingContext2D) {
        super.Draw(context);
    }

    //Variables
    private mc:MovementComponent;
    private mStateMachine:StateMachine<Player>;
}