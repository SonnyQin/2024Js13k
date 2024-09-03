//Always Draw at the lattest
import {Game} from "../../Game";
import Container from "../Containers/Container";

export default class UIScreen
{
    constructor(game:Game)
    {
        this.mGame=game;
        this.mStack=[];
    }

    public Update()
    {
        this.mStack[this.mStack.length-1].Update();
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        this.mStack[this.mStack.length-1].Draw(ctx);
    }

    public AddContainer(container:Container)
    {
        this.mStack.push(container);
    }

    public RemoveContainer()
    {
        this.mStack.pop();
    }

    private mGame:Game;
    //Always update the last element
    private mStack:Container[];

    public GetGame():Game
    {
        return this.mGame;
    }
}