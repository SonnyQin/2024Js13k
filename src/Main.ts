import {Game} from "./Game";
import {Sleep} from "./Math";
import InputManager from "./InputManager";
console.log("Enter");

let button=document.createElement('button');
button.onclick=Begin;
document.body.append(button);

function Begin()
{
    var game=new Game();
    game.Initialize();
    var globalID;
    function animate()
    {
        if(!game.mIsRunning)
            return;
        game.RunLoop();
        /*    if(!game.mIsRunning)
                return;*/
        globalID=requestAnimationFrame(animate);
    }

    globalID=requestAnimationFrame(animate);
}
