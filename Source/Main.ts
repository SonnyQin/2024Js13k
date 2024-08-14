import {Game} from "./Game";

console.log("Begin");
var game=new Game();
game.Initialize();
while (game.mIsRunning)
{
    game.RunLoop();
    console.log("loop");
}
game.Stop();
