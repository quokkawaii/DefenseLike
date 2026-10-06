// 전투 화면 Scene (SYS-010). 1단계에서는 맵만 임시 도형으로 그린다
import Phaser from 'phaser';
import { getMapData } from '../../func/map/mapJsonFunc';
import { BATTLE_MAP_OFFSET, getAllCells, toScreen } from '../../func/map/map';
import type { FieldSide, MapData, MapPoint } from '../../types/map';

// 임시 도형 색상 (시각 디자인 3단계에서 배경 이미지로 교체, UX-199)
const COLOR = {
  path: 0x8d7b5a, // 몬스터 경로 블럭
  cell: 0x6fa86b, // 유닛 배치 칸
  cellLine: 0x2f4f2f, // 배치 칸 경계선
  portal: 0x7b4fd6, // 포탈 (UX-167)
  spawn: 0xff4040, // 실제 생성 판정 위치 SpawnPoint
};

const FIELDS: FieldSide[] = ['LEFT', 'RIGHT'];

export class BattleScene extends Phaser.Scene {
  private map: MapData;

  constructor() {
    super('BattleScene');
  }

  create() {
    this.map = getMapData();
    const size = this.map.blockSize;
    const half = size / 2;
    const g = this.add.graphics();

    // ── 1. 몬스터 경로 블럭 ──
    // 중앙 공유 열(index 5~12)은 좌우 경로가 같은 좌표라 한 번만 칠한다 (GAME-275)
    // 방향 화살표는 그리지 않는다 (UX-166)
    const drawn = new Set<string>();
    for (const field of FIELDS) {
      for (const p of this.map.paths[field]) {
        const key = `${p.x},${p.y}`;
        if (drawn.has(key)) continue;
        drawn.add(key);
        const s = toScreen(p, BATTLE_MAP_OFFSET);
        g.fillStyle(COLOR.path).fillRect(s.x - half, s.y - half, size, size);
      }
    }

    // ── 2. 유닛 배치 칸 48개 + 경계선 ──
    // UX-200은 평상시 경계선 숨김이지만, 1단계 확인용으로 임시 상시 표시 (2단계에서 규칙대로 변경)
    for (const cell of getAllCells(this.map)) {
      const s = toScreen(cell.center, BATTLE_MAP_OFFSET);
      g.fillStyle(COLOR.cell).fillRect(s.x - half, s.y - half, size, size);
      g.lineStyle(2, COLOR.cellLine).strokeRect(s.x - half, s.y - half, size, size);
    }

    // ── 3. 포탈과 SpawnPoint ──
    // 포탈은 경로 칸에 포함되지 않는 별도 표시, 실제 생성 판정은 SpawnPoint 좌표 (SYS-133, UX-167)
    for (const field of FIELDS) {
      const s = toScreen(this.map.spawnPoints[field], BATTLE_MAP_OFFSET);
      g.fillStyle(COLOR.portal, 0.6).fillCircle(s.x, s.y, 40);
      g.fillStyle(COLOR.spawn).fillCircle(s.x, s.y, 6);
    }

    // ── 4. 개발용 좌표 표시 (개발 실행에서만, 배포 빌드에는 나오지 않음) ──
    if (import.meta.env.DEV) {
      this.drawDebugLabels();
    }
  }

  /** 경로 index(L0~L23, R0~R23)와 칸 row/col을 글자로 표시 */
  private drawDebugLabels() {
    const half = this.map.blockSize / 2;
    const style: Phaser.Types.GameObjects.Text.TextStyle = { fontSize: '14px', color: '#ffffff' };
    // 공유 열에서 겹치지 않도록 LEFT는 블럭 왼쪽 위, RIGHT는 오른쪽 아래에 표시
    this.map.paths.LEFT.forEach((p, i) => this.label(p, -half + 4, -half + 4, `L${i}`, style));
    this.map.paths.RIGHT.forEach((p, i) => this.label(p, half - 30, half - 20, `R${i}`, style));
    for (const cell of getAllCells(this.map)) {
      this.label(cell.center, -half + 4, -half + 4, `${cell.field[0]} r${cell.row}c${cell.col}`, style);
    }
  }

  /** 맵 좌표 + 픽셀 보정 위치에 글자 하나 표시 */
  private label(p: MapPoint, dx: number, dy: number, text: string, style: Phaser.Types.GameObjects.Text.TextStyle) {
    const s = toScreen(p, BATTLE_MAP_OFFSET);
    this.add.text(s.x + dx, s.y + dy, text, style);
  }
}
