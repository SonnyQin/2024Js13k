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

    public Copy()
    {
        return new Vector2(this.x, this.y);
    }

    public Truncate(maxForce:number):void
    {
        if(this.Length()>maxForce)
        {
            let r=this.Normalize();
            this.x=r.x*maxForce;
            this.y=r.y*maxForce;
        }
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

export function VdN(a:Vector2, b:number)
{
    return new Vector2(a.x/b, a.y/b);
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
/*    constructor(upleft:Vector2=new Vector2(), downright:Vector2=new Vector2())
    {
        this.UpLeft=upleft;
        this.DownRight=downright;
    }*/

    constructor(position:Vector2=new Vector2(), width:number, length:number)
    {
        this.mPosition=position;
        this.mWidth=width;
        this.mLength=length;
    }

    //Use canvas coordinates
    public Inside(vec:Vector2):boolean
    {
        return vec.x > this.UpLeft.x && vec.x < this.DownRight.x && vec.y > this.UpLeft.y && vec.y < this.DownRight.y;

    }

    public IntersectZone(b:Zone):boolean
    {
        return this.DownRight.x>b.UpLeft.x&&this.UpLeft.x<b.DownRight.x&&this.DownRight.y>b.UpLeft.y&&this.UpLeft.y<b.DownRight.y;
    }

    public IntersectCircleCollider(circle: CircleCollider): boolean {
        // Find the nearest point on the rectangle to the circle's center
        const nearestX = Math.max(this.UpLeft.x, Math.min(circle.mPosition.x, this.DownRight.x));
        const nearestY = Math.max(this.UpLeft.y, Math.min(circle.mPosition.y, this.DownRight.y));

        // Calculate the distance between the nearest point and the circle's center
        const deltaX = circle.mPosition.x - nearestX;
        const deltaY = circle.mPosition.y - nearestY;

        // Check if the distance squared is less than the radius squared
        const distanceSq = deltaX * deltaX + deltaY * deltaY;
        const radiusSq = circle.mLength * circle.mLength;

        return distanceSq < radiusSq;
    }

    public mPosition:Vector2;
    public mWidth:number;
    public mLength:number;

    get DownRight()
    {
        return new Vector2(this.mPosition.x+this.mWidth/2, this.mPosition.y+this.mLength/2);
    }

    get UpLeft()
    {
        return new Vector2(this.mPosition.x-this.mWidth/2, this.mPosition.y-this.mLength/2);
    }
}

export class CircleCollider
{
    constructor(pos:Vector2, length:number)
    {
        this.mPosition=pos;
        this.mLength=length;
    }

    public IntersectCircleCollider(b:CircleCollider):boolean
    {
        return this.mPosition.DisToSq(b.mPosition) < (this.mLength + b.mLength) * (this.mLength + b.mLength);

    }

    public VecIn(vec:Vector2):boolean
    {
        return this.mPosition.DisToSq(vec) < this.mLength * this.mLength;
    }

    public mPosition:Vector2;
    public mLength:number;

}

export function getAngleFromXAxis(x: number, y: number): number {
    // 计算坐标 (x, y) 相对于 x 轴的角度
    const angleFromXAxis = Math.atan2(y, x); // 返回值在 -π 到 π 之间

    // 将角度转换为度
    const angleInDegrees = angleFromXAxis * (180 / Math.PI);

    // 确保角度在 [0, 360) 范围内
    return (angleInDegrees + 360) % 360;
}