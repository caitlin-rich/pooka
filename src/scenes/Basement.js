import Phaser from "../lib/phaser.js";
import Treat from "../game/Treat.js";

//basement entrance is x = 600 y = 568 (in front of door)

//THIS IS CURRENTLY NOT DRY AT ALL. THIS IS WET. How do I save everything that repeats somewhere else and import it?

export default class Basement extends Phaser.Scene {
  constructor() {
    super("basement");
    this.player;
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
    this.load.image("household_items", "assets/interiors_16x16_greyscale.png");

    this.load.tilemapTiledJSON("basement_map", "assets/pooka_basement.json");

    //Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    //Sounds
    this.load.audio("pickup", "assets/Pickup_005.wav");
  }
  create() {
    //Tilemap
    const map = this.make.tilemap({ key: "basement_map" });
    const tilesetWallsGround = map.addTilesetImage(
      "roombuilder_16x16_greyscale",
      "room_builder"
    );
    const tilesetHouseItems = map.addTilesetImage(
      "interiors",
      "household_items"
    );

    const wallsLayer = map.createLayer("walls", tilesetWallsGround);
    const householdLayer = map.createLayer("household", tilesetHouseItems);

    wallsLayer.setCollisionByProperty({ collides: true });
    householdLayer.setCollisionByProperty({ collides: true });
    //yardLayer.setCollisionByProperty({collides: true})

    //Player
    this.player = this.physics.add.sprite(
      664,
      279,
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

    //Text
    const style = { color: "#000", fontSize: 14, backgroundColor: "white" };
    this.treatsCollectedText = this.add
      .text(310, 10, "It's dark down here.", style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0);

    //Physics and Camera
    this.physics.add.collider(this.player, wallsLayer);
    this.physics.add.collider(this.player, householdLayer);

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
      this.player.anims.play("dog-idle");
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
    if (this.cursors.up.isDown && this.player.x > 658 && this.player.x < 670 && this.player.y === 280) {
      this.scene.switch("game");
    }
  }
}
