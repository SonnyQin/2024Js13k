export class Vector2
{
    public x:number;
    public y:number;

    constructor(x:number=0,y:number=0)
    {
        this.x=x;
        this.y=y;
    }

    public Dot(vec:Vector2):number
    {
        return vec.x*this.x+vec.y*this.y;
    }
}
export function Random(m:number, n:number)
{
    return Math.random()*(m-n)+n;
}

export function Lerp(l1:Vector2, l2:Vector2, w:number)
{
    return new Vector2(l1.x+w*(l2.x-l1.x), l1.y+w*(l2.y-l1.y));
}

export function dot(x1:number, y1:number, x2:number, y2:number):number
{
    return x1*x2+y1*y2;
}

//Rotate around the origin
export function Rotate(l:Vector2, angle:number)
{
    return new Vector2(l.x*Math.cos(angle)-l.y*Math.sin(angle), l.x*Math.sin(angle)+l.y*Math.cos(angle));
}
//Rotate around the point
export function rotatePoint(ptSrc:Vector2,ptRotationCenter:Vector2,angle:number){
    var a = ptRotationCenter.x
    var b = ptRotationCenter.y
    var x0 = ptSrc.x
    var y0 = ptSrc.y
    var rx = a + (x0-a) * Math.cos(angle) - (y0-b) * Math.sin(angle);
    var ry = b + (x0-a) * Math.sin(angle) + (y0-b) * Math.cos(angle);

    return new Vector2(rx, ry);
}

export const Sleep = (ms:number)=> {
    return new Promise(resolve=>setTimeout(resolve, ms))
}
