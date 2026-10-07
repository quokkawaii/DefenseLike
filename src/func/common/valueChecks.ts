// 값이 쓸 만한지 확인하는 범용 함수 (맵과 무관하고 Phaser도 쓰지 않는다, SYS-132)
// 값의 종류(숫자인지 글자인지)는 타입이 보장하므로 여기서 다시 검사하지 않는다

export function hasText(text: string): boolean {
  return text !== '';
}

export function isBiggerThanZero(value: number): boolean {
  return value > 0;
}

export function hasItems<Item>(items: readonly Item[]): boolean {
  return items.length > 0;
}
