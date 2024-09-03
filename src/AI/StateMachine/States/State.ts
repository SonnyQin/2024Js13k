//Pure virtual
import Telegram from "../../Message/Telegram";

export default class State<EntityType>
{
    constructor()
    {
    }
    public Enter(owner:EntityType|null):void{if(!owner)return;}
    public Execute(owner:EntityType|null):void{if(!owner)return;}
    public Exit(owner:EntityType|null):void{if(!owner)return;}
    //virtual
    public OnMessage(owner:EntityType|null, msg:Telegram):boolean|void{if(!owner)return false;}
}