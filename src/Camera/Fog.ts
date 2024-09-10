import {Game} from "../Game";
import InputManager from "../InputManager";
import {paras} from "../Parameters";
import {getAngleFromXAxis, Random} from "../Math";

export default class Fog
{
    constructor(game:Game)
    {
        this.mGame=game;
        this.mCanvas=document.createElement('canvas');
        if(this.mCanvas)
        {   // @ts-ignore
            this.mContext=this.mCanvas.getContext('2d');
            this.mCanvas.width=this.mCanvasWidth=this.mGame.GetCanvasWidth();
            this.mCanvas.height=this.mCanvasHeight=this.mGame.GetCanvasHeight();
            //document.body.appendChild(this.mCanvas);
            this.mIncrease=true;
            this.mCurrentOpacity=paras.MinOpacity;
        }
    }

    public Update()
    {
        this.updateOpacity();
// Assuming 'this.mContext' is your 2D canvas context and 'this.mCanvas' is your canvas element

// Clear the Canvas
        this.mContext.clearRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);

// Draw the original image onto the Canvas
        this.mContext.drawImage(this.mGame.GetCanvas(), 0, 0);

// Fill the entire Canvas with black
        this.mContext.globalCompositeOperation = 'source-over';
        this.mContext.fillStyle = 'black';
        this.mContext.fillRect(0, 0, this.mCanvasWidth, this.mCanvasHeight);

// Get player position and transform coordinates
        let pos = this.mGame.GetCamera().TransformToView(this.mGame.GetPlayer().GetPosition());

// Get player size
        const playerSize = paras.POVLength; // Character's radius

// Set global composite operation to 'destination-out' to cut out the circle
        this.mContext.globalCompositeOperation = 'destination-out';
        this.mContext.beginPath();
        this.mContext.arc(pos.x, pos.y, playerSize, 0, Math.PI * 2); // Draw circle
        this.mContext.fill(); // Fill the circle area

// Reset composite operation to 'source-over'
        this.mContext.globalCompositeOperation = 'source-over';

// Darken the circle area by drawing a black circle with reduced opacity
        this.mContext.fillStyle = 'rgba(0, 0, 0,'+this.mCurrentOpacity+' )'; // Adjust opacity as needed
        this.mContext.beginPath();
        this.mContext.arc(pos.x, pos.y, playerSize, 0, Math.PI * 2); // Draw circle
        this.mContext.fill(); // Fill the circle area

// Draw the result onto the target Canvas
        this.mGame.GetContext().drawImage(this.mCanvas, 0, 0);

// Optionally draw a line from (0, 0) to the player's position
        /*this.mGame.GetContext().moveTo(0, 0);
        this.mGame.GetContext().lineTo(pos.x, pos.y);
        this.mGame.GetContext().stroke();*/
    }

    private updateOpacity(): void {
        if (this.mIncrease) {
            this.mCurrentOpacity += paras.OpacitySpeed;
            if (this.mCurrentOpacity >= paras.MaxOpacity) {
                this.mCurrentOpacity = paras.MaxOpacity;
                this.mIncrease = false;
            }
        } else {
            this.mCurrentOpacity -= paras.OpacitySpeed;

            if (this.mCurrentOpacity <= paras.MinOpacity)
            {
                this.mCurrentOpacity = paras.MinOpacity;
                this.mIncrease = true;
            }
        }
    }

    public mGame:Game;
    private mCanvas:HTMLCanvasElement;
    // @ts-ignore
    private mContext:CanvasRenderingContext2D;
    // @ts-ignore
    private mCanvasWidth:number;
    // @ts-ignore
    private mCanvasHeight:number;
    // @ts-ignore
    private mIncrease:boolean;
    // @ts-ignore
    private mCurrentOpacity:number;
}