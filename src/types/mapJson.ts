import type { MonsterRoad } from './monsterRoad';
import type { MonsterSpawnPoints } from './monsterSpawnPoints';
import type { UnitCells } from './unitCell';

/** map.json 전체 모양. 필요한 부분만 꺼내는 함수는 mapJsonFunc.ts에 있다 */
export type MapJson = {
  readonly version: string; // 버전 글자 (SYS-045)
  readonly blockSize: number; // 블럭 한 칸의 크기(px) (UX-198)
  readonly monsterSpawnPoints: MonsterSpawnPoints;
  readonly monsterRoad: MonsterRoad;
  readonly unitCells: UnitCells;
};
