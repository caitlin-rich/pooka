import Phaser from "../lib/phaser.js";

export default class Title extends Phaser.Scene {
    constructor(){
        super("title")
        this.titleText = ''
    }

    preload(){
        this.load.image('title', 'assets/pookatitle.png');
        this.load.image('pooka', 'assets/pooka_drawing.png')
        this.cursors = this.input.keyboard.createCursorKeys();


    }

    create(){

    this.add.image(400, 100, 'title').setScale(0.5)
    this.add.image(380, 250, 'pooka').setScale(0.2)

    const style = { color: "#000", fontSize: 14, backgroundColor: "white" };
    this.titleText = this.add
      .text(
        310,
        350,
        "Press SPACE to Start",
        style
      )
    }
    
    update(){
        if (this.cursors.space.isDown) {
            this.scene.start("game")
        }
    }
}

