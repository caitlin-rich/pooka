import Phaser from "../lib/phaser.js";
import Treat from "../game/Treat.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
    this.player;
    this.treats;
    this.treatsCollected = 0;
    this.treatsCollectedText;
  }

  preload() {
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

  create() {
    //Tilemap
    const map = this.make.tilemap({ key: "home_map" });
    const tilesetWallsGround = map.addTilesetImage(
      "roombuilder_16x16_greyscale",
      "room_builder"
    );
    const tilesetHouseItems = map.addTilesetImage(
      "interiors_16x16_greyscale",
      "household_items"
    );
    const tilesetPlants = map.addTilesetImage("plantsgreyscale", "plant_tiles");
    //const tilesetSpooky = map.addTilesetImage("dead_tileset", "spooky_yard_tiles") //this needs tileset name in Tiled

    map.createLayer("ground", tilesetWallsGround);
    map.createLayer("plants", tilesetPlants);
    //const yardLayer = map.createLayer("spookyoutside", tilesetSpooky) //this needs layer name
    const wallsLayer = map.createLayer("walls", tilesetWallsGround);
    const householdLayer = map.createLayer("household", tilesetHouseItems);

    wallsLayer.setCollisionByProperty({ collides: true });
    householdLayer.setCollisionByProperty({ collides: true });
    //yardLayer.setCollisionByProperty({collides: true})

    //Player
    this.player = this.physics.add.sprite(
      350,
      680,
      "dog",
      "spritesheet-372.png"
    ); //start middle of living room

    //Player Sprite Animations
    this.anims.create({
      key: "dog-idle",
      frames: [{ key: "dog", frame: "spritesheet-372.png" }],
    });

    this.anims.create({
      key: "dog-down",
      frames: this.anims.generateFrameNames("dog", {
        start: 372,
        end: 375,
        prefix: "spritesheet-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: "dog-up",
      frames: this.anims.generateFrameNames("dog", {
        start: 380,
        end: 383,
        prefix: "spritesheet-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 6,
    });

    this.anims.create({
      key: "dog-side",
      frames: this.anims.generateFrameNames("dog", {
        start: 364,
        end: 367,
        prefix: "spritesheet-",
        suffix: ".png",
      }),
      repeat: -1,
      frameRate: 6,
    });

    //Treats
    this.treats = this.physics.add.group({
      classType: Treat,
    });

    for (let i = 0; i < 31; i++) {
      const treat = this.treats.get(
        Phaser.Math.Between(24, 1000),
        Phaser.Math.Between(24, 776),
        "treat"
      );
      this.add.existing(treat);
    }

    const style = { color: "#000", fontSize: 14, backgroundColor: "white" };
    this.treatsCollectedText = this.add
      .text(
        310,
        10,
        "Mama & Mama are sleeping...let's go find some treats!",
        style
      )
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    //Physics and Camera
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, householdLayer);

    this.physics.add.overlap(
      this.player,
      this.treats,
      this.handleCollectTreats,
      undefined,
      this
    );

    this.cameras.main.startFollow(this.player, true);
  }

  update() {
    //Player Movement and Animation
    if (this.cursors.left.isDown) {
      this.player.anims.play("dog-side", true);
      this.player.scaleX = -1;
      this.player.body.offset.x = 16;
      this.player.setVelocityX(-120);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("dog-side", true);
      this.player.scaleX = 1;
      this.player.setVelocityX(120);
      this.player.setVelocityY(0);
      this.player.body.offset.x = 0;
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("dog-up", true);
      this.player.setVelocityY(-120);
      this.player.setVelocityX(0);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("dog-down", true);
      this.player.setVelocityY(120);
      this.player.setVelocityX(0);
    } else {
      this.player.anims.play("dog-idle")
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }

  handleCollectTreats(player, treat) {
   
    this.treats.killAndHide(treat);
    this.physics.world.disableBody(treat.body);
    this.treatsCollected++;
    if (this.treatsCollected === 1) {
      this.treatsCollectedText.text = `You have eaten ${this.treatsCollected} treat. Yay!`;
      return;
    }
    if (this.treatsCollected === 30) {
      this.treatsCollectedText.text = `You found all the treats!`;
      return;
    }
    this.treatsCollectedText.text = `You have eaten ${this.treatsCollected} treats. Yay!`;
  }
}
