import {Vector2} from "./Math";
import {paras} from "./Parameters";

export default class InputManager
{
    public keysDown: {[key:string]:boolean};
    public mousex:number;
    public mousey:number;
    public leftbutton:boolean;
    public rightbutton:boolean;
    constructor()
    {

        this.keysDown={};
        this.mousex=0;
        this.mousey=0;
        this.leftbutton=false;
        this.rightbutton=false;

        let self=this;
        addEventListener("keydown", function(e){
            self.keysDown[e.key]=true;
        }, false);

        addEventListener('keyup', function(e){
            self.keysDown[e.key]=false;
        }, false);

        addEventListener('mousemove', function(e){
            self.mousex=e.offsetX;
            self.mousey=e.offsetY;
        }, false);

        addEventListener('mouseup', function(e){
            if(e.button==0)
                self.leftbutton=false;
            else
                self.rightbutton=false;
        }, false);

        addEventListener('mousedown', function(e)
        {
            if(e.button==0)
            {
                self.leftbutton=true;
            }
            else
            {
                self.rightbutton=true;
            }
        }, false);
    }
    public GetMouseVec():Vector2
    {
        return new Vector2(this.mousex,this.mousey);
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:InputManager;
}