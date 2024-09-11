"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const InputManager_1 = __importDefault(require("./InputManager"));
const MessageDispatcher_1 = __importDefault(require("./AI/Message/MessageDispatcher"));
const Camera_1 = __importDefault(require("./Camera/Camera"));
const LevelController_1 = __importStar(require("./LevelController"));
const Parameters_1 = require("./Parameters");
const SoundManager_1 = __importDefault(require("./Sound/SoundManager"));
class Game {
    constructor() {
        this.mIsRunning = true;
        this.mTickCount = 0;
        this.mActors = [];
        // @ts-ignore
        this.mContext = null;
        //this.mInputManager=new InputManager();
        this.mCamera = new Camera_1.default(this);
        this.mIsFogged = false;
    }
    Initialize() {
        this.mTickCount = Date.now();
        this.mCanvas = LevelController_1.default.Instance.mCanvas;
        this.mCanvasWidth = LevelController_1.default.Instance.mCanvasWidth;
        this.mCanvasHeight = LevelController_1.default.Instance.mCanvasHeight;
        // @ts-ignore
        this.mContext = LevelController_1.default.Instance.mContext;
        //new Clock(this, 1, new Vector2(1000,1000),1.0, true);
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
    }
    GenerateOutput() {
        this.mContext.beginPath();
        this.mContext.clearRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);
        for (let iter of this.mActors) {
            iter.Draw(this.mContext);
        }
        if (this.mIsFogged)
            this.mFog.Update();
        this.DrawLevel(this.mContext);
    }
    //Draw the level number on top right corner
    DrawLevel(ctx) {
        let text = "LEVEL " + (LevelController_1.default.Instance.GetLevelNumber() + 1);
        ctx.font = '30px Almendra'; // 选择合适的字体和大小
        ctx.fillStyle = '#FFFF00'; // 文字颜色
        ctx.textAlign = 'right'; // 文字右对齐
        ctx.textBaseline = 'top'; // 文字基线对齐
        ctx.fillText(text, this.mCanvasWidth - Parameters_1.paras.UIx, Parameters_1.paras.UIy);
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
        this.mActors = this.mActors.filter((iter) => iter != actor);
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
        LevelController_1.default.Instance.SetStatus(1);
        LevelController_1.default.Instance.SetGameResult(LevelController_1.GameResult.WIN);
        SoundManager_1.default.Instance.StopAll();
        MessageDispatcher_1.default.Instance.Clear();
    }
    LOSE() {
        LevelController_1.default.Instance.SetStatus(-1);
        LevelController_1.default.Instance.SetGameResult(LevelController_1.GameResult.LOSE);
        SoundManager_1.default.Instance.StopAll();
        MessageDispatcher_1.default.Instance.Clear();
    }
    SetPlayer(player) {
        this.mPlayer = player;
    }
    SetIsFogged(fog) {
        this.mIsFogged = fog;
    }
    SetFog(fog) {
        this.mFog = fog;
    }
}
exports.Game = Game;
//# sourceMappingURL=Game.js.map