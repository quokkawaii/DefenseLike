// 좌표 바꾸기 (SYS-133)
import { describe, expect, it } from 'vitest';
import {
  getBattleScreenBlockTopLeft,
  getBlockTopLeft,
  toBattleScreenPoint,
} from '../../src/func/point/convertPoint';

describe('toBattleScreenPoint', () => {
  it('전투 맵 시작 위치(410, 100)를 더한다', () => {
    expect(toBattleScreenPoint({ x: 0, y: 0 })).toEqual({ x: 410, y: 100 });
    expect(toBattleScreenPoint({ x: 550, y: 110 })).toEqual({ x: 960, y: 210 });
  });
});

describe('getBlockTopLeft', () => {
  it('블럭 중심에서 왼쪽 위 모서리로 블럭 절반만큼 이동한다', () => {
    expect(getBlockTopLeft({ x: 550, y: 110 }, 110)).toEqual({ x: 495, y: 55 });
  });
});

describe('getBattleScreenBlockTopLeft', () => {
  it('시작 위치를 더한 뒤 블럭 절반을 뺀다', () => {
    expect(getBattleScreenBlockTopLeft({ x: 0, y: 110 }, 110)).toEqual({ x: 355, y: 155 });
  });
});
