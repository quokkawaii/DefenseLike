// 맵 좌표 계산 함수. Phaser에 의존하지 않아 Vitest로 바로 테스트한다 (SYS-132)
import type { Cell, FieldSide, MapData, MapPoint } from '../../types/map';

const FIELDS: FieldSide[] = ['LEFT', 'RIGHT'];

// 전투 맵을 화면에 놓을 위치(offset). HUD 배치가 정해지면 이 값만 바꾼다 (SYS-133, UX-205)
// 임시값: 포탈 줄을 포함한 1210×990 영역을 1920×1080 화면 중앙에 둔다
//   x = (1920 - 1210) / 2 + 55 = 410
//   y = (1080 - 990) / 2 + 55 = 100   (55 = 블럭 절반, 좌표가 블럭 중심 기준이라서)
export const BATTLE_MAP_OFFSET: MapPoint = { x: 410, y: 100 };

/** 배치 칸 중심 좌표: origin + (col, row) × blockSize (UX-205 공식) */
export function getCellCenter(data: MapData, field: FieldSide, row: number, col: number): MapPoint {
  const origin = data.cellOrigin[field];
  return { x: origin.x + col * data.blockSize, y: origin.y + row * data.blockSize };
}

/** 양쪽 필드의 48개 배치 칸 전체 목록 */
export function getAllCells(data: MapData): Cell[] {
  const cells: Cell[] = [];
  for (const field of FIELDS) {
    for (let row = 0; row < data.cellRows; row++) {
      for (let col = 0; col < data.cellCols; col++) {
        cells.push({ field, row, col, center: getCellCenter(data, field, row, col) });
      }
    }
  }
  return cells;
}

/** 맵 기준 좌표 → 화면 좌표 변환: screen = map + offset (SYS-133) */
export function toScreen(point: MapPoint, offset: MapPoint): MapPoint {
  return { x: point.x + offset.x, y: point.y + offset.y };
}
