"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["PM_NORMAL"] = 0] = "PM_NORMAL";
    MessageType[MessageType["PM_ALERT"] = 1] = "PM_ALERT";
    MessageType[MessageType["PM_ESCAPE"] = 2] = "PM_ESCAPE";
    MessageType[MessageType["PM_TIRED"] = 3] = "PM_TIRED";
    MessageType[MessageType["PM_RELIEF"] = 4] = "PM_RELIEF";
    MessageType[MessageType["PM_WIN"] = 5] = "PM_WIN";
    MessageType[MessageType["PM_LOSE"] = 6] = "PM_LOSE";
    MessageType[MessageType["PM_FLED"] = 7] = "PM_FLED";
    MessageType[MessageType["MM_HIDE"] = 8] = "MM_HIDE";
    MessageType[MessageType["MM_ALERT"] = 9] = "MM_ALERT";
    MessageType[MessageType["MM_PERSUIT"] = 10] = "MM_PERSUIT";
    MessageType[MessageType["MM_ATTACK"] = 11] = "MM_ATTACK";
    MessageType[MessageType["CM_COLLIDE"] = 12] = "CM_COLLIDE";
    MessageType[MessageType["GAMEWIN"] = 13] = "GAMEWIN";
    MessageType[MessageType["GAMELOSE"] = 14] = "GAMELOSE";
})(MessageType || (exports.MessageType = MessageType = {}));
//# sourceMappingURL=MessageType.js.map