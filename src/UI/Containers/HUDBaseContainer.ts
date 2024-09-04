import Container from "./Container";
import UIScreen from "../UIScreens/UIScreen";
import PauseButton from "../Buttons/PauseButton";

export default class HUDBaseContainer extends Container
{
    constructor(screen:UIScreen)
    {
        super(screen);
        this.AddElement(new PauseButton(this));
    }
}