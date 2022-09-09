import Phaser from "phaser";
import {
  ASSETS_HIT,
  ASSETS_JUMP,
  ASSETS_REACH,
  ASSETS_RESTART,
  GAME_SCENE,
} from "../config/constants";

export default class PlayScene extends Phaser.Scene {
  private gameSpeed: number | undefined;
  private isGameRunning: boolean | undefined;
  private respawnTime: number | undefined;
  private score: number | undefined;

  private jumpSound: Phaser.Sound.BaseSound | undefined;
  private hitSound: Phaser.Sound.BaseSound | undefined;
  private reachSound: Phaser.Sound.BaseSound | undefined;
  private startTrigger:
    | Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
    | undefined;

  constructor() {
    super(GAME_SCENE);
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;

    this.jumpSound = this.sound.add(ASSETS_JUMP, { volume: 0.2 });
    this.hitSound = this.sound.add(ASSETS_HIT, { volume: 0.2 });
    this.reachSound = this.sound.add(ASSETS_REACH, { volume: 0.2 });

    this.startTrigger = this.physics.add
      .sprite(0, 10, ASSETS_RESTART)
      .setOrigin(0, 1)
      .setImmovable();
  }
}
