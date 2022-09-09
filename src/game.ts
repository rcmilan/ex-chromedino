import Phaser from "phaser";
import PlayScene from "./scenes/play";
import PreloadScene from "./scenes/preload";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, PlayScene],
};

new Phaser.Game(config);