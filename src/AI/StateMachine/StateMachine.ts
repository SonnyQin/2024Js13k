import State from "./States/State";

export default class StateMachine<EntityType>
{
    constructor()
    {
        this.pOwner=null;
        this.mCurrentState=null;
        this.mPreviousState=null;
        this.mGlobalState=null;
    }

    private pOwner:EntityType|null;
    private mCurrentState:State<EntityType>|null;
    private mPreviousState:State<EntityType>|null;
    private mGlobalState:State<EntityType>|null;

    public SetCurrentState(state:State<EntityType>):void
    {
        this.mCurrentState=state;
    }
    public SetPreviousState(state:State<EntityType>):void
    {
        this.mPreviousState=state;
    }
    public SetGlobalState(state:State<EntityType>):void
    {
        this.mGlobalState=state;
    }

    public GetCurrentState():State<EntityType>|null
    {
        return this.mCurrentState;
    }
    public GetPreviousState():State<EntityType>|null
    {
        return this.mPreviousState;
    }
    public GetGlobalState():State<EntityType>|null
    {
        return this.mGlobalState;
    }

    public ChangeState(newState:State<EntityType>):void
    {
        this.mPreviousState=this.mCurrentState;
        if(this.mCurrentState)
            this.mCurrentState.Exit(this.pOwner);
        this.mCurrentState=newState;
        this.mCurrentState.Enter(this.pOwner);
    }
    public RevertToPreviousState():void
    {
        if(this.mPreviousState)
            this.ChangeState(this.mPreviousState);
    }
    public Update():void
    {
        if(this.mGlobalState)
            this.mGlobalState.Execute(this.pOwner);
        if(this.mCurrentState)
            this.mCurrentState.Execute(this.pOwner);
    }

    //Might Have Problem
    public isInState(state:State<EntityType>):boolean
    {
        return state == this.mCurrentState;

    }
}