export default abstract class BaseComponent {
  protected scene: Phaser.Scene;

  constructor(parentScene: Phaser.Scene) {
    this.scene = parentScene;
  }

  abstract create(): void;

  abstract update(time: number, delta: number): void;
}
