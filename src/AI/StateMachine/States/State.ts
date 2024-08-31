//Pure virtual
export default class State<EntityType>
{
    constructor()
    {
    }
    public Enter(owner:EntityType|null):void{if(!owner)return;}
    public Execute(owner:EntityType|null):void{if(!owner)return;}
    public Exit(owner:EntityType|null):void{if(!owner)return;}
    public OnMessage(owner:EntityType|null):boolean|void{if(!owner)return false;}
}