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
    private BOARD: boolean[][];
    private isPaused: boolean = false;

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
        this.BOARD = this.generateEmptyBoard();
        this.drawBoard();
        requestAnimationFrame(() => this.loop())


        this.canvas.addEventListener("click", e => {
            const x = Math.floor((e.clientX - this.canvas.offsetLeft) / this.TILE_SIZE);
            const y = Math.floor((e.clientY - this.canvas.offsetTop) / this.TILE_SIZE);
            this.BOARD[x][y] = !this.BOARD[x][y];
            this.draw();
        });
    }

    loop(): void {
        if (!this.isPaused) return;

        this.nextGeneration();
        requestAnimationFrame(() => this.loop());
    }

    draw(): void {
        this.clearCanvas();
        this.drawBoard();
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

    drawBoard(): void {
        this.ctx.fillStyle = this.primaryColor;

        for (let i = 0; i < this.TILES_X; i++) {
            for (let j = 0; j < this.TILES_Y; j++) {
                if (!this.isCellAlive(i, j)) continue;

                this.ctx.fillRect(i * this.TILE_SIZE, j * this.TILE_SIZE, this.TILE_SIZE, this.TILE_SIZE);
            }
        }
    }

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    generateEmptyBoard(): boolean[][] {
        const x = []
        for (let i = 0; i < this.TILES_X; i++) {
            const y = []
            for (let j = 0; j < this.TILES_Y; j++) {
                y.push(false)
            }
            x.push(y)
        }
        return x;
    }

    isCellAlive(x: number, y: number): number {
        if (x < 0 || x >= this.TILES_X || y < 0 || y >= this.TILES_Y) {
            return 0;
        }
        return this.BOARD[x][y] ? 1 : 0;
    }

    countNeighbours(x: number, y: number): number {
        let count = 0;
        for (let i of [-1, 0, 1]) {
            for (let j of [-1, 0, 1]) {
                if (!(i === 0 && j === 0)) {
                    count += this.isCellAlive(x + i, y + j);
                }
            }
        }
        return count;
    }

    computeNextGeneration(): boolean[][] {
        const board = this.generateEmptyBoard();
        for (let i = 0; i < this.TILES_X; i++) {
            for (let j = 0; j < this.TILES_Y; j++) {
                const count = this.countNeighbours(i, j);
                if (!this.isCellAlive(i, j)) {
                    if (count === 3) {
                        board[i][j] = true;
                    }
                } else {
                    if (count == 2 || count == 3) {
                        board[i][j] = true;
                    }
                }
            }
        }
        return board;
    }

    nextGeneration(): void {
        this.BOARD = this.computeNextGeneration();
        this.draw();
    }

    toggleGameState(): void {
        this.isPaused = !this.isPaused;
        requestAnimationFrame(() => this.loop())
    }
}

export default Game