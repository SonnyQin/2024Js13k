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

    public Normalize():Vector2
    {
        return new Vector2(this.x/this.Length(),this.y/this.Length());
    }
    public Length():number
    {
        return Math.sqrt(this.LengthSq());
    }

    public LengthSq():number
    {
        return this.x*this.x+this.y*this.y;
    }
    public AddNum(num:number):Vector2
    {
        this.x+=num;
        this.y+=num;
        return this;
    }
    public AddVec(vec:Vector2):Vector2
    {
        this.x+=vec.x;
        this.y+=vec.y;
        return this;
    }
    public Multiply(num:number):Vector2
    {
        this.x*=num;
        this.y*=num;
        return this;
    }

    public MinusVec(vec:Vector2):Vector2
    {
        this.x-=vec.x;
        this.y-=vec.y;
        return this;
    }

    public DisToSq(vec:Vector2):number
    {
        let v=new Vector2(this.x-vec.x, this.y-vec.y);
        return v.LengthSq();
    }

    public DisTo(vec:Vector2):number
    {
        return Math.sqrt(this.DisToSq(vec));
    }
}

export function VaV(a:Vector2, b:Vector2)
{
    return new Vector2(a.x+b.x,a.y+b.y);
}

export function VaN(a:Vector2, b:number)
{
    return new Vector2(a.x+b,a.y+b);
}

export function VmiV(a:Vector2, b:Vector2)
{
    return new Vector2(a.x-b.x,a.y-b.y);
}

export function VmiN(a:Vector2, b:number)
{
    return new Vector2(a.x-b,a.y-b);
}

export function VmV(a:Vector2, b:Vector2)
{
    return new Vector2(a.x*b.x, a.y*b.y);
}

export function VmN(a:Vector2, b:number)
{
    return new Vector2(a.x*b, a.y*b);
}



export function Random(m:number, n:number)
{
    return Math.random()*(m-n)+n;
}

export let RandomInt = (min:any,max:any) => Math.floor(Math.random() * (max - min + 1) + min)


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

export class Zone
{
    constructor(upleft:Vector2=new Vector2(), downright:Vector2=new Vector2())
    {
        this.UpLeft=upleft;
        this.DownRight=downright;
    }

    //Use canvas coordinates
    public Inside(vec:Vector2):boolean
    {
        return vec.x > this.UpLeft.x && vec.x < this.DownRight.x && vec.y > this.UpLeft.y && vec.y < this.DownRight.y;

    }

    public UpLeft:Vector2;
    public DownRight:Vector2;
}
