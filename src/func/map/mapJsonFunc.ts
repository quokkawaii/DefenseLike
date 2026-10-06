// src/content/map.json 을 읽어 MapData 타입으로 제공하는 JSON 관리 함수
// 흐름: src/content/map.json → mapJsonFunc.ts(이 파일) → map.ts
// JSON은 Vite가 빌드할 때 모듈로 함께 묶는다 (읽기 전용 배포 자산, SYS-050)
import mapJson from '../../content/map.json';
import type { MapData } from '../../types/map';

/** 맵 JSON 데이터를 MapData 타입으로 반환한다 */
export function getMapData(): MapData {
  return mapJson as MapData;
}
