// 유닛 배치 칸 관련 오류를 내는지 검증
import { describe, expect, it } from 'vitest';
import { throwIfUnitCellNotFound, throwIfUnitCellsEmpty } from '../../src/error/unitCellError';
import type { UnitCellInField, UnitCells, UnitCellSpot } from '../../src/types/unitCell';

const ONE_CELL: UnitCellInField[] = [{ row: 0, col: 0, center: { x: 0, y: 0 } }];

describe('throwIfUnitCellsEmpty', () => {
  it('양쪽 필드에 칸이 있으면 통과한다', () => {
    const unitCells: UnitCells = { LEFT: ONE_CELL, RIGHT: ONE_CELL };
    expect(() => throwIfUnitCellsEmpty(unitCells)).not.toThrow();
  });

  it('한쪽 칸이 비어 있으면 어느 쪽인지 알려 주며 오류를 낸다', () => {
    expect(() => throwIfUnitCellsEmpty({ LEFT: [], RIGHT: ONE_CELL })).toThrow('LEFT');
    expect(() => throwIfUnitCellsEmpty({ LEFT: ONE_CELL, RIGHT: [] })).toThrow('RIGHT');
  });
});

describe('throwIfUnitCellNotFound', () => {
  const spot: UnitCellSpot = { fieldSide: 'RIGHT', row: 9, col: 9 };

  it('찾은 칸이 있으면 통과한다', () => {
    expect(() => throwIfUnitCellNotFound(ONE_CELL[0], spot)).not.toThrow();
  });

  it('찾은 칸이 없으면 어느 칸인지 알려 주며 오류를 낸다', () => {
    expect(() => throwIfUnitCellNotFound(undefined, spot)).toThrow('RIGHT 필드에 row 9, col 9');
  });
});
