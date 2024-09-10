import {Game} from "./Game";
import TerrainGenerator from "./Actors/Background/TerrainGenerator";
import UIScreen from "./UI/UIScreens/UIScreen";
import InputManager from "./InputManager";

export enum LevelStatus
{
    MenuState,
    GameState,
}

export enum GameResult
{
    WIN,
    LOSE,
    UNDETERMINE,
}

export default class LevelController
{
    constructor()
    {
        this.mLevelNumber=0;
        //0 means und
        this.mStatus=LevelStatus.MenuState;
        this.mMainMenu=new UIScreen()
        this.mGame=null;
        this.mGameResult=GameResult.UNDETERMINE;

        //Initialize Canvas
        let Canvas=document.createElement('canvas');
        this.mCanvas=Canvas;
        if(!Canvas)
        {
            console.log("Unable to create Canvas");
            return;
        }
        this.mCanvasWidth=Canvas.width=window.innerWidth;
        this.mCanvasHeight=Canvas.height=window.innerHeight;
        document.body.appendChild(Canvas);
        // @ts-ignore
        this.mContext=Canvas.getContext('2d');
        if(!this.mContext)
        {
            console.log("Unable to create Context");
            return;
        }
        InputManager.Instance;
    }

    public Update()
    {
        if(this.mGameResult==GameResult.WIN)
        {
            this.mLevelNumber++;
            if(this.mLevelNumber==3)
            {
                alert("YOU WIN ALL");
            }
            this.BeginLevel();
        }
        else
            if(this.mGameResult==GameResult.LOSE)
            {
                this.mLevelNumber=0;
                this.mGameResult=GameResult.UNDETERMINE;
                this.mStatus=LevelStatus.MenuState;
            }
            else
                //Still running
                if(this.mStatus==LevelStatus.MenuState)
                {
                    //Update Menu
                    this.mMainMenu.Update();
                    //TODO
                    this.mMainMenu.Draw(this.mContext);

                }
                else
                {
                    //Update Game
                    // @ts-ignore
                    this.mGame.RunLoop();
                }
    }

    //Each time call BeginLevel, generate a new game according to the difficulties
    public BeginLevel()
    {
        this.mGame=new Game();
        this.mGame.Initialize();
        TerrainGenerator.Instance.SetDifficulty(this.mLevelNumber);
        TerrainGenerator.Instance.Generate(this.mGame);
        this.mGameResult=GameResult.UNDETERMINE;
        this.mStatus=LevelStatus.GameState;
    }

    //Which also indicate the difficulty
    private mLevelNumber:number;

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:LevelController;

    private mGame:Game|null;
    private mStatus:number;
    private mMainMenu:UIScreen;


    public mCanvas;
    // @ts-ignore
    public mCanvasWidth:number;
    // @ts-ignore
    public mCanvasHeight:number;
    // @ts-ignore
    public mContext:CanvasRenderingContext2D;

    private mGameResult:GameResult;


    public SetStatus(status:number)
    {
        this.mStatus=status;
    }

    public SetGameResult(result:GameResult)
    {
        this.mGameResult=result;
    }

    public GetLevelNumber()
    {
        return this.mLevelNumber;
    }
}