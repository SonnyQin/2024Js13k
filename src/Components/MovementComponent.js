"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Math_1 = require("../Math");
class MovementComponent extends Component_1.Component {
    constructor(actor, updateOrder = 100, maxSpeed = 100) {
        super(actor, updateOrder);
        this.mMaxSpeed = maxSpeed;
        this.mForwardSpeed = new Math_1.Vector2(0, 0);
    }
    Update(deltaTime) {
        super.Update(deltaTime);
        //TODO
        let pos = this.GetOwner().GetPosition();
        pos.AddVec(this.mForwardSpeed.Multiply(deltaTime));
    }
    SetForwardSpeed(speed) {
        if (speed.LengthSq() < this.mMaxSpeed * this.mMaxSpeed)
            this.mForwardSpeed = speed;
        else {
            this.mForwardSpeed = speed.Normalize().Multiply(this.mMaxSpeed);
        }
    }
    GetForwardSpeed() {
        return this.mForwardSpeed;
    }
    GetMaxSpeed() {
        return this.mMaxSpeed;
    }
    CalculateForwardSpeed(mousepos) {
        let worldMousepos = this.GetOwner().GetGame().GetCamera().ReverseTransform(mousepos);
        let length = worldMousepos.MinusVec(this.GetOwner().GetPosition()).Length();
        this.GetOwner().SetHeading(worldMousepos.Normalize());
        if (length < 30)
            return new Math_1.Vector2();
        return worldMousepos.Normalize().Multiply(length / 200 * this.mMaxSpeed);
    }
}
exports.default = MovementComponent;
//# sourceMappingURL=MovementComponent.js.map