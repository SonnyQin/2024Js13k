import {Vector2, VmiV} from "../Math";
import {Game} from "../Game";

export default class Camera
{
    constructor(game:Game)
    {
        this.mCameraPos=new Vector2();
        this.mGame=game;
    }

    public TransformToView(vec:Vector2)
    {
        return VmiV(vec, this.mCameraPos);
    }

    private mCameraPos:Vector2;
    private mGame:Game;


    //TODO Add some  function of camera shake

    public Update()
    {
        let pos=this.mGame.GetPlayer().GetPosition();
        this.mCameraPos=new Vector2(pos.x, pos.y);
    }

}