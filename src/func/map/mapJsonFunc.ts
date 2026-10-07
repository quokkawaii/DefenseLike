// map.json에서 필요한 데이터 하나만 꺼내 주는 함수 모음 (SYS-050)
// 예: getMonsterRoad()는 몬스터 길만, getUnitCells()는 유닛 칸만 돌려준다
import mapJson from '../../content/map.json';
import type { MapJson } from '../../types/mapJson';
import type { MonsterRoad } from '../../types/monsterRoad';
import type { MonsterSpawnPoints } from '../../types/monsterSpawnPoints';
import type { UnitCells } from '../../types/unitCell';
import { throwIfBlockSizeTooSmall } from '../../error/blockError';
import { throwIfVersionEmpty } from '../../error/versionError';
import { throwIfMonsterRoadEmpty } from '../../error/monsterRoadError';
import { throwIfUnitCellsEmpty } from '../../error/unitCellError';

const map: MapJson = mapJson;
const MAP_JSON_NAME = 'map.json';

/** 블럭 한 칸의 크기(px) */
export function getBlockSize(): number {
  throwIfVersionEmpty(MAP_JSON_NAME, map.version);
  throwIfBlockSizeTooSmall(map.blockSize);
  return map.blockSize;
}

/** 몬스터가 걷는 길 (필드별 24개 좌표) */
export function getMonsterRoad(): MonsterRoad {
  throwIfVersionEmpty(MAP_JSON_NAME, map.version);
  throwIfMonsterRoadEmpty(map.monsterRoad);
  return map.monsterRoad;
}

/** 몬스터가 생성되는 위치 (필드마다 하나) */
export function getMonsterSpawnPoints(): MonsterSpawnPoints {
  throwIfVersionEmpty(MAP_JSON_NAME, map.version);
  return map.monsterSpawnPoints;
}

/** 유닛을 놓을 수 있는 칸 전부 (필드별 24개) */
export function getUnitCells(): UnitCells {
  throwIfVersionEmpty(MAP_JSON_NAME, map.version);
  throwIfUnitCellsEmpty(map.unitCells);
  return map.unitCells;
}
