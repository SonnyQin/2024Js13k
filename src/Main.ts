import {Game} from "./Game";
import {Sleep} from "./Math";

console.log("Begin");
var game=new Game();
game.Initialize();
var globalID;
function animate()
{
    game.RunLoop();
/*    if(!game.mIsRunning)
        return;*/
    globalID=requestAnimationFrame(animate);
}

globalID=requestAnimationFrame(animate);