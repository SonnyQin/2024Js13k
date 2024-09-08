"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Game_1 = require("./Game");
console.log("Begin");
var game = new Game_1.Game();
game.Initialize();
var globalID;
function animate() {
    if (!game.mIsRunning)
        return;
    game.RunLoop();
    /*    if(!game.mIsRunning)
            return;*/
    globalID = requestAnimationFrame(animate);
}
globalID = requestAnimationFrame(animate);
//# sourceMappingURL=Main.js.map