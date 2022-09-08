import Phaser from "phaser";
import PlayScene from "./scenes/play";
import PreloadScene from "./scenes/preload";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
//   backgroundColor: "#F0F0F0",
  pixelArt: true,
  transparent: true,
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: [PreloadScene, PlayScene],
};

export default new Phaser.Game(config);