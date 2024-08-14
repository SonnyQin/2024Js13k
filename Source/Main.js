"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
console.log("Begin");
var game = new Game_1.Game();
game.Initialize();
while (game.mIsRunning) {
    game.RunLoop();
    console.log("loop");
}
game.Stop();
