"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//TODO Optimization
const Telegram_1 = __importDefault(require("./Telegram"));
class MessageDispatcher {
    constructor() {
        this.mQueue = [];
    }
    static get Instance() {
        if (!this._Instance)
            this._Instance = new this();
        return this._Instance;
    }
    Discharge(receiver, telegram) {
        if (!receiver.HandleMessage(telegram)) {
            console.log(telegram.mMsg);
            console.log("Message unhandled");
        }
    }
    DispatchMsg(delay, sender, receiver, msg, ExtraInfo = null) {
        if (!receiver) {
            return;
        }
        let telegram = new Telegram_1.default(sender, receiver, msg, 0, ExtraInfo);
        if (delay <= 0) {
            this.Discharge(receiver, telegram);
        }
        else {
            let currentTime = Date.now();
            telegram.mDispatchTime = currentTime + delay;
            this.Insert(telegram);
        }
    }
    DispatchDelayedMessages() {
        let currentTime = Date.now();
        while (this.mQueue.length > 0 && this.mQueue[0].mDispatchTime < currentTime && this.mQueue[0].mDispatchTime > 0) {
            this.Discharge(this.mQueue[0].mReceiver, this.mQueue[0]);
            this.mQueue.splice(0, 1);
        }
    }
    Insert(telegram) {
        let i = 0;
        for (; i < this.mQueue.length; i++) {
            if (this.mQueue[i].mDispatchTime > telegram.mDispatchTime)
                break;
        }
        this.mQueue.splice(i, 0, telegram);
    }
    Clear() {
        this.mQueue = [];
    }
}
exports.default = MessageDispatcher;
//# sourceMappingURL=MessageDispatcher.js.map