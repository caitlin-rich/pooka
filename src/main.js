import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'
import Title from './scenes/Title.js'
import Basement from './scenes/Basement.js'

const phaserConfig = {
    type: Phaser.AUTO,
    width: 600, 
    height: 400,
    scene: [Title, Game, Basement],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}


const game = new Phaser.Game(phaserConfig)

export default game
