"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateMachine {
    constructor(owner) {
        this.pOwner = owner;
        this.mCurrentState = null;
        this.mPreviousState = null;
        this.mGlobalState = null;
    }
    SetCurrentState(state) {
        this.mCurrentState = state;
    }
    SetPreviousState(state) {
        this.mPreviousState = state;
    }
    SetGlobalState(state) {
        this.mGlobalState = state;
    }
    GetCurrentState() {
        return this.mCurrentState;
    }
    GetPreviousState() {
        return this.mPreviousState;
    }
    GetGlobalState() {
        return this.mGlobalState;
    }
    ChangeState(newState) {
        /*        // @ts-ignore
                if(this.mCurrentState.Instance==newState.Instance)*/
        this.mPreviousState = this.mCurrentState;
        if (this.mCurrentState)
            this.mCurrentState.Exit(this.pOwner);
        this.mCurrentState = newState;
        this.mCurrentState.Enter(this.pOwner);
    }
    RevertToPreviousState() {
        if (this.mPreviousState)
            this.ChangeState(this.mPreviousState);
    }
    Update() {
        if (this.mGlobalState)
            this.mGlobalState.Execute(this.pOwner);
        if (this.mCurrentState)
            this.mCurrentState.Execute(this.pOwner);
    }
    HandleMessage(telegram) {
        if (this.mCurrentState && this.mCurrentState.OnMessage(this.pOwner, telegram))
            return true;
        if (this.mGlobalState && this.mGlobalState.OnMessage(this.pOwner, telegram))
            return true;
        return false;
    }
    //Might Have Problem
    isInState(state) {
        return state == this.mCurrentState;
    }
}
exports.default = StateMachine;
//# sourceMappingURL=StateMachine.js.map