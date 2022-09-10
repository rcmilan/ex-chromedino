import Phaser from "phaser";
import {
  ANIM_DINO_DOWN,
  ANIM_DINO_RUN,
  ANIM_ENEMY_FLY,
  ASSETS_DINO,
  ASSETS_DINO_DOWN,
  ASSETS_DINO_IDLE,
  ASSETS_ENEMY_BIRD,
  ASSETS_GROUND,
  SCENE_PLAY,
} from "../config/constants";

export default class PlayScene extends Phaser.Scene {
  private gameSpeed!: number;
  private ground!: Phaser.GameObjects.TileSprite;
  private dino!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor() {
    super(SCENE_PLAY);
  }

  create() {
    const { height, width } = this.game.config;

    this.gameSpeed = 10;

    this.ground = this.add
      .tileSprite(0, Number(height), Number(width), 26, ASSETS_GROUND)
      .setOrigin(0, 1);

    this.dino = this.physics.add
      .sprite(0, Number(height), ASSETS_DINO_IDLE)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);

    this.initAnimations();
    this.handleInputs();
  }

  initAnimations() {
    this.anims.create({
      key: ANIM_DINO_RUN,
      frames: this.anims.generateFrameNumbers(ASSETS_DINO, {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: ANIM_DINO_DOWN,
      frames: this.anims.generateFrameNumbers(ASSETS_DINO_DOWN, {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: ANIM_ENEMY_FLY,
      frames: this.anims.generateFrameNumbers(ASSETS_ENEMY_BIRD, {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1,
    });
  }

  handleInputs() {
    this.input.keyboard.on("keydown-SPACE", () => {
      if (!this.dino.body.onFloor()) return;

      this.dino.setVelocityY(-1600);
    });
  }

  update(time: number, delta: number): void {
    this.ground.tilePositionX += this.gameSpeed;

    if (this.dino.body.deltaAbsY() > 0) {
      // Dino esta pulando
      this.dino.anims.stop();
      this.dino.setTexture(ASSETS_DINO);
    } else {
      this.dino.play(ANIM_DINO_RUN, true);
    }
  }
}
