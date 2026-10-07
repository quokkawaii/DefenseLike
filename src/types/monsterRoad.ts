import type { FieldSide } from './fieldSide';
import type { MapPoint } from './point';

/** 몬스터가 걷는 길. 필드마다 좌표 24개이고, 순서대로 걷다가 끝에서 처음으로 돌아간다 (UX-205) */
export type MonsterRoad = Readonly<Record<FieldSide, readonly MapPoint[]>>;
