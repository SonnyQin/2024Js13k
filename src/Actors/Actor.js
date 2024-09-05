"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actor = exports.Type = void 0;
const Math_1 = require("../Math");
var Type;
(function (Type) {
    Type[Type["Actor"] = 0] = "Actor";
    Type[Type["Player"] = 1] = "Player";
    Type[Type["Monster"] = 2] = "Monster";
    Type[Type["Terrain"] = 3] = "Terrain";
})(Type || (exports.Type = Type = {}));
class Actor {
    constructor(game, drawOrder = 1, position) {
        //Remember to initilize all variables
        this.mPosition = position;
        this.mRotation = 0;
        this.mComponents = [];
        this.mGame = game;
        this.mDrawOrder = drawOrder;
        this.mType = Type.Actor;
        this.mHeading = new Math_1.Vector2();
        this.mGame = game;
        this.mIsTagged = false;
        game.AddActor(this);
    }
    AddComponent(component) {
        let i = 0;
        for (; i < this.mComponents.length; i++) {
            if (this.mComponents[i].GetUpdateOrder() > component.GetUpdateOrder())
                break;
        }
        this.mComponents.splice(i, 0, component);
    }
    RemoveComponent(component) {
        //Need to be checked
        this.mComponents.filter((iter) => iter != component);
    }
    Update(deltaTime) {
        this.UpdateActor(deltaTime);
        this.UpdateComponents(deltaTime);
    }
    //Virtual Function, determined by implementation
    UpdateActor(deltaTime) {
    }
    UpdateComponents(deltaTime) {
        for (let iter of this.mComponents) {
            iter.Update(deltaTime);
        }
    }
    //virtual
    Draw(context) {
    }
    //pure virtual
    //TODO May Check for return
    HandleMessage(telegram) {
    }
    TransformToView() {
        return this.GetGame().GetCamera().TransformToView(this.GetPosition());
    }
    //Getter and Setter
    SetPosition(vec) {
        this.mPosition = vec;
    }
    GetPosition() {
        return this.mPosition;
    }
    SetRotation(rotation) {
        this.mRotation = rotation;
    }
    GetRotation() {
        return this.mRotation;
    }
    GetDrawOrder() {
        return this.mDrawOrder;
    }
    SetDrawOrder(drawOrder) {
        this.mDrawOrder = drawOrder;
    }
    GetType() {
        return this.mType;
    }
    SetType(type) {
        this.mType = type;
    }
    GetGame() {
        return this.mGame;
    }
    GetHeading() {
        return this.mHeading;
    }
    SetHeading(heading) {
        this.mHeading = heading;
    }
    GetTag() {
        return this.mIsTagged;
    }
    SetTag(tag) {
        this.mIsTagged = tag;
    }
}
exports.Actor = Actor;
//# sourceMappingURL=Actor.js.map