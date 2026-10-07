// 유닛 배치 칸 데이터와 찾기 함수를 UX-205 공식과 대조해 검증
import { describe, expect, it } from 'vitest';
import { FIELD_SIDES } from '../../src/constants/fieldSide';
import { getMonsterRoadBlocks } from '../../src/func/monsterRoad/monsterRoadBlocks';
import { getMonsterRoad, getUnitCells } from '../../src/func/map/mapJsonFunc';
import { getAllUnitCells, getUnitCellCenter } from '../../src/func/unitCell/unitCellSearch';
import type { FieldSide } from '../../src/types/fieldSide';

const unitCells = getUnitCells();

// UX-205 유닛 Cell 중심 공식: x = 시작x + col × 110, y = 220 + row × 110
const CELL_START_X: Record<FieldSide, number> = { LEFT: 110, RIGHT: 660 };
const CELL_START_Y = 220;
const BLOCK_SIZE = 110;
const CELL_ROWS = 6;
const CELL_COLS = 4;

describe('getAllUnitCells', () => {
  const allUnitCells = getAllUnitCells(unitCells);

  it('양쪽 합계 48개다', () => {
    expect(allUnitCells).toHaveLength(48);
  });

  it('칸 좌표가 서로 겹치지 않는다', () => {
    const places = new Set(allUnitCells.map((unitCell) => `${unitCell.center.x},${unitCell.center.y}`));
    expect(places.size).toBe(48);
  });

  it('어떤 칸도 몬스터 길과 겹치지 않는다', () => {
    const roadPlaces = new Set(getMonsterRoadBlocks(getMonsterRoad()).map((block) => `${block.x},${block.y}`));
    for (const unitCell of allUnitCells) {
      expect(roadPlaces.has(`${unitCell.center.x},${unitCell.center.y}`)).toBe(false);
    }
  });
});

describe('getUnitCellCenter', () => {
  it.each(FIELD_SIDES)('%s 필드의 6행 4열 모든 칸이 UX-205 공식 좌표와 같다', (fieldSide) => {
    for (let row = 0; row < CELL_ROWS; row++) {
      for (let col = 0; col < CELL_COLS; col++) {
        expect(getUnitCellCenter(unitCells, { fieldSide, row, col })).toEqual({
          x: CELL_START_X[fieldSide] + col * BLOCK_SIZE,
          y: CELL_START_Y + row * BLOCK_SIZE,
        });
      }
    }
  });

  it.each([
    { row: -1, col: 0 },
    { row: 6, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 4 },
  ])('없는 칸(row=$row, col=$col)은 오류를 낸다', ({ row, col }) => {
    expect(() => getUnitCellCenter(unitCells, { fieldSide: 'LEFT', row, col })).toThrow(RangeError);
  });
});
