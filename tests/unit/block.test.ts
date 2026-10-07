// 블럭 크기 데이터와 오류 검증 (UX-198)
import { describe, expect, it } from 'vitest';
import { throwIfBlockSizeTooSmall } from '../../src/error/blockError';
import { getBlockSize } from '../../src/func/map/mapJsonFunc';

describe('getBlockSize', () => {
  it('블럭 한 칸은 110px이다 (UX-198)', () => {
    expect(getBlockSize()).toBe(110);
  });
});

describe('throwIfBlockSizeTooSmall', () => {
  it('0보다 크면 통과한다', () => {
    expect(() => throwIfBlockSizeTooSmall(110)).not.toThrow();
  });

  it.each([0, -110])('%s 이면 오류를 낸다', (blockSize) => {
    expect(() => throwIfBlockSizeTooSmall(blockSize)).toThrow('blockSize');
  });
});
