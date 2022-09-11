import * as constants from "../config/constants";
import BaseComponent from "./baseComponent";

export default class PlayerComponent extends BaseComponent {
  public dino!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  private parentScene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super();
    this.parentScene = scene;
  }

  create(): void {
    const { height } = this.parentScene.game.config;

    this.dino = this.parentScene.physics.add
      .sprite(0, Number(height), constants.ASSETS_DINO_IDLE)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000);

    /* INPUTS */
    this.parentScene.input.keyboard.on("keydown-SPACE", () => {
      if (!this.dino.body.onFloor()) return;

      this.dino.setVelocityY(-1600);
    });

    /* ANIMATIONS */
    this.parentScene.anims.create({
      key: constants.ANIM_DINO_RUN,
      frames: this.parentScene.anims.generateFrameNumbers(constants.ASSETS_DINO, {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.parentScene.anims.create({
      key: constants.ANIM_DINO_DOWN,
      frames: this.parentScene.anims.generateFrameNumbers(constants.ASSETS_DINO_DOWN, {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
  update(time: number, delta: number): void {
    if (this.dino.body.deltaAbsY() > 0) {
      // Dino pulando
      this.dino.anims.stop();
      this.dino.setTexture(constants.ASSETS_DINO);
    } else {
      this.dino.play(constants.ANIM_DINO_RUN, true);
    }
  }
}
