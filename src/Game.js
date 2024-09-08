"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const InputManager_1 = __importDefault(require("./InputManager"));
const MessageDispatcher_1 = __importDefault(require("./AI/Message/MessageDispatcher"));
const Clock_1 = __importDefault(require("./Actors/Monsters/Clock"));
const Math_1 = require("./Math");
const HUD_1 = __importDefault(require("./UI/UIScreens/HUD"));
const Camera_1 = __importDefault(require("./Camera/Camera"));
const TerrainGenerator_1 = __importDefault(require("./Actors/Background/TerrainGenerator"));
class Game {
    constructor() {
        this.mIsRunning = true;
        this.mTickCount = 0;
        this.mActors = [];
        // @ts-ignore
        this.mContext = null;
        //this.mInputManager=new InputManager();
        this.mHUD = new HUD_1.default(this);
        this.mCamera = new Camera_1.default(this);
        this.mResult = false;
    }
    Initialize() {
        this.mTickCount = Date.now();
        let Canvas = document.createElement('canvas');
        this.mCanvas = Canvas;
        if (!Canvas) {
            console.log("Unable to create Canvas");
            return;
        }
        this.mCanvasWidth = Canvas.width = window.innerWidth;
        this.mCanvasHeight = Canvas.height = window.innerHeight;
        document.body.appendChild(Canvas);
        // @ts-ignore
        this.mContext = Canvas.getContext('2d');
        if (!this.mContext) {
            console.log("Unable to create Context");
            return;
        }
        TerrainGenerator_1.default.Instance.Generate(this);
        InputManager_1.default.Instance;
        new Clock_1.default(this, 1, new Math_1.Vector2(600, 600), 1.0, true);
    }
    RunLoop() {
        this.ProcessInput();
        this.UpdateGame();
        this.GenerateOutput();
        //console.log(Date.now());
    }
    Stop() {
        this.mIsRunning = false;
    }
    ProcessInput() {
        this.mPlayer.ProcessInput(InputManager_1.default.Instance);
    }
    UpdateGame() {
        //Make minimun 16ms a frame
        while (Date.now() < this.mTickCount + 16)
            ;
        var deltatime = (Date.now() - this.mTickCount) / 1000;
        //console.log(deltatime);
        this.mTickCount = Date.now();
        for (let iter of this.mActors) {
            iter.Update(deltatime);
        }
        //Regular update of Messages
        MessageDispatcher_1.default.Instance.DispatchDelayedMessages();
        this.mCamera.Update();
        this.mHUD.Update();
    }
    GenerateOutput() {
        this.mContext.beginPath();
        this.mContext.clearRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        for (let iter of this.mActors) {
            iter.Draw(this.mContext);
        }
        this.mHUD.Draw(this.mContext);
        /*this.mFog.Update();*/
    }
    //Functions about actors
    //TODO Optimization
    AddActor(actor) {
        let i = 0;
        for (; i < this.mActors.length; i++) {
            if (this.mActors[i].GetDrawOrder() > actor.GetDrawOrder())
                break;
        }
        this.mActors.splice(i, 0, actor);
    }
    RemoveActor(actor) {
        this.mActors.filter((iter) => iter != actor);
    }
    //Getters and Setters
    GetContext() {
        return this.mContext;
    }
    GetActors() {
        return this.mActors;
    }
    GetPlayer() {
        return this.mPlayer;
    }
    GetCamera() {
        return this.mCamera;
    }
    GetCanvasWidth() {
        return this.mCanvasWidth;
    }
    GetCanvasHeight() {
        return this.mCanvasHeight;
    }
    GetCanvas() {
        return this.mCanvas;
    }
    WIN() {
        this.mResult = true;
    }
    LOSE() {
        this.mResult = false;
    }
    SetPlayer(player) {
        this.mPlayer = player;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map