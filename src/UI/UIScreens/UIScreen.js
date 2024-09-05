"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UIScreen {
    constructor(game) {
        this.mGame = game;
        this.mStack = [];
    }
    Update() {
        if (this.mStack.length)
            this.mStack[this.mStack.length - 1].Update();
    }
    Draw(ctx) {
        if (this.mStack.length)
            this.mStack[this.mStack.length - 1].Draw(ctx);
    }
    AddContainer(container) {
        this.mStack.push(container);
    }
    RemoveContainer() {
        this.mStack.pop();
    }
    GetGame() {
        return this.mGame;
    }
}
exports.default = UIScreen;
//# sourceMappingURL=UIScreen.js.map