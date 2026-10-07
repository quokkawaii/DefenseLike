import { hasText } from '../func/common/valueChecks';

/** JSON의 version(버전 글자)이 비어 있으면 오류를 낸다 (SYS-045) */
export function throwIfVersionEmpty(jsonName: string, version: string): void {
  if (!hasText(version)) throw new TypeError(`${jsonName}의 version이 비어 있다`);
}
