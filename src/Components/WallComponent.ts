import {Component} from './Component'; // 确保路径正确
import Player from "../Actors/Player";
import MazeGenerator from "../Actors/Background/MazeGenerator";
import {CircleCollider, Zone} from "../Math";
import {Vector2} from "../Math";
import {paras} from "../Parameters"; // 确保路径正确

export default class WallComponent extends Component {
    constructor(actor: Player, updateOrder: number = 1) {
        super(actor, updateOrder);
    }

    Update(deltaTime: number) {
        super.Update(deltaTime);

        // 获取地图数组
        const mapGrid = MazeGenerator.Instance.GetMapArr();
        const tileSize = paras.blocklength;

        // 获取玩家的位置和碰撞箱
        const player = this.GetOwner() as Player;
        const playerPos = player.GetPosition(); // 假设 Player 类有一个 GetPosition 方法
        const playerCollider = player.GetCollider(); // 假设 Player 类有一个 GetCollider 方法

        // 计算角色所在的单元格
        const gridX = Math.floor(playerPos.x / tileSize);
        const gridY = Math.floor(playerPos.y / tileSize);

        // 定义检查的范围（包括当前单元格及其周围单元格）
        const checkRadius = 1; // 检查当前单元格及其周围的单元格
        const startX = Math.max(0, gridX - checkRadius);
        const startY = Math.max(0, gridY - checkRadius);
        const endX = Math.min(mapGrid[0].length - 1, gridX + checkRadius);
        const endY = Math.min(mapGrid.length - 1, gridY + checkRadius);

        // 遍历范围内的所有单元格来检测碰撞
        for (let y = startY; y <= endY; y++) {
            for (let x = startX; x <= endX; x++) {
                if (mapGrid[y][x] === 1) {
                    const wallCollider = new Zone(new Vector2(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2), tileSize, tileSize);

                    if (wallCollider.IntersectCircleCollider(playerCollider)) {
                        // 如果碰撞，调用 Stop 方法停止角色
                        (this.GetOwner() as Player).StopMoving(deltaTime, wallCollider.mPosition);
                        //return; // 碰撞后不需要继续检测
                    }
                }
            }
        }
    }
}