import Game from './game/Game'
import { GameConfig } from './game/types'

const config: GameConfig = {
    width: 800,
    height: 600,
    tileSize: 20,
    primaryColor: "rgb(100, 240, 150)",
    secondaryColor: "#FF0055"
}

new Game(config).init()