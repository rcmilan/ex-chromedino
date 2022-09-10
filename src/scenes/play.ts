import Phaser from "phaser";
import {
  ASSETS_GROUND,
  ASSETS_HIT,
  ASSETS_JUMP,
  ASSETS_REACH,
  ASSETS_RESTART,
  SCENE_PLAY,
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
  private ground!: Phaser.GameObjects.TileSprite;

  constructor() {
    super(SCENE_PLAY);
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;
    this.isGameRunning = false;
    this.respawnTime = 0;
    this.score = 0;

    this.ground = this.add
      .tileSprite(0, Number(height), Number(width), 26, ASSETS_GROUND)
      .setOrigin(0, 1);
  }

  update(time: number, delta: number): void {
    this.ground.tilePositionX += 5;
  }
}
