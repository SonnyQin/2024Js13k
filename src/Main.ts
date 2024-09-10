import {Game} from "./Game";
import {Sleep} from "./Math";
import InputManager from "./InputManager";
import LevelController from "./LevelController";
LevelController.Instance;

var globalID;
function animate()
{
    LevelController.Instance.Update();
    /*    if(!game.mIsRunning)
            return;*/
    globalID=requestAnimationFrame(animate);
}

globalID=requestAnimationFrame(animate);


