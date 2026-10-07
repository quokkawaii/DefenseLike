// 좌표를 다른 좌표로 바꾸는 함수 (맵 좌표 → 화면 좌표, 블럭 중심 → 블럭 모서리) (SYS-133)
import { BATTLE_MAP_SCREEN_START, HALF_OF_BLOCK } from '../../constants/point';
import type { MapPoint } from '../../types/point';

/** 블럭 중심 좌표 → 블럭 왼쪽 위 모서리 좌표 (사각형은 왼쪽 위 모서리 기준으로 그리기 때문) */
export function getBlockTopLeft(blockCenter: MapPoint, blockSize: number): MapPoint {
  const halfBlock = blockSize * HALF_OF_BLOCK;
  return { x: blockCenter.x - halfBlock, y: blockCenter.y - halfBlock };
}

/** 맵 좌표 → 화면 좌표. 맵 좌표에 전투 맵 시작점(410, 100)을 더한다 (SYS-133) */
export function toBattleScreenPoint(mapPoint: MapPoint): MapPoint {
  return { x: mapPoint.x + BATTLE_MAP_SCREEN_START.x, y: mapPoint.y + BATTLE_MAP_SCREEN_START.y };
}

/** 맵 좌표의 블럭 → 화면에서 그 블럭의 왼쪽 위 모서리 (위 두 함수를 이어서 쓴 것) */
export function getBattleScreenBlockTopLeft(blockCenter: MapPoint, blockSize: number): MapPoint {
  return getBlockTopLeft(toBattleScreenPoint(blockCenter), blockSize);
}
