// [개발 전용] 몬스터 길 블럭에 쓰는 번호 글자(L0~R23)의 내용과 위치를 만든다. 배포에는 없다
// 글자를 화면에 그리는 건 BattleScene이 한다 (SYS-132)
import { BLOCK_TEXT_BOX_SIZE, BLOCK_TEXT_GAP, FIRST_LETTER_POSITION } from '../../constants/blockText';
import type { FieldSide } from '../../types/fieldSide';
import type { MapPoint } from '../../types/point';

/** 길 번호 글자. 예: LEFT의 3번 → "L3", RIGHT의 23번 → "R23" */
export function makeMonsterRoadNumberText(fieldSide: FieldSide, roadIndex: number): string {
  return `${fieldSide.charAt(FIRST_LETTER_POSITION)}${roadIndex}`;
}

/**
 * 번호 글자 위치. 가운데 세로줄은 두 길이 겹치므로 글자가 안 겹치게
 * LEFT는 블럭 왼쪽 위, RIGHT는 오른쪽 아래에 쓴다
 */
export function getMonsterRoadNumberPosition(
  fieldSide: FieldSide,
  blockTopLeft: MapPoint,
  blockSize: number,
): MapPoint {
  if (fieldSide === 'LEFT') {
    return { x: blockTopLeft.x + BLOCK_TEXT_GAP, y: blockTopLeft.y + BLOCK_TEXT_GAP };
  }
  return {
    x: blockTopLeft.x + blockSize - BLOCK_TEXT_BOX_SIZE.width,
    y: blockTopLeft.y + blockSize - BLOCK_TEXT_BOX_SIZE.height,
  };
}
