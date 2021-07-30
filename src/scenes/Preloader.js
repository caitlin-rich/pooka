import Phaser from "../lib/phaser.js";

export default class Preloader extends Phaser.Scene{
    constructor(){
        super("preloader")
    }
    preload(){
            //Player
    this.load.atlas(
        "dog",
        "assets/tinydogjsonsheet.png",
        "assets/tinydogjsonsheet.json"
      );
  
      //TreatHeart
      this.load.image("treat", "assets/fullheart.png");
  
      //Tiles
      this.load.image("room_builder", "assets/roombuilder_16x16_greyscale.png");
      this.load.image("plant_tiles", "assets/plantsgreyscale.png");
      this.load.image("household_items", "assets/interiors_16x16_greyscale.png");
      //this.load.image("spooky_yard_tiles", 'assets/Dead Tileset V1.png')
  
      this.load.tilemapTiledJSON("home_map", "assets/pooka_map_1.json");
  
      //Cursors
      this.cursors = this.input.keyboard.createCursorKeys();
  
      //Sounds
      this.load.audio('pickup', 'assets/Pickup_005.wav')
    }
    create(){
        this.scene.start("game")
    }
}