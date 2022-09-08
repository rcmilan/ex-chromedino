import Phaser from "phaser";
import { GAME_SCENE } from "../config/constants";

export default class PlayScene extends Phaser.Scene {
  private gameSpeed = 10;
  private isGameRunning = false;
  private respawnTime = 0;
  private score = 0;
  private ground!: Phaser.GameObjects.TileSprite;
  private dino!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private environment!: Phaser.GameObjects.Group;
  private startTrigger!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  private obsticles!: Phaser.Physics.Arcade.Group;
  private restart!: Phaser.GameObjects.Image;

  constructor() {
    super(GAME_SCENE);
  }

  create() {
    const { height, width } = this.game.config;

    this.startTrigger = this.physics.add
      .sprite(0, 10, "start-trigger")
      .setOrigin(0, 1)
      .setImmovable();

    this.ground = this.add
      .tileSprite(0, Number(height), 88, 26, "ground")
      .setOrigin(0, 1);

    this.dino = this.physics.add
      .sprite(0, Number(height), "dino-idle")
      .setCollideWorldBounds(true)
      .setGravityY(5000)
      .setBodySize(44, 92)
      .setDepth(1)
      .setOrigin(0, 1);

    this.environment = this.add.group();
    this.restart = this.add.image(0, 80, 'restart').setInteractive();

    this.obsticles = this.physics.add.group();

    this.initAnims();
    this.initStartTrigger();
    this.initColliders();
    this.handleInputs();
  }

  handleInputs() {
    this.restart.on("pointerdown", () => {
      this.dino.setVelocityY(0);
      this.dino.body.setSize(92);
      this.dino.body.offset.y = 0;
      this.physics.resume();
      this.obsticles.clear(true, true);
      this.isGameRunning = true;
      //   this.gameOverScreen.setAlpha(0);
      this.anims.resumeAll();
    });

    this.input.keyboard.on("keydown_SPACE", () => {
      if (!this.dino.body.onFloor() || this.dino.body.velocity.x > 0) {
        return;
      }

      //   this.jumpSound.play();
      this.dino.body.setSize(92);
      this.dino.body.offset.y = 0;
      this.dino.setVelocityY(-1600);
      this.dino.setTexture("dino", 0);
    });

    this.input.keyboard.on("keydown_DOWN", () => {
      if (!this.dino.body.onFloor() || !this.isGameRunning) {
        return;
      }

      this.dino.body.setSize(58);
      this.dino.body.offset.y = 34;
    });

    this.input.keyboard.on("keyup_DOWN", () => {
      if (this.score !== 0 && !this.isGameRunning) {
        return;
      }

      this.dino.body.setSize(92);
      this.dino.body.offset.y = 0;
    });
  }

  initColliders() {
    this.physics.add.collider(
      this.dino,
      this.obsticles,
      () => {
        // this.highScoreText.x = this.scoreText.x - this.scoreText.width - 20;

        // const highScore = this.highScoreText.text.substr(
        //   this.highScoreText.text.length - 5
        // );
        // const newScore =
        //   Number(this.scoreText.text) > Number(highScore)
        //     ? this.scoreText.text
        //     : highScore;

        // this.highScoreText.setText("HI " + newScore);
        // this.highScoreText.setAlpha(1);

        this.physics.pause();
        this.isGameRunning = false;
        this.anims.pauseAll();
        this.dino.setTexture("dino-hurt");
        this.respawnTime = 0;
        this.gameSpeed = 10;
        // this.gameOverScreen.setAlpha(1);
        this.score = 0;
        // this.hitSound.play();
      },
      this.gameArcadePhysicsCallback(),
      this
    );
  }

  private gameArcadePhysicsCallback(): ArcadePhysicsCallback | undefined {
    return () => {};
  }

  initStartTrigger() {
    const { width, height } = this.game.config;
    this.physics.add.overlap(
      this.startTrigger,
      this.dino,
      () => {
        if (this.startTrigger.y === 10) {
          this.startTrigger.body.reset(0, Number(height));
          return;
        }

        this.startTrigger.disableBody(true, true);

        const startEvent = this.time.addEvent({
          delay: 1000 / 60,
          loop: true,
          callbackScope: this,
          callback: () => {
            this.dino.setVelocityX(80);
            this.dino.play("dino-run", true);

            if (this.ground.width < width) {
              this.ground.width += 17 * 2;
            }

            if (this.ground.width >= 1000) {
              this.ground.width = Number(width);
              this.isGameRunning = true;
              this.dino.setVelocityX(0);
              //   this.scoreText.setAlpha(1);
              this.environment.setAlpha(1);
              startEvent.remove();
            }
          },
        });
      },
      this.gameArcadePhysicsCallback(),
      this
    );
  }

  initAnims() {
    this.anims.create({
      key: "dino-run",
      frames: this.anims.generateFrameNumbers("dino", { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "dino-down-anim",
      frames: this.anims.generateFrameNumbers("dino-down", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
