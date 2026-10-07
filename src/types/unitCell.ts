import type { FieldSide } from './fieldSide';
import type { MapPoint } from './point';

/** 한 필드 안의 유닛 칸 하나. 몇 행(0~5) 몇 열(0~3)인지와 칸 중심 좌표 (UX-205) */
export type UnitCellInField = {
  readonly row: number;
  readonly col: number;
  readonly center: MapPoint;
};

/** 유닛 칸 하나를 가리키는 값: 어느 필드의 몇 행 몇 열 (UX-205) */
export type UnitCellSpot = {
  readonly fieldSide: FieldSide;
  readonly row: number;
  readonly col: number;
};

/** 유닛 칸 하나. 위 값에 중심 좌표를 더한 것 */
export type UnitCell = UnitCellSpot & { readonly center: MapPoint };

/** 유닛을 놓을 수 있는 칸 전부. 필드마다 24개 (UX-205) */
export type UnitCells = Readonly<Record<FieldSide, readonly UnitCellInField[]>>;
