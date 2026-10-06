import Phaser from 'phaser';

// SYS-031, SYS-032, SYS-034: 1920×1080 논리 좌표, 16:9 비례 확대·축소
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [],
};

export default new Phaser.Game(config);
