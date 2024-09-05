"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor(screen) {
        this.mUIScreen = screen;
        this.mElements = [];
    }
    AddElement(element) {
        this.mElements.push(element);
    }
    Update() {
        for (let element of this.mElements) {
            element.Update();
        }
    }
    Draw(ctx) {
        for (let element of this.mElements) {
            element.Draw(ctx);
        }
    }
    GetOwner() {
        return this.mUIScreen;
    }
}
exports.default = Container;
//# sourceMappingURL=Container.js.map