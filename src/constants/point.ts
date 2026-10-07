import type { MapPoint } from '../types/point';

// 전투 맵의 시작점(맵 좌표 (0, 0))이 화면 어디에 놓일지. 맵을 화면 가운데에 놓는 임시 값이다 (SYS-133)
// HUD(화면 UI) 배치가 정해지면 이 값만 바꾼다
//   x = (1920 - 1210) / 2 + 55 = 410,  y = (1080 - 990) / 2 + 55 = 100
//   (1920×1080 = 화면 크기, 1210×990 = 맵 크기, 55 = 블럭 절반)
export const BATTLE_MAP_SCREEN_START: MapPoint = { x: 410, y: 100 };

export const HALF_OF_BLOCK = 0.5; // 블럭 크기의 절반 (블럭 중심에서 모서리까지의 거리)
