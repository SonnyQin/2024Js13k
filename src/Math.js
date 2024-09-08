"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngleFromXAxis = exports.CircleCollider = exports.Zone = exports.Sleep = exports.rotatePoint = exports.Rotate = exports.dot = exports.Lerp = exports.RandomInt = exports.Random = exports.VdN = exports.VmN = exports.VmV = exports.VmiN = exports.VmiV = exports.VaN = exports.VaV = exports.Vector2 = void 0;
class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    Dot(vec) {
        return vec.x * this.x + vec.y * this.y;
    }
    Normalize() {
        return new Vector2(this.x / this.Length(), this.y / this.Length());
    }
    Length() {
        return Math.sqrt(this.LengthSq());
    }
    LengthSq() {
        return this.x * this.x + this.y * this.y;
    }
    AddNum(num) {
        this.x += num;
        this.y += num;
        return this;
    }
    AddVec(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    Multiply(num) {
        this.x *= num;
        this.y *= num;
        return this;
    }
    MinusVec(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    DisToSq(vec) {
        let v = new Vector2(this.x - vec.x, this.y - vec.y);
        return v.LengthSq();
    }
    DisTo(vec) {
        return Math.sqrt(this.DisToSq(vec));
    }
    Copy() {
        return new Vector2(this.x, this.y);
    }
    Truncate(maxForce) {
        if (this.Length() > maxForce) {
            let r = this.Normalize();
            this.x = r.x * maxForce;
            this.y = r.y * maxForce;
        }
    }
}
exports.Vector2 = Vector2;
function VaV(a, b) {
    return new Vector2(a.x + b.x, a.y + b.y);
}
exports.VaV = VaV;
function VaN(a, b) {
    return new Vector2(a.x + b, a.y + b);
}
exports.VaN = VaN;
function VmiV(a, b) {
    return new Vector2(a.x - b.x, a.y - b.y);
}
exports.VmiV = VmiV;
function VmiN(a, b) {
    return new Vector2(a.x - b, a.y - b);
}
exports.VmiN = VmiN;
function VmV(a, b) {
    return new Vector2(a.x * b.x, a.y * b.y);
}
exports.VmV = VmV;
function VmN(a, b) {
    return new Vector2(a.x * b, a.y * b);
}
exports.VmN = VmN;
function VdN(a, b) {
    return new Vector2(a.x / b, a.y / b);
}
exports.VdN = VdN;
function Random(m, n) {
    return Math.random() * (m - n) + n;
}
exports.Random = Random;
let RandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
exports.RandomInt = RandomInt;
function Lerp(l1, l2, w) {
    return new Vector2(l1.x + w * (l2.x - l1.x), l1.y + w * (l2.y - l1.y));
}
exports.Lerp = Lerp;
function dot(x1, y1, x2, y2) {
    return x1 * x2 + y1 * y2;
}
exports.dot = dot;
//Rotate around the origin
function Rotate(l, angle) {
    return new Vector2(l.x * Math.cos(angle) - l.y * Math.sin(angle), l.x * Math.sin(angle) + l.y * Math.cos(angle));
}
exports.Rotate = Rotate;
//Rotate around the point
function rotatePoint(ptSrc, ptRotationCenter, angle) {
    var a = ptRotationCenter.x;
    var b = ptRotationCenter.y;
    var x0 = ptSrc.x;
    var y0 = ptSrc.y;
    var rx = a + (x0 - a) * Math.cos(angle) - (y0 - b) * Math.sin(angle);
    var ry = b + (x0 - a) * Math.sin(angle) + (y0 - b) * Math.cos(angle);
    return new Vector2(rx, ry);
}
exports.rotatePoint = rotatePoint;
const Sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.Sleep = Sleep;
class Zone {
    /*    constructor(upleft:Vector2=new Vector2(), downright:Vector2=new Vector2())
        {
            this.UpLeft=upleft;
            this.DownRight=downright;
        }*/
    constructor(position = new Vector2(), width, length) {
        this.mPosition = position;
        this.mWidth = width;
        this.mLength = length;
    }
    //Use canvas coordinates
    Inside(vec) {
        return vec.x > this.UpLeft.x && vec.x < this.DownRight.x && vec.y > this.UpLeft.y && vec.y < this.DownRight.y;
    }
    IntersectZone(b) {
        return this.DownRight.x > b.UpLeft.x && this.UpLeft.x < b.DownRight.x && this.DownRight.y > b.UpLeft.y && this.UpLeft.y < b.DownRight.y;
    }
    IntersectCircleCollider(circle) {
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
    get DownRight() {
        return new Vector2(this.mPosition.x + this.mWidth / 2, this.mPosition.y + this.mLength / 2);
    }
    get UpLeft() {
        return new Vector2(this.mPosition.x - this.mWidth / 2, this.mPosition.y - this.mLength / 2);
    }
}
exports.Zone = Zone;
class CircleCollider {
    constructor(pos, length) {
        this.mPosition = pos;
        this.mLength = length;
    }
    IntersectCircleCollider(b) {
        return this.mPosition.DisToSq(b.mPosition) < (this.mLength + b.mLength) * (this.mLength + b.mLength);
    }
    VecIn(vec) {
        return this.mPosition.DisToSq(vec) < this.mLength * this.mLength;
    }
}
exports.CircleCollider = CircleCollider;
function getAngleFromXAxis(x, y) {
    // 计算坐标 (x, y) 相对于 x 轴的角度
    const angleFromXAxis = Math.atan2(y, x); // 返回值在 -π 到 π 之间
    // 将角度转换为度
    const angleInDegrees = angleFromXAxis * (180 / Math.PI);
    // 确保角度在 [0, 360) 范围内
    return (angleInDegrees + 360) % 360;
}
exports.getAngleFromXAxis = getAngleFromXAxis;
//# sourceMappingURL=Math.js.map