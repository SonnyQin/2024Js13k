import {VaV, Vector2, VmiV} from "../Math";
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
        return VaV(VmiV(vec, this.mCameraPos), new Vector2(this.mGame.GetCanvasWidth()/2, this.mGame.GetCanvasHeight()/2)) ;
    }

    public ReverseTransform(vec:Vector2)
    {
        return VaV(vec, VmiV(this.mCameraPos, new Vector2(this.mGame.GetCanvasWidth()/2, this.mGame.GetCanvasHeight()/2)));
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