import Phaser from 'phaser';
import { BattleScene } from './scenes/BattleScene';

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
  // 등록된 Scene 목록 (SYS-010). 1단계는 BattleScene만 사용
  scene: [BattleScene],
};

export default new Phaser.Game(config);
