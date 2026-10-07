# src 코딩 규칙 (코드를 쓰기 전에 반드시 읽는다)

이 문서는 사용자가 작업 중 직접 지적한 문제를 모은 것이다. 새 세션의 에이전트도 이 규칙을 그대로 따른다.
기본 원칙은 `docs/code_convetion/clean-code-summary.md`(로버트 C. 마틴 *Clean Code* 요약)이며, 이 문서가 더 구체적이다.
충돌하거나 적용할 수 없으면 임의로 판단하지 말고 사용자에게 보고한다.

## 1. 작업 태도

- 요청한 것만 한다. 요청받지 않은 기능·파일·추상화를 만들지 않는다. 모든 코드는 `확정`·`승인` 요구사항 ID를 근거로 한다.
- 사용자가 한 곳을 지적하면 **같은 패턴을 전부 찾아서** 고친다. 지적받은 한 곳만 고치고 끝내지 않는다. 고친 뒤 `grep`으로 남은 곳이 없는지 직접 확인한다.
- 문제를 사용자가 직접 찾게 하지 않는다. 지적받은 내용은 에이전트가 찾아서 고친다.
- 사용자가 든 예시 이름·방식을 그대로 받아쓰지 않는다. 그 코드가 실제로 무엇을 하는지 먼저 따지고, 후보를 비교한 뒤 정한다.
- 보고는 짧고 간결하고 명확하게 한다. 한 일, 결과(타입체크·테스트 통과 여부), 사용자가 판단할 것만 쓴다.
- 요청을 넓게 해석해 구조를 크게 바꾸지 않는다. "함수에서 데이터별로 뽑아 달라"를 "JSON 파일을 쪼개라"로 확장한 것이 실제 실수였다. 애매하면 **가장 작은 해석**으로 하고, 어떻게 해석했는지 한 줄로 알린다.
- 이름·파일·구조를 바꾸면 코드뿐 아니라 문서(`CLAUDE.md`, `AGENTS.md`)에 남은 옛 이름도 `grep`으로 찾아 사용자에게 알린다.
- 데이터 수정·삭제는 사용자 허락을 받는다. 커밋은 요청이 있을 때만 한다.

## 2. 금지 문법

- `any`: 절대 금지.
- `unknown`: 금지.
- `as`(타입 단언): 타입을 정한 의미가 없어지므로 원칙적으로 금지. 정말 피할 수 없으면 **쓰기 전에 사용자에게 허락을 구하거나, 쓴 직후 어디에 왜 썼는지 보고**한다. 몰래 쓰지 않는다.
- 타입이 이미 막는 것을 실행 중에 다시 검사하지 않는다. `number`로 정한 값에 `Number.isInteger`, 문자열인지 확인하는 코드 등은 쓰지 않는다. 타입이 못 막는 값의 내용(빈 문자열, 0 이하, 빈 목록, 없는 칸)만 검사한다.

## 3. 이름 짓기 (가장 자주 지적받은 부분)

- 기준: **8살 아이가 봐도 알 정도로 쉽고, 규칙적**이어야 한다. 전문 용어를 피한다(`Unique`, `assert`, `Validation`, `Offset`, `Ratio`, `Exclusive`, `Padding`, `Label` 같은 단어 지양).
- 함수 이름은 동사로 시작하고 규칙을 지킨다.
  - 가져오기 `get…`, 그리기 `draw…`, 만들기 `make…`, 확인 `has…`/`is…`
  - 틀리면 오류를 내는 함수는 `check…`가 아니라 **`throwIf…`**(`throwIfMonsterRoadEmpty`)로 한다. 하는 일이 "검사해서 알려 주기"가 아니라 "오류 내기"이기 때문이다.
- 같은 대상은 같은 단어로 쓴다(예: `monsterRoad`, `monsterSpawnPoints`, `unitCells`).
- 한 글자·모호한 이름(`g`, `s`, `p`, `d`, `tmp`, `data2`)을 쓰지 않는다.
- JSON 키도 코드 이름과 같은 기준이다. 사용자가 바로 이해 못 하는 JSON 키는 존재하면 안 된다(`paths` → `monsterRoad`).
- 이름을 바꿀 때는 파일 이름, 상수, 변수, 테스트, 주석까지 전부 같은 규칙으로 맞춘다.

