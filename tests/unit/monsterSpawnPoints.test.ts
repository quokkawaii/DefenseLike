// 몬스터 생성 위치 데이터 검증 (UX-205, UX-167)
import { describe, expect, it } from 'vitest';
import { FIELD_SIDES } from '../../src/constants/fieldSide';
import { getMonsterRoadBlocks } from '../../src/func/monsterRoad/monsterRoadBlocks';
import { getMonsterRoad, getMonsterSpawnPoints } from '../../src/func/map/mapJsonFunc';

const monsterSpawnPoints = getMonsterSpawnPoints();

describe('getMonsterSpawnPoints', () => {
  it('왼쪽은 (0,0), 오른쪽은 (1100,0)이다 (UX-205)', () => {
    expect(monsterSpawnPoints.LEFT).toEqual({ x: 0, y: 0 });
    expect(monsterSpawnPoints.RIGHT).toEqual({ x: 1100, y: 0 });
  });

  it('어떤 생성 위치도 몬스터 길과 겹치지 않는다 (포탈은 길 칸을 차지하지 않는다, UX-167)', () => {
    const roadPlaces = new Set(getMonsterRoadBlocks(getMonsterRoad()).map((block) => `${block.x},${block.y}`));
    for (const fieldSide of FIELD_SIDES) {
      const spawnPoint = monsterSpawnPoints[fieldSide];
      expect(roadPlaces.has(`${spawnPoint.x},${spawnPoint.y}`)).toBe(false);
    }
  });
});
