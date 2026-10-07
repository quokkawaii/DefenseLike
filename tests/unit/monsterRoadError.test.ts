// 몬스터 길이 비었을 때 오류를 내는지 검증
import { describe, expect, it } from 'vitest';
import { throwIfMonsterRoadEmpty } from '../../src/error/monsterRoadError';
import type { MonsterRoad } from '../../src/types/monsterRoad';

const ONE_BLOCK = [{ x: 0, y: 0 }];

describe('throwIfMonsterRoadEmpty', () => {
  it('양쪽 길에 좌표가 있으면 통과한다', () => {
    const monsterRoad: MonsterRoad = { LEFT: ONE_BLOCK, RIGHT: ONE_BLOCK };
    expect(() => throwIfMonsterRoadEmpty(monsterRoad)).not.toThrow();
  });

  it('한쪽 길이 비어 있으면 어느 쪽인지 알려 주며 오류를 낸다', () => {
    expect(() => throwIfMonsterRoadEmpty({ LEFT: ONE_BLOCK, RIGHT: [] })).toThrow('RIGHT');
    expect(() => throwIfMonsterRoadEmpty({ LEFT: [], RIGHT: ONE_BLOCK })).toThrow('LEFT');
  });
});
