import Phaser from 'phaser';
import { BattleScene } from './scenes/BattleScene';

// 화면 크기는 1920×1080 기준이고, 창 크기에 맞춰 16:9 비율을 지키며 늘리고 줄인다 (SYS-031, 032, 034)
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 1920,
  height: 1080,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  // 게임에 등록할 화면(Scene) 목록. 지금은 전투 화면 하나다 (SYS-010)
  scene: [BattleScene],
};

export default new Phaser.Game(config);
