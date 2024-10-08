import {Random, RandomInt, Vector2, Zone} from "../../Math";
import {paras} from "../../Parameters";

export default class MazeGenerator
{
    constructor()
    {
    }
    creatMap(r: number, c: number) {
        this.mapArr = [];
        let notAccessed = [];
        let accessed = [];
        for (let i = 0; i < r * 2 + 1; ++i) {
            let arr = [];
            for (let n = 0; n < c * 2 + 1; ++n) {
                if ((n ^ (n - 1)) == 1 && (i ^ (i - 1)) == 1) {
                    arr.push(0);                   // 0 表示路
                    notAccessed.push(0);
                }
                else {
                    arr.push(1);                  // 1 表示墙
                }
            }
            this.mapArr.push(arr);
        }
        let count = r * c;
        let cur=RandomInt(0,count-1);
        let offs = [-c, c, -1, 1];         // 四周顶点在notAccessed的偏移量
        let offr = [-1, 1, 0, 0];                        // 四周顶点在arr的纵向偏移量
        let offc = [0, 0, -1, 1];                        // 四周顶点在arr的横向偏移量
        accessed.push(cur);
        notAccessed[cur] = 1;

        while (accessed.length < count) {
            let tr = parseInt((cur / c).toString());
            let tc = parseInt((cur % c).toString());
            let num = 0;
            let off = -1;

            // 遍历上下左右顶点
            while (++num < 5) {
                let around = RandomInt(0,3),
                    nr = tr + offr[around],
                    nc = tc + offc[around];
                if (nr >= 0 && nc >= 0 && nr < r && nc < c && notAccessed[cur + offs[around]] == 0) {
                    off = around;
                    break;
                }
            }
            // 四周顶点均被访问，则从已访问的顶点中随机抽取一个为cur
            if (off < 0) {
                cur = accessed[RandomInt(0, accessed.length-1)];
            }
            else {
                tr = 2 * tr + 1;
                tc = 2 * tc + 1;
                this.mapArr[tr + offr[off]][tc + offc[off]] = 0;
                cur = cur + offs[off];
                notAccessed[cur] = 1;
                accessed.push(cur);
                // cc.log(accessed.length)
            }
        }
        return this.mapArr;
    }

    public GetMapArr()
    {
        return this.mapArr;
    }

    private DetermineS()
    {
        let map:number[][]=MazeGenerator.Instance.GetMapArr();
        for(let i=0;i<map.length;i++)
        {
            for(let j=0;j<map[0].length;j++)
            {
                if(map[i][j]==0)
                {
                    this.mStartPos=new Vector2(i,j);
                    map[i][j]=3;
                    return;
                }
            }
        }
    }

    private DetermineE()
    {
        let map:number[][]=MazeGenerator.Instance.GetMapArr();
        for(let i=map.length-1;i>0;i--)
        {
            for(let j=map[0].length-1;j>0;j--)
            {
                if(map[i][j]==0)
                {
                    this.mEndPos=new Vector2(i,j);
                    map[i][j]=4;
                    return;
                }
            }
        }
    }

    public DetermineSE()
    {
        this.DetermineS();
        this.DetermineE();
    }

    public GetLocation(pos:Vector2)
    {
        return new Vector2(pos.y*paras.blocklength+paras.blocklength/2,pos.x*paras.blocklength+paras.blocklength/2);
    }

    public GetWinZone()
    {
        return new Zone(this.GetLocation(this.GetEndPos()),paras.blocklength,paras.blocklength);
    }

    // @ts-ignore
    private mStartPos:Vector2;
    // @ts-ignore
    private mEndPos:Vector2;
    private mapArr:any;

    public GetStartPos()
    {
        return this.mStartPos;
    }

    public GetEndPos()
    {
        return this.mEndPos;
    }

    static get Instance()
    {
        if(!this._Instance)
            this._Instance=new this();
        return this._Instance;
    }

    private static _Instance:MazeGenerator;
}