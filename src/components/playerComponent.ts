import BaseComponent from "./baseComponent";
import * as constants from "../config/constants";
import * as spriteParams from "../config/spriteParams";

export default class PlayerComponent extends BaseComponent {
  public dino!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  create(): void {
    const { height } = this.scene.game.config;

    const initialX = 32;
    const initialY = Number(height);

    this.dino = this.scene.physics.add
      .sprite(initialX, initialY, constants.ASSETS_DINO_IDLE)
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setBodySize(spriteParams.DINO_WIDTH, spriteParams.DINO_HEIGHT);

    this.handleInputs();
    this.initAnimations();
  }

  update(time: number, delta: number): void {
    if (this.dino.body.deltaAbsY() > 0) {
      // Dino pulando
      this.dino.anims.stop();
      this.dino.setTexture(constants.ASSETS_DINO);
    } else {
      
      if (this.dino.body.height < spriteParams.DINO_HEIGHT) {
        this.dino.play(constants.ANIM_DINO_DOWN, true);
      } else {
        this.dino.play(constants.ANIM_DINO_RUN, true);
      }
    }
  }

  private initAnimations() {
    this.scene.anims.create({
      key: constants.ANIM_DINO_RUN,
      frames: this.scene.anims.generateFrameNumbers(constants.ASSETS_DINO, {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: constants.ANIM_DINO_DOWN,
      frames: this.scene.anims.generateFrameNumbers(
        constants.ASSETS_DINO_DOWN,
        {
          start: 0,
          end: 1,
        }
      ),
      frameRate: 10,
      repeat: -1,
    });
  }

  private handleInputs() {
    this.scene.input.keyboard.on("keydown-SPACE", () => {
      if (!this.dino.body.onFloor()) return;

      this.restoreSize();

      this.dino.setVelocityY(-1600);
    });

    this.scene.input.keyboard.on("keydown-DOWN", () => {
      if (!this.dino.body.onFloor()) return;

      this.dino.body.setSize(
        spriteParams.DINO_DOWN_WIDTH,
        spriteParams.DINO_DOWN_HEIGHT / 2
      );

      this.dino.body.offset.y = 36;
      this.dino.body.offset.x = 0;

    });

    this.scene.input.keyboard.on("keyup-DOWN", () => {
      if (!this.dino.body.onFloor()) return;

      this.restoreSize();
    });
  }

  private restoreSize() {
    this.dino.body.setSize(spriteParams.DINO_WIDTH, spriteParams.DINO_HEIGHT);
    this.dino.body.offset.y = 0;
    this.dino.body.offset.x = 0;
  }
}
