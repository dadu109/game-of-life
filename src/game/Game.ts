import { GameConfig } from "./types"

class Game {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private width: number;
    private height: number;
    private primaryColor: string;
    private secondaryColor: string;
    private TILE_SIZE: number;
    private TILES_X: number;
    private TILES_Y: number;

    constructor(config: GameConfig) {
        this.canvas = document.querySelector<HTMLCanvasElement>("#root");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width = config.width;
        this.canvas.height = this.height = config.height;
        this.TILE_SIZE = config.tileSize;
        this.primaryColor = config.primaryColor;
        this.secondaryColor = config.secondaryColor;
        this.TILES_X = this.width / this.TILE_SIZE;
        this.TILES_Y = this.height / this.TILE_SIZE;
    }

    init(): void {
        this.drawGrid();
    }

    drawGrid(): void {
        this.ctx.fillStyle = this.primaryColor;
        this.ctx.strokeStyle = this.secondaryColor;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.TILES_X; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.TILE_SIZE - 0.5, 0);
            this.ctx.lineTo(i * this.TILE_SIZE - 0.5, this.height);
            this.ctx.stroke();
        }
        for (let j = 0; j < this.TILES_Y; j++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, j * this.TILE_SIZE - 0.5);
            this.ctx.lineTo(this.width, j * this.TILE_SIZE - 0.5);
            this.ctx.stroke();
        }
    }
}

export default Game