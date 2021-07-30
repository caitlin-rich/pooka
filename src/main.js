import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'

export default new Phaser.Game({
    type: Phaser.AUTO,
    width: 600, 
    height: 400,
    scene: Game,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
})
