import { FIELD_SIDES } from '../constants/fieldSide';
import { hasItems } from '../func/common/valueChecks';
import type { MonsterRoad } from '../types/monsterRoad';

/** 어느 필드든 몬스터 길이 비어 있으면 오류를 낸다 */
export function throwIfMonsterRoadEmpty(monsterRoad: MonsterRoad): void {
  for (const fieldSide of FIELD_SIDES) {
    if (!hasItems(monsterRoad[fieldSide])) {
      throw new TypeError(`map.json의 monsterRoad ${fieldSide} 길이 비어 있다`);
    }
  }
}
