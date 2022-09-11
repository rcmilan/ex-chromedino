import Phaser from "phaser";
import * as constants from "../config/constants";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(constants.SCENE_PRELOAD);
  }

  preload() {
    this.load.audio(constants.ASSETS_JUMP, "assets/jump.m4a");
    this.load.audio(constants.ASSETS_HIT, "assets/hit.m4a");
    this.load.audio(constants.ASSETS_REACH, "assets/reach.m4a");

    this.load.image(constants.ASSETS_GROUND, "assets/ground.png");
    this.load.image(constants.ASSETS_DINO_IDLE, "assets/dino-idle.png");
    this.load.image(constants.ASSETS_DINO_HURT, "assets/dino-hurt.png");
    this.load.image(constants.ASSETS_RESTART, "assets/restart.png");
    this.load.image(constants.ASSETS_GAMEOVER, "assets/game-over.png");
    this.load.image(constants.ASSETS_CLOUD, "assets/cloud.png");

    this.load.spritesheet(constants.ASSETS_STAR, "assets/stars.png", {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet(constants.ASSETS_MOON, "assets/moon.png", {
      frameWidth: 20,
      frameHeight: 40,
    });

    this.load.spritesheet(constants.ASSETS_DINO, "assets/dino-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet(constants.ASSETS_DINO_DOWN, "assets/dino-down.png", {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet(constants.ASSETS_ENEMY_BIRD, "assets/enemy-bird.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.image(constants.ASSETS_OBSTACLE_1, "assets/cactuses_small_1.png");
    this.load.image(constants.ASSETS_OBSTACLE_2, "assets/cactuses_small_2.png");
    this.load.image(constants.ASSETS_OBSTACLE_3, "assets/cactuses_small_3.png");
    this.load.image(constants.ASSETS_OBSTACLE_4, "assets/cactuses_big_1.png");
    this.load.image(constants.ASSETS_OBSTACLE_5, "assets/cactuses_big_2.png");
    this.load.image(constants.ASSETS_OBSTACLE_6, "assets/cactuses_big_3.png");

    // this.load.audio(ASSETS_JUMP, "assets/assets_jump.m4a");
    // this.load.audio(ASSETS_HIT, "assets/assets_hit.m4a");
    // this.load.audio(ASSETS_REACH, "assets/assets_reach.m4a");
  }

  create() {
    this.scene.start(constants.SCENE_PLAY);
  }
}
