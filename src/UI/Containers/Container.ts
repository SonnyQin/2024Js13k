//The elements on the slide will active at the same time
//The container draw uniquely
import UIScreen from "../UIScreens/UIScreen";
import Element from "../Element"

export default class Container
{
    constructor(screen:UIScreen)
    {
        this.mUIScreen=screen;
        this.mElements=[];
    }

    public AddElement(element:Element)
    {
        this.mElements.push(element);
    }


    public Update()
    {
        for(let element of this.mElements)
        {
            element.Update();
        }
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        for(let element of this.mElements)
        {
            element.Draw(ctx);
        }
    }

    public GetOwner()
    {
        return this.mUIScreen;
    }

    private mUIScreen:UIScreen;
    private mElements:Element[];
}