import { isBiggerThanZero } from '../func/common/valueChecks';

/** 블럭 크기가 0 이하면 오류를 낸다 */
export function throwIfBlockSizeTooSmall(blockSize: number): void {
  if (!isBiggerThanZero(blockSize)) throw new TypeError(`map.json의 blockSize가 0 이하다: ${blockSize}`);
}
