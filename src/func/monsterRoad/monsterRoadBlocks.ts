import { FIELD_SIDES } from '../../constants/fieldSide';
import type { MonsterRoad } from '../../types/monsterRoad';
import type { MapPoint } from '../../types/point';

/**
 * 몬스터 길의 블럭 좌표를 모두 모은다. 같은 자리는 한 번만 담는다.
 * 왼쪽·오른쪽 길이 가운데 세로줄 8칸(index 5~12)을 같이 쓰기 때문이다 (GAME-275)
 */
export function getMonsterRoadBlocks(monsterRoad: MonsterRoad): MapPoint[] {
  const seenKeys = new Set<string>();
  const blocks: MapPoint[] = [];
  for (const fieldSide of FIELD_SIDES) {
    for (const roadBlock of monsterRoad[fieldSide]) {
      const blockKey = `${roadBlock.x},${roadBlock.y}`;
      if (seenKeys.has(blockKey)) continue;
      seenKeys.add(blockKey);
      blocks.push(roadBlock);
    }
  }
  return blocks;
}
