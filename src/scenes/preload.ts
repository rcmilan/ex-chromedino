import Phaser from "phaser";
import { GAME_SCENE, PRELOAD_SCENE } from "../config/constants";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(PRELOAD_SCENE);
  }

  preload() {
    this.load.image("ground", "assets/ground.png");
    this.load.image("dino-idle", "assets/dino-idle.png");
    this.load.image("dino-hurt", "assets/dino-hurt.png");

    this.load.spritesheet("dino", "assets/dino-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet("dino-down", "assets/dino-down.png", {
      frameWidth: 118,
      frameHeight: 94,
    });
  }

  create() {
    this.scene.start(GAME_SCENE);
  }
}
