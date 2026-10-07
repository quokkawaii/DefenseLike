import { FIELD_SIDES } from '../constants/fieldSide';
import { hasItems } from '../func/common/valueChecks';
import type { UnitCellInField, UnitCells, UnitCellSpot } from '../types/unitCell';

/** 어느 필드든 유닛 배치 칸이 비어 있으면 오류를 낸다 */
export function throwIfUnitCellsEmpty(unitCells: UnitCells): void {
  for (const fieldSide of FIELD_SIDES) {
    if (!hasItems(unitCells[fieldSide])) {
      throw new TypeError(`map.json의 unitCells ${fieldSide} 칸이 비어 있다`);
    }
  }
}

/** 찾으려는 유닛 배치 칸이 없으면(undefined) 오류를 낸다 */
export function throwIfUnitCellNotFound(foundUnitCell: UnitCellInField | undefined, unitCellSpot: UnitCellSpot): void {
  if (foundUnitCell === undefined) {
    const { fieldSide, row, col } = unitCellSpot;
    throw new RangeError(`${fieldSide} 필드에 row ${row}, col ${col} 배치 칸이 없다`);
  }
}
