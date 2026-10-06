// 맵 관련 타입 정의 (SYS-133, UX-205)

/** 맵 기준 좌표(px). 원점은 왼쪽 SpawnPoint (0,0) */
export type MapPoint = { x: number; y: number };

/** 필드 구분: 기존 논리상 위 = LEFT(화면 왼쪽), 아래 = RIGHT(화면 오른쪽) (GAME-029) */
export type FieldSide = 'LEFT' | 'RIGHT';

/** 유닛 배치 칸 하나. field·row(0~5)·col(0~3)로 식별 (UX-205) */
export type Cell = {
  field: FieldSide;
  row: number;
  col: number;
  center: MapPoint;
};

/** src/content/map.json 의 구조 */
export type MapData = {
  version: string; // 공통 버전 문자열 (SYS-045)
  blockSize: number; // 1 Block 크기(px) (UX-198)
  spawnPoints: Record<FieldSide, MapPoint>; // 몬스터 생성 위치 (SYS-133)
  paths: Record<FieldSide, MapPoint[]>; // 경로별 24개 Point, 배열 순서대로 순환 (UX-205)
  cellOrigin: Record<FieldSide, MapPoint>; // row 0·col 0 칸의 중심 좌표 (UX-205)
  cellRows: number; // 배치 칸 행 수: 6
  cellCols: number; // 배치 칸 열 수: 4
};