## 4. 함수와 조건

- 함수 하나는 한 가지 일만 한다. 주석 번호(1., 2., 3.)로 단계를 나눠야 한다면 함수로 분리한다. 이름에 "그리고(and)"가 필요하면 둘로 나눈다.
- `if` 안에 조건식을 직접 쓰지 않는다. 의미 있는 이름의 함수로 빼서 `if (hasText(value))`처럼 쓴다.
- 인수는 적게(3개 이하). boolean 플래그 인수를 쓰지 않는다.
- 함수 안에 의미 있는 고정 값(색, 크기, 간격, 비율)이 있으면 **용도가 드러나는 이름**의 상수로 빼서 부른다(`HALF_OF_BLOCK`, `FIRST_LETTER_POSITION`). 자주 쓰는 값은 매개변수 기본값으로 둔다.
- `ZERO`, `ONE`처럼 값만 풀어 쓴 상수는 만들지 않는다. `0`, `1`은 그냥 숫자로 쓴다.
- 같은 코드를 두 번 쓰지 않는다. 부수 효과(숨은 상태 변경)를 만들지 않는다.

## 5. 파일과 폴더 분리

- 한 파일에는 한 가지 책임만 둔다. 읽기, 검증, 계산, 화면 변환, 글자 만들기를 한 파일에 섞지 않는다.
- 폴더 구조(`SYS-134`):
  - `src/types/` : 모든 타입
  - `src/func/<관련 묶음>/` : 모든 함수. 범용 함수는 `src/func/common/`. **Phaser를 import하지 않는다**(`SYS-132`)
  - `src/content/` : JSON 데이터. 흐름은 `content/<이름>.json` → `func/<묶음>/<이름>JsonFunc.ts` → 같은 묶음의 함수
  - `src/game/` : Phaser 화면(Scene). 그리기와 입력 전달만 한다. 좌표·글자 계산은 `func/`의 함수를 쓴다
  - `src/constants/` : 상수. **파일 하나에 모으지 않고** 쓰는 대상별로 나눈다(`fieldSide.ts`, `point.ts`, `blockText.ts`, `battleScene.ts`)
  - `src/error/` : 오류를 내는 코드. **`func/` 안에 `throw`를 두지 않는다.** 함수 안에서 오류를 내야 하면 `error/`의 `throwIf…` 함수를 부른다(`unitCellSearch.ts`가 `throwIfUnitCellNotFound`를 부르는 식). 파일은 데이터별로 나눈다(`blockError.ts`, `monsterRoadError.ts`, `unitCellError.ts`, `versionError.ts`)
- 의존 방향은 `game → func → error / types / constants / content` 한쪽만이다. `error/`는 값 확인 함수(`func/common/valueChecks.ts`)만 가져다 쓸 수 있다. 반대 방향 import 금지.
- 테스트는 모듈 하나당 테스트 파일 하나로 둔다(`tests/unit/`).
- **파일 이름은 그 안의 내용이 무엇인지 말해야 한다.** `map.ts`, `mapScreen.ts`, `mapText.ts`, `mapCheck.ts`처럼 뭉뚱그린 이름 금지.
  - 파일 이름을 지을 때는 "그 이름의 주인이 정말 그 일을 하는가"를 따진다(`screen`이 좌표를 바꾸는 게 아니라서 `convertPoint.ts`).
  - 파일 이름이 데이터 이름과 같다고 해서 함수 파일에 그 이름을 붙이지 않는다(`map.ts`).
  - `mapJsonFunc.ts` : `map.json` 하나에서 **데이터별 함수로** 필요한 부분만 꺼내 준다(`getMonsterRoad`, `getUnitCells`, `getBlockSize`, `getMonsterSpawnPoints`)
  - `…Error.ts` : `src/error/`에 두고, 틀렸을 때 오류를 내는 함수(`throwIf…`)만 담는다. 오류 메시지의 JSON 이름은 실제 파일명(`map.json`)을 쓴다
  - `…Text.ts` : 어떤 글자인지 이름에 쓴다(`monsterRoadNumberText.ts`, `unitCellNameText.ts`)
  - 좌표를 바꾸는 함수는 `convertPoint.ts`

