import Game from './game/Game'
import { GameConfig } from './game/types'

const config: GameConfig = {
    width: 1200,
    height: 900,
    tileSize: 20,
    primaryColor: "#fff",
    secondaryColor: "#fff"
}

const game = new Game(config)
game.init();

document.querySelector('#toggle').addEventListener('click', () => {
    game.toggleGameState();
})
document.querySelector('#nextGen').addEventListener('click', () => {
    game.nextGeneration();
})