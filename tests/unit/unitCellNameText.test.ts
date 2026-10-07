// 유닛 배치 칸 이름 글자의 내용과 위치
import { describe, expect, it } from 'vitest';
import { getUnitCellNamePosition, makeUnitCellNameText } from '../../src/func/unitCell/unitCellNameText';

describe('makeUnitCellNameText', () => {
  it('필드 첫 글자 + row/col이다', () => {
    expect(makeUnitCellNameText({ fieldSide: 'LEFT', row: 1, col: 2 })).toBe('L r1c2');
    expect(makeUnitCellNameText({ fieldSide: 'RIGHT', row: 5, col: 3 })).toBe('R r5c3');
  });
});

describe('getUnitCellNamePosition', () => {
  it('블럭 왼쪽 위 근처다', () => {
    expect(getUnitCellNamePosition({ x: 100, y: 200 })).toEqual({ x: 104, y: 204 });
  });
});
