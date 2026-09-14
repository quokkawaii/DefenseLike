# DefenseLike 에이전트 팀 명세

## 목표와 패턴

요구사항 겸 기획에서 출시 가능한 게임까지 이어지는 작업을 지원한다. 외부 패턴은 **Pipeline**, 각 단계의 선택은 **Expert Pool**, 품질 게이트는 **Producer–Reviewer–User Approval**을 사용한다. 팀은 `root → worker` 한 단계로 제한하며 오케스트레이터가 최종 통합을 소유한다.

## 정본과 런타임

- 정본: 이 문서와 `.agents/skills/defenselike-*/SKILL.md`
- 선택적 Codex 어댑터: `.codex/agents/*.toml`
- Codex 역할/메시징은 활성 환경에서만 사용 가능하므로 `supported_with_extension` 또는 `advisory`로 취급한다.
- 공유 체크아웃의 파일 소유권은 지시 수준이다. 겹치는 쓰기는 직렬화하며, 격리된 worktree가 확인된 경우에만 동시 실행한다.
- 모델 정책은 기본 `inherit`; 특정 모델 ID는 정본에 두지 않는다.

## 역할

| 역할 | 책임 | 기술 | 기본 쓰기 |
| --- | --- | --- | --- |
| orchestrator | 라우팅, 소유권, 통합, 최종 수용 | `defenselike-orchestrator` | 최종 산출물, `_workspace/00_input/*` |
| game-planner | 요구사항 겸 기획, 규칙, 범위, 검증 기준 | `defenselike-game-planning` | `docs/*-req.md` 또는 `_workspace/01_requirements-draft.md` |
| technical-designer | 구조, 데이터, 상태, 테스트 전략 | `defenselike-technical-design` | 시스템 문서 또는 `_workspace/02_architecture_technical-design.md` |
| ux-designer | 화면/입력/피드백 명세 | `defenselike-ux-design` | 디자인 문서 또는 `_workspace/02_ux_interaction-spec.md` |
| implementation-worker | 승인 명세 구현 | `defenselike-implementation` | 사전 배정된 비중첩 코드 경로 |
| qa-reviewer | 독립 경계 검증과 판정 | `defenselike-qa` | `_workspace/04_qa_report.md` |

모든 역할은 최신 `AGENTS.md`를 읽고, 네트워크·외부 변경·재귀 위임 권한은 기본적으로 갖지 않는다. 질문과 에스컬레이션 대상은 orchestrator다.

## 라우팅

| 요청 | 필수 역할 | 조건부 역할 |
| --- | --- | --- |
| 게임 규칙/밸런스 | game-planner | qa-reviewer |
| 시스템 구조/저장 | technical-designer | game-planner, qa-reviewer |
| 화면/입력/피드백 | ux-designer | game-planner, qa-reviewer |
| 기능 구현 | implementation-worker, qa-reviewer | game-planner, technical-designer, ux-designer |
| 코드 리뷰/회귀 조사 | qa-reviewer | technical-designer |
| 단순·국소 수정 | orchestrator가 직접 수행 | 위험할 때만 qa-reviewer |

요구사항 범주별 읽기·분석은 병렬 가능하다. 시각 디자인과 구현은 `확정`·`승인` 상태만 소비한다. QA는 생산과 동시에 같은 파일을 수정하지 않는다.

## 단계와 핸드오프

1. Intake: 원요청, 범위, 상태, 공식 근거와 소유 경로를 정한다.
2. Requirements/Planning: 필요한 전문가가 요구사항 겸 기획 항목을 고유 ID·상태·근거·검증과 함께 작성한다.
3. QA Review: 독립 QA가 원요청, 공식 근거와 문서 간 경계를 읽고 `pass|fix|redo`를 판정한다.
4. User Approval: 사용자가 항목별 승인·수정·보류를 결정한다.
5. Produce: 시각 디자인과 구현은 `확정`·`승인` 항목만 소비하고 근거 ID를 남긴다.
6. Final Review: QA가 생산물과 근거 요구사항을 교차 검증하고 orchestrator가 최대 2회의 `fix`를 관리한다.

지속성이 필요한 경우에만 다음 파일을 사용한다.

| 생산자 | 소비자 | 경로 | 완료 상태 |
| --- | --- | --- | --- |
| orchestrator | 모든 역할 | `_workspace/00_input/request-summary.md` | `ready` |
| game-planner | 사용자/QA | `docs/*-req.md` | `ready-for-user-review|decision-needed` |
| technical-designer | 구현/QA | `_workspace/02_architecture_technical-design.md` | `approved|blocked` |
| ux-designer | 구현/QA | `_workspace/02_ux_interaction-spec.md` | `approved|blocked` |
| implementation-worker | QA | `_workspace/03_implementation_result.md` | `ready-for-review|partial` |
| qa-reviewer | orchestrator | `_workspace/04_qa_report.md` | `pass|fix|redo` |

## 실패 정책

- worker 생성 실패: orchestrator가 직렬 수행하거나 누락 범위를 `partial`로 보고한다.
- 도구/모델 불가: 상속 기본값으로 낮추고, 필수 능력이 없으면 해당 단계는 `blocked`다.
- 권한 거부/환경 구성 실패: 변경하지 않고 실패 동작과 남은 불확실성을 기록한다.
- 병렬 자원 충돌: 즉시 직렬화한다.
- 일부 결과 누락/상충: 합성에서 명시하고 근거 없이 빈 부분을 채우지 않는다.
- 통신 불가: 위 결정적 `_workspace/` 파일을 사용한다.

## 검증 시나리오

### 정상 흐름

“수동 스턴 함정을 구현해줘” 요청은 game-planner가 입력·패링·예외 수용 기준을 확정하고, 필요 시 technical-designer와 ux-designer가 독립 명세를 만든 뒤 implementation-worker가 구현한다. qa-reviewer는 게임 규칙↔입력 UI 및 상태↔코드 전이를 비교하여 판정한다.

### 실패 흐름

기술 스택이 없는 상태에서 “전투 화면을 구현해줘”가 오면 technical-designer는 엔진을 임의 선정하지 않고 `decision-needed`를 반환한다. 독립적으로 작성 가능한 UX 명세는 보존하되 구현 단계는 `blocked`로 보고한다.

## 수용 체크

- 모든 스킬에 YAML frontmatter, 사용 조건, 입력, 출력, 검증이 있다.
- 역할과 핸드오프 경로가 스킬 정의와 일치한다.
- 병렬 쓰기에는 비중첩 소유권 또는 격리가 필요하다.
- 최종 합성 소유자는 orchestrator 하나다.
- 부분 실패와 미검증 범위는 최종 결과에 남는다.
