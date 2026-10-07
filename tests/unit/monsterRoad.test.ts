// 몬스터 길 데이터와 블럭 목록을 요구사항 확정표와 대조해 검증 (UX-205, GAME-038, GAME-275)
import { describe, expect, it } from 'vitest';
import { FIELD_SIDES } from '../../src/constants/fieldSide';
import { getBlockSize, getMonsterRoad } from '../../src/func/map/mapJsonFunc';
import { getMonsterRoadBlocks } from '../../src/func/monsterRoad/monsterRoadBlocks';
import type { FieldSide } from '../../src/types/fieldSide';

const monsterRoad = getMonsterRoad();
const blockSize = getBlockSize();

// UX-205 「전투 맵 로컬 좌표 확정표」 (index 순서대로 [x, y])
const CONFIRMED_MONSTER_ROAD: Record<FieldSide, [number, number][]> = {
  LEFT: [
    [0, 110], [110, 110], [220, 110], [330, 110], [440, 110], [550, 110],
    [550, 220], [550, 330], [550, 440], [550, 550], [550, 660], [550, 770], [550, 880],
    [440, 880], [330, 880], [220, 880], [110, 880], [0, 880],
    [0, 770], [0, 660], [0, 550], [0, 440], [0, 330], [0, 220],
  ],
  RIGHT: [
    [1100, 110], [990, 110], [880, 110], [770, 110], [660, 110], [550, 110],
    [550, 220], [550, 330], [550, 440], [550, 550], [550, 660], [550, 770], [550, 880],
    [660, 880], [770, 880], [880, 880], [990, 880], [1100, 880],
    [1100, 770], [1100, 660], [1100, 550], [1100, 440], [1100, 330], [1100, 220],
  ],
};

describe('몬스터 길 데이터', () => {
  it.each(FIELD_SIDES)('%s 길은 UX-205 확정표의 24개 좌표와 순서까지 같다', (fieldSide) => {
    const roadAsPairs = monsterRoad[fieldSide].map((point) => [point.x, point.y]);
    expect(roadAsPairs).toEqual(CONFIRMED_MONSTER_ROAD[fieldSide]);
  });

  it.each(FIELD_SIDES)('%s 길의 연속한 좌표는 정확히 1 Block 간격이다 (23→0 순환 포함)', (fieldSide) => {
    const road = monsterRoad[fieldSide];
    road.forEach((point, roadIndex) => {
      const nextPoint = road[(roadIndex + 1) % road.length];
      const distance = Math.abs(point.x - nextPoint.x) + Math.abs(point.y - nextPoint.y);
      expect(distance).toBe(blockSize);
    });
  });

  it('좌·우 길의 index 5~12는 같은 좌표다 (중앙 공유 열)', () => {
    for (let roadIndex = 5; roadIndex <= 12; roadIndex++) {
      expect(monsterRoad.LEFT[roadIndex]).toEqual(monsterRoad.RIGHT[roadIndex]);
    }
  });

  it('중앙 공유 열 외의 구간은 좌·우 길이 서로 다른 좌표다', () => {
    const sharedIndexes = new Set([5, 6, 7, 8, 9, 10, 11, 12]);
    monsterRoad.LEFT.forEach((leftPoint, roadIndex) => {
      if (sharedIndexes.has(roadIndex)) return;
      expect(leftPoint).not.toEqual(monsterRoad.RIGHT[roadIndex]);
    });
  });
});

describe('getMonsterRoadBlocks', () => {
  const blocks = getMonsterRoadBlocks(monsterRoad);

  it('공유 열 8칸이 한 번만 들어가 24 + 24 - 8 = 40개다', () => {
    expect(blocks).toHaveLength(40);
  });

  it('같은 자리가 두 번 나오지 않는다', () => {
    const places = new Set(blocks.map((block) => `${block.x},${block.y}`));
    expect(places.size).toBe(blocks.length);
  });
});
