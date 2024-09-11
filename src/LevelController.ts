import {Game} from "./Game";
import TerrainGenerator from "./Actors/Background/TerrainGenerator";
import UIScreen from "./UI/UIScreens/UIScreen";
import InputManager from "./InputManager";

export enum LevelStatus
{
    MenuState,
    GameState,
    EndState,
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
        this.mMainMenu=new UIScreen(this.mCanvas);
        InputManager.Instance;
    }

    public Update()
    {
        //Still running
        if(this.mStatus==LevelStatus.MenuState)
        {
            //Update Menu
            this.mMainMenu.Update();
            //TODO
            this.mMainMenu.Draw(this.mContext);

        }
        else
        if(this.mStatus==LevelStatus.EndState)
        {
            LevelController.Instance.EndGame();
        }
        else
        if(this.mStatus==LevelStatus.GameState)
        {
            //Update Game
            if(this.mGameResult==GameResult.WIN)
            {
                this.mLevelNumber++;
                if(this.mLevelNumber==3)
                {
                    this.mStatus=LevelStatus.EndState;
                    return;
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
            if(this.mGameResult==GameResult.UNDETERMINE)
            {
                // @ts-ignore
                this.mGame.RunLoop();
            }
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

    public EndGame()
    {
        console.log("Enter EndGame");
        let ctx = this.mContext;
        let canvasw = this.mCanvasWidth;
        let canvash = this.mCanvasHeight;

        // 动画相关参数
        const duration = 3000; // 动画总持续时间 (毫秒)
        const startTime = Date.now(); // 动画开始时间
        const fadeDuration = 500; // 淡入淡出时间 (毫秒)

        const winText = 'Congratulations! You Win!';
        const creditsText = 'Special thanks to: John Doe, Jane Smith';

        // 动画主循环
        const animate = () => {
            let elapsed = Date.now() - startTime;
            let progress = Math.min(elapsed / duration, 1); // 计算动画进度

            // 清除画布
            ctx.clearRect(0, 0, canvasw, canvash);

            // 计算透明度和位置
            const alpha = Math.min(progress / (fadeDuration / duration), 1); // 计算文本透明度
            const yOffset = Math.sin(progress * Math.PI) * 50; // 文本移动的幅度

            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`; // 设定动态透明度

            // 绘制“通关”消息
            ctx.fillText(winText, canvasw / 2, canvash / 2 - 20 - yOffset);

            // 绘制鸣谢文本
            ctx.fillText(creditsText, canvasw / 2, canvash / 2 + 30 - yOffset);

            // 继续动画
            if (progress < 1) {
                requestAnimationFrame(animate); // 继续动画
            }
        };

        // 启动动画
        animate();
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
    // @ts-ignore
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