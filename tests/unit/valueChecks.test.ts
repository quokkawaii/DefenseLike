// 범용 값 확인 함수 검증. 값의 종류는 타입이 보장하므로 값의 내용만 확인한다
import { describe, expect, it } from 'vitest';
import { hasItems, hasText, isBiggerThanZero } from '../../src/func/common/valueChecks';

describe('hasText', () => {
  it('빈 문자열만 false', () => {
    expect(hasText('a')).toBe(true);
    expect(hasText('')).toBe(false);
  });
});

describe('isBiggerThanZero', () => {
  it('0보다 큰 값만 true', () => {
    expect(isBiggerThanZero(1)).toBe(true);
    expect(isBiggerThanZero(0)).toBe(false);
    expect(isBiggerThanZero(-3)).toBe(false);
  });
});

describe('hasItems', () => {
  it('원소가 있는 배열만 true', () => {
    expect(hasItems([1])).toBe(true);
    expect(hasItems([])).toBe(false);
  });
});
