import { FIELD_SIDES } from '../../constants/fieldSide';
import { throwIfUnitCellNotFound } from '../../error/unitCellError';
import type { MapPoint } from '../../types/point';
import type { UnitCell, UnitCells, UnitCellSpot } from '../../types/unitCell';

/** 유닛 칸 하나의 중심 좌표를 찾는다. 예: LEFT 0행 0열 → (110, 220). 없는 칸이면 오류. 2단계(캐릭터 배치)에서 쓸 예정 */
export function getUnitCellCenter(unitCells: UnitCells, unitCellSpot: UnitCellSpot): MapPoint {
  const { fieldSide, row, col } = unitCellSpot;
  const foundUnitCell = unitCells[fieldSide].find((cell) => cell.row === row && cell.col === col);
  throwIfUnitCellNotFound(foundUnitCell, unitCellSpot);
  return foundUnitCell.center;
}

/** 유닛 칸 48개(왼쪽 24 + 오른쪽 24)를 한 목록으로 모은다 */
export function getAllUnitCells(unitCells: UnitCells): UnitCell[] {
  const allUnitCells: UnitCell[] = [];
  for (const fieldSide of FIELD_SIDES) {
    for (const cellInField of unitCells[fieldSide]) {
      allUnitCells.push({ fieldSide, ...cellInField });
    }
  }
  return allUnitCells;
}
