# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 필수 지침 (정본)

이 저장소의 작업 규칙 정본은 아래 두 문서다. CLAUDE.md는 이를 대체하지 않으며, 충돌 시 아래 문서가 우선한다. 매 요청마다 최신 내용을 기준으로 한다.

@AGENTS.md
@docs/AGENTS.md

## 코드 구조

- 기술 스택: TypeScript(`strict: false`) + Phaser 3.90.0 + Electron/Electron Forge(Vite 플러그인) + Vitest. 근거는 `SYS-001`~`SYS-003`, `SYS-007`, `SYS-074`. 빌드·테스트 명령은 `AGENTS.md`의 `빌드·테스트 명령`을 따른다.
- 폴더 구조는 `SYS-134`가 정본이다. Electron 진입점은 `src/main.ts`(메인)·`src/preload.ts`(최소 노출 API, `SYS-073`)·`src/renderer.ts`이고, Phaser 게임은 `src/game/` 아래에 `scenes/`(`SYS-010`), `core/`(공통), `features/<시스템>/`(`SYS-055`의 Stage·Combat·Monster·Unit·Scroll·Economy·Meta)로 나눈다.
- 순수 게임 규칙은 Phaser에 의존하지 않게 작성해 Phaser 없이 Vitest로 테스트한다(`SYS-132`).
- Forge 8 Vite 플러그인은 main·preload를 `.vite/build/*.cjs`로 출력하므로 `package.json`의 `main`과 preload 경로는 `.cjs`를 사용한다.
## 문서 구조의 큰 그림

- `docs/game_setting/*.md`: 사용자가 작성한 설정 원본. 요구사항의 근거로 인용된다.
- `docs/requirement/*-req.md`: 요구사항 정본(기획 겸용). 표 형식 `| ID | 상태 | 요구사항 | 근거 | 검증 |`. ID 접두사는 `GAME-`(game-req), `SYS-`(system-req), `UX-`(design-req), `PRD-`(product-req). 다른 문서의 규칙은 문장을 복제하지 않고 원본 ID로 참조한다.
- `docs/patch/*.md`: 사용자 패치 노트(예: v1.1). 반영된 항목은 요구사항에 `(v1.1)` 표기와 함께 근거로 인용된다. 최신 패치가 이전 설정과 충돌하면 최신 패치를 우선해 왔다(`docs/interview/interview-state.md`).
- `docs/interview/`: 기획 인터뷰 운영. `interview-rules.md`(질문·답변 처리 규칙), `interview-state.md`(재개용 현재·다음 작업과 집계만 유지 — 이력을 쌓지 않음), `interview-history.md`(과거 결정 이력).
- `docs/requirements-review.html`: 요구사항 리뷰 보드(HTML).
- `docs/harness/defenselike/team-spec.md` + `.agents/skills/defenselike-*/SKILL.md`: 에이전트 팀 역할·라우팅·핸드오프 정본. `_workspace/`는 역할 간 핸드오프 파일 위치(예: `_workspace/04_qa_report.md`).

## 문서 검증 명령

요구사항 ID 중복 검사(출력이 없으면 통과):

```sh
grep -ohE '^\| (GAME|SYS|UX|PRD)-[0-9]+ ' docs/requirement/*-req.md | sort | uniq -d
```

상태별 집계(`확정`·`제안`·`미정`·`승인` 외 값이 나오면 오류):

```sh
grep -ohE '^\| (GAME|SYS|UX|PRD)-[0-9]+ \| [^|]+ \|' docs/requirement/*-req.md | awk -F'|' '{gsub(/ /,"",$3); print $3}' | sort | uniq -c
```
