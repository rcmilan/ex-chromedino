import Phaser from "phaser";
import PlayerComponent from "../components/playerComponent";
import * as constants from "../config/constants";

export default class PlayScene extends Phaser.Scene {
  private gameSpeed!: number;
  private ground!: Phaser.GameObjects.TileSprite;
  private player: PlayerComponent;

  constructor() {
    super(constants.SCENE_PLAY);

    this.player = new PlayerComponent(this);
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;

    this.ground = this.add
      .tileSprite(0, Number(height), Number(width), 26, constants.ASSETS_GROUND)
      .setOrigin(0, 1);

    this.player.create();

    this.initAnimations();
    this.handleInputs();
  }

  initAnimations() {
    this.anims.create({
      key: constants.ANIM_ENEMY_FLY,
      frames: this.anims.generateFrameNumbers(constants.ASSETS_ENEMY_BIRD, {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  handleInputs() {}

  update(time: number, delta: number): void {
    this.ground.tilePositionX += this.gameSpeed;

    this.player.update(time, delta);
  }
}
