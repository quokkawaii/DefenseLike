// [임시 도형] 전투 화면에 임시로 그리는 도형의 색과 크기. 나중에 배경 이미지로 바뀌어 배포에는 없다 (UX-199)

// 색
export const BATTLE_COLOR = {
  monsterRoadBlock: 0x8d7b5a, // 몬스터가 걷는 길 블럭
  unitCellFill: 0x6fa86b, // 유닛을 놓는 칸
  unitCellBorder: 0x2f4f2f, // 유닛 칸 테두리
  portal: 0x7b4fd6, // 포탈(몬스터가 나오는 문) (UX-167)
  monsterSpawnPoint: 0xff4040, // 몬스터가 실제로 생성되는 점
};

// 크기 (요구사항에 정해진 값이 없는 임시 값)
export const UNIT_CELL_BORDER_WIDTH = 2;
export const PORTAL_RADIUS = 40;
export const PORTAL_ALPHA = 0.6;
export const MONSTER_SPAWN_POINT_MARK_RADIUS = 6;
