// 맵 좌표 데이터와 계산 함수 검증 (UX-205, SYS-133, GAME-038)
import { describe, expect, it } from 'vitest';
import { getMapData } from '../../src/func/map/mapJsonFunc';
import { getAllCells, getCellCenter, toScreen } from '../../src/func/map/map';
import type { FieldSide } from '../../src/types/map';

const map = getMapData();
const FIELDS: FieldSide[] = ['LEFT', 'RIGHT'];

describe('경로 Point', () => {
  it.each(FIELDS)('%s 경로는 24개 Point다', (field) => {
    expect(map.paths[field]).toHaveLength(24);
  });

  it.each(FIELDS)('%s 경로의 연속한 Point는 정확히 1 Block 간격이다 (23→0 순환 포함)', (field) => {
    const path = map.paths[field];
    path.forEach((p, i) => {
      const next = path[(i + 1) % path.length];
      const distance = Math.abs(p.x - next.x) + Math.abs(p.y - next.y);
      expect(distance).toBe(map.blockSize);
    });
  });

  it('좌·우 경로의 index 5~12는 같은 좌표다 (중앙 공유 열)', () => {
    for (let i = 5; i <= 12; i++) {
      expect(map.paths.LEFT[i]).toEqual(map.paths.RIGHT[i]);
    }
  });

  it('UX-205 확정표의 주요 좌표와 일치한다', () => {
    expect(map.paths.LEFT[0]).toEqual({ x: 0, y: 110 });
    expect(map.paths.LEFT[17]).toEqual({ x: 0, y: 880 });
    expect(map.paths.RIGHT[0]).toEqual({ x: 1100, y: 110 });
    expect(map.paths.RIGHT[17]).toEqual({ x: 1100, y: 880 });
    expect(map.paths.LEFT[5]).toEqual({ x: 550, y: 110 });
    expect(map.paths.LEFT[12]).toEqual({ x: 550, y: 880 });
  });
});

describe('배치 칸', () => {
  const cells = getAllCells(map);

  it('양쪽 합계 48개다', () => {
    expect(cells).toHaveLength(48);
  });

  it('칸 좌표가 서로 겹치지 않는다', () => {
    const keys = new Set(cells.map((c) => `${c.center.x},${c.center.y}`));
    expect(keys.size).toBe(48);
  });

  it('어떤 칸도 경로 Point와 겹치지 않는다', () => {
    const pathKeys = new Set(FIELDS.flatMap((f) => map.paths[f].map((p) => `${p.x},${p.y}`)));
    for (const c of cells) {
      expect(pathKeys.has(`${c.center.x},${c.center.y}`)).toBe(false);
    }
  });

  it('UX-205 공식과 일치한다', () => {
    expect(getCellCenter(map, 'LEFT', 0, 0)).toEqual({ x: 110, y: 220 });
    expect(getCellCenter(map, 'LEFT', 5, 3)).toEqual({ x: 440, y: 770 });
    expect(getCellCenter(map, 'RIGHT', 0, 0)).toEqual({ x: 660, y: 220 });
    expect(getCellCenter(map, 'RIGHT', 5, 3)).toEqual({ x: 990, y: 770 });
  });
});

describe('좌표 변환', () => {
  it('screen = map + offset 이다', () => {
    expect(toScreen({ x: 550, y: 110 }, { x: 410, y: 100 })).toEqual({ x: 960, y: 210 });
  });
});
