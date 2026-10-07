// [개발 전용] 유닛 칸에 쓰는 이름 글자(예: "L r1c2")의 내용과 위치를 만든다. 배포에는 없다
// 글자를 화면에 그리는 건 BattleScene이 한다 (SYS-132)
import { BLOCK_TEXT_GAP, FIRST_LETTER_POSITION } from '../../constants/blockText';
import type { MapPoint } from '../../types/point';
import type { UnitCellSpot } from '../../types/unitCell';

/** 칸 이름 글자. 예: LEFT 1행 2열 → "L r1c2" */
export function makeUnitCellNameText(unitCellSpot: UnitCellSpot): string {
  const fieldInitial = unitCellSpot.fieldSide.charAt(FIRST_LETTER_POSITION);
  return `${fieldInitial} r${unitCellSpot.row}c${unitCellSpot.col}`;
}

/** 칸 이름 글자 위치: 블럭 왼쪽 위 */
export function getUnitCellNamePosition(blockTopLeft: MapPoint): MapPoint {
  return { x: blockTopLeft.x + BLOCK_TEXT_GAP, y: blockTopLeft.y + BLOCK_TEXT_GAP };
}
