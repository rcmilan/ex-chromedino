export default abstract class BaseComponent {
  abstract create(): void;

  abstract update(time: number, delta: number): void;
}
