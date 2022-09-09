import Phaser from "phaser";
import {
  ASSETS_CLOUD,
  ASSETS_DINO,
  ASSETS_DINO_DOWN,
  ASSETS_DINO_HURT,
  ASSETS_DINO_IDLE,
  ASSETS_ENEMY_BIRD,
  ASSETS_GAMEOVER,
  ASSETS_GROUND,
  ASSETS_HIT,
  ASSETS_JUMP,
  ASSETS_MOON,
  ASSETS_OBSTACLE_1,
  ASSETS_OBSTACLE_2,
  ASSETS_OBSTACLE_3,
  ASSETS_OBSTACLE_4,
  ASSETS_OBSTACLE_5,
  ASSETS_OBSTACLE_6,
  ASSETS_REACH,
  ASSETS_RESTART,
  ASSETS_STAR,
  GAME_SCENE,
  PRELOAD_SCENE,
} from "../config/constants";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super(PRELOAD_SCENE);
  }

  preload() {
    this.load.audio(ASSETS_JUMP, "assets/jump.m4a");
    this.load.audio(ASSETS_HIT, "assets/hit.m4a");
    this.load.audio(ASSETS_REACH, "assets/reach.m4a");

    this.load.image(ASSETS_GROUND, "assets/ground.png");
    this.load.image(ASSETS_DINO_IDLE, "assets/dino-idle.png");
    this.load.image(ASSETS_DINO_HURT, "assets/dino-hurt.png");
    this.load.image(ASSETS_RESTART, "assets/restart.png");
    this.load.image(ASSETS_GAMEOVER, "assets/game-over.png");
    this.load.image(ASSETS_CLOUD, "assets/cloud.png");

    this.load.spritesheet(ASSETS_STAR, "assets/stars.png", {
      frameWidth: 9,
      frameHeight: 9,
    });

    this.load.spritesheet(ASSETS_MOON, "assets/moon.png", {
      frameWidth: 20,
      frameHeight: 40,
    });

    this.load.spritesheet(ASSETS_DINO, "assets/dino-run.png", {
      frameWidth: 88,
      frameHeight: 94,
    });

    this.load.spritesheet(ASSETS_DINO_DOWN, "assets/dino-down.png", {
      frameWidth: 118,
      frameHeight: 94,
    });

    this.load.spritesheet(ASSETS_ENEMY_BIRD, "assets/enemy-bird.png", {
      frameWidth: 92,
      frameHeight: 77,
    });

    this.load.image(ASSETS_OBSTACLE_1, "assets/cactuses_small_1.png");
    this.load.image(ASSETS_OBSTACLE_2, "assets/cactuses_small_2.png");
    this.load.image(ASSETS_OBSTACLE_3, "assets/cactuses_small_3.png");
    this.load.image(ASSETS_OBSTACLE_4, "assets/cactuses_big_1.png");
    this.load.image(ASSETS_OBSTACLE_5, "assets/cactuses_big_2.png");
    this.load.image(ASSETS_OBSTACLE_6, "assets/cactuses_big_3.png");
  }

  create() {
    this.scene.start(GAME_SCENE);
  }
}
