// 몬스터 길 번호 글자의 내용과 위치
import { describe, expect, it } from 'vitest';
import {
  getMonsterRoadNumberPosition,
  makeMonsterRoadNumberText,
} from '../../src/func/monsterRoad/monsterRoadNumberText';

describe('makeMonsterRoadNumberText', () => {
  it('필드 첫 글자 + index다', () => {
    expect(makeMonsterRoadNumberText('LEFT', 3)).toBe('L3');
    expect(makeMonsterRoadNumberText('RIGHT', 23)).toBe('R23');
  });
});

describe('getMonsterRoadNumberPosition', () => {
  const blockTopLeft = { x: 100, y: 200 };
  const blockSize = 110;

  it('LEFT 글자는 블럭 왼쪽 위 근처다', () => {
    expect(getMonsterRoadNumberPosition('LEFT', blockTopLeft, blockSize)).toEqual({ x: 104, y: 204 });
  });

  it('RIGHT 글자는 블럭 오른쪽 아래 근처다 (공유 열에서 LEFT 글자와 겹치지 않는다)', () => {
    expect(getMonsterRoadNumberPosition('RIGHT', blockTopLeft, blockSize)).toEqual({ x: 180, y: 290 });
  });
});
