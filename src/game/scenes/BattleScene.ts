// 전투 화면 (SYS-010). 지금은 맵을 임시 도형으로만 그린다
// [임시 도형] = 개발 중에만 쓰고, 나중에 배경 이미지로 바뀌어 배포에는 없다 (UX-199)
// [개발 전용] = 개발 실행(npm start)에서만 나오고 배포에는 없다
// 이 파일은 그리기만 한다. 좌표·글자 계산은 src/func/의 함수가 한다 (SYS-132)
import Phaser from 'phaser';
import {
  BATTLE_COLOR,
  MONSTER_SPAWN_POINT_MARK_RADIUS,
  PORTAL_ALPHA,
  PORTAL_RADIUS,
  UNIT_CELL_BORDER_WIDTH,
} from '../../constants/battleScene';
import { BLOCK_TEXT_STYLE } from '../../constants/blockText';
import { FIELD_SIDES } from '../../constants/fieldSide';
import { getBlockSize, getMonsterRoad, getMonsterSpawnPoints, getUnitCells } from '../../func/map/mapJsonFunc';
import { getMonsterRoadBlocks } from '../../func/monsterRoad/monsterRoadBlocks';
import { getMonsterRoadNumberPosition, makeMonsterRoadNumberText } from '../../func/monsterRoad/monsterRoadNumberText';
import { getBattleScreenBlockTopLeft, toBattleScreenPoint } from '../../func/point/convertPoint';
import { getUnitCellNamePosition, makeUnitCellNameText } from '../../func/unitCell/unitCellNameText';
import { getAllUnitCells } from '../../func/unitCell/unitCellSearch';
import type { MonsterRoad } from '../../types/monsterRoad';
import type { MonsterSpawnPoints } from '../../types/monsterSpawnPoints';
import type { MapPoint } from '../../types/point';
import type { UnitCells } from '../../types/unitCell';

export class BattleScene extends Phaser.Scene {
  constructor() {
    super('BattleScene');
  }

  create() {
    const blockSize = getBlockSize();
    const monsterRoad = getMonsterRoad();
    const monsterSpawnPoints = getMonsterSpawnPoints();
    const unitCells = getUnitCells();
    const graphics = this.add.graphics();

    this.drawMonsterRoadBlocks(graphics, monsterRoad, blockSize);
    this.drawUnitCells(graphics, unitCells, blockSize);
    this.drawPortals(graphics, monsterSpawnPoints);

    // [개발 전용] 확인용 글자는 개발 실행에서만 보인다
    if (import.meta.env.DEV) {
      this.drawMonsterRoadNumbers(monsterRoad, blockSize);
      this.drawUnitCellNames(unitCells, blockSize);
    }
  }

  /** [임시 도형] 몬스터 길 블럭을 칠한다. 가운데 세로줄은 한 번만 칠한다. 방향 화살표는 없다 (GAME-275, UX-166) */
  private drawMonsterRoadBlocks(graphics: Phaser.GameObjects.Graphics, monsterRoad: MonsterRoad, blockSize: number) {
    for (const roadBlock of getMonsterRoadBlocks(monsterRoad)) {
      this.fillBlock(graphics, roadBlock, blockSize, BATTLE_COLOR.monsterRoadBlock);
    }
  }

  /**
   * [임시 도형] 유닛 칸 48개를 칠하고 테두리를 그린다.
   * 원래 테두리는 평소엔 숨겨야 하지만(UX-200) 지금은 확인용으로 항상 보이게 했다 (2단계에서 변경)
   */
  private drawUnitCells(graphics: Phaser.GameObjects.Graphics, unitCells: UnitCells, blockSize: number) {
    for (const unitCell of getAllUnitCells(unitCells)) {
      this.fillBlock(graphics, unitCell.center, blockSize, BATTLE_COLOR.unitCellFill);
      const blockTopLeft = getBattleScreenBlockTopLeft(unitCell.center, blockSize);
      graphics.lineStyle(UNIT_CELL_BORDER_WIDTH, BATTLE_COLOR.unitCellBorder);
      graphics.strokeRect(blockTopLeft.x, blockTopLeft.y, blockSize, blockSize);
    }
  }

  /** [임시 도형] 포탈(보라 원)과 몬스터 생성 위치(빨간 점)를 그린다. 실제 생성 위치는 빨간 점이다 (SYS-133, UX-167) */
  private drawPortals(graphics: Phaser.GameObjects.Graphics, monsterSpawnPoints: MonsterSpawnPoints) {
    for (const fieldSide of FIELD_SIDES) {
      const monsterSpawnPointOnScreen = toBattleScreenPoint(monsterSpawnPoints[fieldSide]);
      graphics.fillStyle(BATTLE_COLOR.portal, PORTAL_ALPHA);
      graphics.fillCircle(monsterSpawnPointOnScreen.x, monsterSpawnPointOnScreen.y, PORTAL_RADIUS);
      graphics.fillStyle(BATTLE_COLOR.monsterSpawnPoint);
      graphics.fillCircle(monsterSpawnPointOnScreen.x, monsterSpawnPointOnScreen.y, MONSTER_SPAWN_POINT_MARK_RADIUS);
    }
  }

  /** [개발 전용] 몬스터 길 블럭마다 번호(L0~L23, R0~R23)를 쓴다 */
  private drawMonsterRoadNumbers(monsterRoad: MonsterRoad, blockSize: number) {
    for (const fieldSide of FIELD_SIDES) {
      monsterRoad[fieldSide].forEach((roadBlock, roadIndex) => {
        const blockTopLeft = getBattleScreenBlockTopLeft(roadBlock, blockSize);
        const textPosition = getMonsterRoadNumberPosition(fieldSide, blockTopLeft, blockSize);
        this.addBlockText(makeMonsterRoadNumberText(fieldSide, roadIndex), textPosition);
      });
    }
  }

  /** [개발 전용] 유닛 칸마다 이름(필드, 행, 열)을 쓴다 */
  private drawUnitCellNames(unitCells: UnitCells, blockSize: number) {
    for (const unitCell of getAllUnitCells(unitCells)) {
      const blockTopLeft = getBattleScreenBlockTopLeft(unitCell.center, blockSize);
      this.addBlockText(makeUnitCellNameText(unitCell), getUnitCellNamePosition(blockTopLeft));
    }
  }

  /** [개발 전용] 글자 하나를 화면에 놓는다 */
  private addBlockText(text: string, screenPosition: MapPoint) {
    this.add.text(screenPosition.x, screenPosition.y, text, BLOCK_TEXT_STYLE);
  }

  /** [임시 도형] 블럭 하나를 한 가지 색으로 칠한다 */
  private fillBlock(graphics: Phaser.GameObjects.Graphics, blockCenter: MapPoint, blockSize: number, color: number) {
    const blockTopLeft = getBattleScreenBlockTopLeft(blockCenter, blockSize);
    graphics.fillStyle(color);
    graphics.fillRect(blockTopLeft.x, blockTopLeft.y, blockSize, blockSize);
  }
}
