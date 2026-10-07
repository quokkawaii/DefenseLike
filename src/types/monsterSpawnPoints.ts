import type { FieldSide } from './fieldSide';
import type { MapPoint } from './point';

/** 몬스터가 처음 생성되는 점. 필드마다 하나 (SYS-133) */
export type MonsterSpawnPoints = Readonly<Record<FieldSide, MapPoint>>;
