// JSON version이 비었을 때 오류를 내는지 검증 (SYS-045)
import { describe, expect, it } from 'vitest';
import { throwIfVersionEmpty } from '../../src/error/versionError';

describe('throwIfVersionEmpty', () => {
  it('글자가 있으면 통과한다', () => {
    expect(() => throwIfVersionEmpty('monsterRoad.json', '1.1V')).not.toThrow();
  });

  it('비어 있으면 어느 JSON인지 알려 주며 오류를 낸다', () => {
    expect(() => throwIfVersionEmpty('monsterRoad.json', '')).toThrow('monsterRoad.json');
  });
});