## 6. 데이터 규칙

- 맵은 하나다. 다른 맵을 위한 구조를 미리 만들지 않는다.
- JSON은 `map.json` 하나다(`version` 포함, `SYS-045`). **JSON을 데이터별 파일로 쪼개지 않는다.** 대신 `mapJsonFunc.ts`에 데이터별 함수를 두어 `getMonsterRoad()`는 몬스터 길만, `getUnitCells()`는 유닛 칸만 돌려준다. JSON 전체를 한꺼번에 돌려주는 함수를 만들지 않는다.
- 함수는 **필요한 데이터만** 받는다. 몬스터 길만 필요한 함수가 유닛 칸 데이터까지 받지 않는다(`getMonsterRoadBlocks(monsterRoad)`).
- 유닛 배치 칸은 `map.json`의 `unitCells`에 48개를 직접 나열한다. 계산해서 만들지 않는다.
- JSON 구조는 `MapJson` 타입이 컴파일 때 보장한다. JSON을 `unknown`으로 받아 검사하지 않는다.

## 7. Scene 규칙 (Phaser)

- `create()`는 Phaser가 호출하는 약속된 이름이라 `private`이 아니다. 나머지 도우미는 `private`.
- Scene은 맵 데이터를 인수로 넘겨 쓰고, 클래스에 숨은 상태를 두지 않는다.
- **같은 모양의 호출이 반복되면 함수와 데이터로 묶는다.** 사례: `BattleScene.drawPortals`가 포탈 원과 생성 위치 점을 그릴 때 `fillStyle`(색 정하기)과 `fillCircle`(원 칠하기)을 두 쌍, 4줄로 썼다. 사용자가 다음 방식을 제안했고 방향이 맞다고 확인했다.
  - 색 정하기와 칠하기를 한 함수로 묶는다(`fillCircleShape`). 4줄이 2줄이 된다.
  - 함수에 넘기는 값(색, 반지름, 투명도)을 타입 하나로 묶어 관리한다(`CircleStyle` 같은 이름).
  - 같은 타입의 데이터를 배열로 두고 반복문으로 한 번에 그린다. 도형이 늘어도 코드는 그대로이고 데이터만 추가한다.
  - 주의: 그리는 순서가 배열 순서이므로 아래에 깔 도형을 앞에 둔다. 결과를 만들지 않는 반복은 `map`이 아니라 `forEach`/`for…of`를 쓴다. 중심 좌표는 실행 중에 정해지므로 타입에 넣지 않고 함수 인수로 따로 넘긴다. 투명도는 생략 가능하게 하고 기본값은 불투명(1)이다. Phaser `graphics`를 쓰는 함수는 `src/game/`에 두고(`SYS-132`), 타입은 `src/types/`, 데이터 배열은 `src/constants/`에 둔다.
  - 현재 상태: 포탈은 임시 도형(`UX-199`, 시각 디자인 3단계에서 이미지로 교체)이라 사용자가 **지금은 적용하지 않고 넘기기로 했다.** 원래 코드(4줄)는 그대로다. 같은 패턴이 임시가 아닌 곳에 생기면 이 방식을 적용한다.

## 8. 작업을 끝내기 전 확인

```bash
npm run typecheck
npm test
grep -rnE "\bunknown\b|\bany\b| as [A-Za-z(]" src tests --include=*.ts
```

- 위 `grep`은 결과가 0건이어야 한다.
- 이름을 바꿨다면 옛 이름이 남았는지 `grep`으로 확인한다.
- 화면 코드를 바꿨다면 Vite 렌더러(`npx vite -c vite.renderer.config.ts`)로 실제 화면을 확인한다.
