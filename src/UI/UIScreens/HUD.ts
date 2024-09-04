import UIScreen from "./UIScreen";
import {Game} from "../../Game";
import HUDBaseContainer from "../Containers/HUDBaseContainer";

//HUD contains PauseMenu, PauseButton
export default class HUD extends UIScreen
{
    constructor(game:Game)
    {
        super(game);
        this.AddContainer(new HUDBaseContainer(this));
    }
}