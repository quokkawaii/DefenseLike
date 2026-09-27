---
name: defenselike-technical-design
description: DefenseLike의 로컬 싱글 플레이 제약 안에서 시스템 구조, 데이터 모델, 상태 흐름과 구현 경계를 설계한다.
---

# DefenseLike Technical Design

## When to Use
- 새 기능이 여러 시스템에 걸치거나 저장 데이터, 상태 머신, 성능 경계를 정해야 할 때 사용한다.
- 기술 스택 선정 또는 `docs/requirement/system-req.md` 구체화가 필요할 때 사용한다.
- 작은 로컬 코드 수정에는 별도 호출하지 않는다.

## Required Inputs
- `확정` 또는 `승인` 상태의 요구사항과 수용 기준
- `docs/requirement/system-req.md`, `docs/requirement/game-req.md`, 현재 코드 구조

## Workflow
1. 런타임, 저장, 전투 시뮬레이션, UI 경계를 식별한다.
2. 인게임 휘발 상태와 아웃게임 영구 JSON 데이터를 분리한다.
3. 상태 전이, 데이터 스키마, 모듈 인터페이스, 실패 복구를 정의한다.
4. 100층을 20~25분에 처리하는 목표에 영향을 주는 갱신 빈도와 객체 수 위험을 기록한다.
5. 구현 파일 소유권과 검증 명령을 제안한다. 미정 기술 선택은 확정하지 않는다.
6. 설계 결정마다 근거 요구사항 ID를 기록한다.

## Outputs
- 기본 핸드오프: `_workspace/02_architecture_technical-design.md`
- 컴포넌트 경계, 데이터 계약, 상태 흐름, 파일 소유권, 테스트 전략을 포함한다.

## Validation
- 서버, 로그인, WebSocket 의존성을 도입하지 않는다.
- 저장 스키마와 이를 소비하는 코드/UI의 필드가 일치하는지 양쪽을 확인한다.
- 병렬 구현 경로가 겹치면 직렬화를 요구한다.
- `제안`·`미정` 요구사항을 설계 입력으로 사용하지 않는다.
