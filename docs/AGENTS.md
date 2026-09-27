# 기술 기준

- 게임은 TypeScript와 Phaser로 개발한다.
- 백엔드와 데이터베이스는 사용하지 않는다.
- 콘텐츠, 설정, 세이브 데이터는 로컬 JSON 파일와 로컬 스토리지로 관리한다.
- 최종 배포 대상은 Steam이다.
- Phaser 게임을 Steam 실행 파일로 만들기 위한 데스크톱 패키징 기술은 별도로 결정한다.

# 파일 역할
- `game_setting/game.md` : 사용자가 작성한 전체 게임 설정 원본
- `game_setting/characters.md` : 사용자가 작성한 캐릭터 설정 원본
- `game_setting/monster.md` : 사용자가 작성한 몬스터 설정 원본
- `game_setting/scroll.md` : 기존 함정을 대체하는 스크롤 설정 원본
- `requirement/game-req.md` : 전투, 합성, 원소 상성 같은 상세 게임 규칙
- `requirement/system-req.md` : `requirement/game-req.md`의 기능을 어떤 입력·설정·저장·실행환경으로 지원할지
- `requirement/design-req.md` : 화면 구조, 상호작용, 피드백, 시각 및 접근성 요구사항
- `requirement/product-req.md` : 목표 사용자, 범위, 출시, 운영, 규정, 분석, 문서 공통 결정

# 에이전트가 절대 지켜야할 규칙 (요구사항 정의)
- 추후 기획,디자인,개발에 막힘이 없어야한다.
- 개발 & 디자인에 필요한 모든 정보를 요구사항에 넣어야한다.
- 모든 정보의 기준은 공식문서를 기준으로 따른다.
- 요구사항 문서는 기획 문서를 겸한다. 별도의 기획 변환 문서를 요구하지 않는다.
- 모든 요구사항은 고유 ID와 `확정`, `제안`, `미정`, `승인` 중 하나의 상태를 가진다.
- 사용자가 이미 결정한 `확정`과 항목별 리뷰를 통과한 `승인`만 개발·디자인 근거로 사용할 수 있다. `제안`, `미정`은 사용할 수 없다.
- 프로젝트 고유 게임 규칙은 사용자 결정과 `requirement/game-req.md`를 근거로 하며, 공식 표준이 재미나 밸런스를 결정한다고 표현하지 않는다.

# 기획·요구사항 추가 전 필수 검증

- `requirement/game-req.md`, `requirement/system-req.md`, `requirement/design-req.md`, `requirement/product-req.md`에 기획 또는 요구사항을 추가하기 전에 네 정본 문서의 기존 항목을 모두 검색한다.
- 새 내용과 의미가 같은 기존 항목이 있으면 새 ID를 추가하지 않고 기존 항목의 상태·요구사항·근거·검증을 보완한다.
- 새 내용이 기존 항목의 일부를 더 구체화하는 경우 기존 항목에 통합할 수 있는지 먼저 검토한다. 별도 검증 경계나 책임 영역이 필요한 경우에만 새 ID를 추가한다.
- 기존 항목과 충돌하거나 어느 항목을 유지할지 불분명하면 임의로 추가·수정하지 않고 사용자에게 충돌 내용과 관련 ID를 보고한다.
- 게임·시스템·디자인·제품 문서 사이의 같은 규칙 반복은 피한다. 다른 문서의 책임 영역에서 파생 요구사항이 필요한 경우 원본 ID를 근거로 연결하고, 같은 문장을 복제하지 않는다.
- 항목 추가 또는 통합 후에는 ID 중복, 의미 중복, 상태 값, 근거, 관찰 가능한 검증 방법과 문서 간 참조를 검사한다. 이 검증을 통과한 경우에만 정본 변경을 완료한 것으로 본다.
- 인터뷰 질문을 제시하기 전에도 기존 정본에서 이미 확정·승인·미정으로 관리 중인 내용인지 검색한다. 이미 답이 있는 질문은 다시 묻지 않는다.

# 공식 문서 기준

기술 요구사항과 구현 방식을 결정할 때 다음 공식 문서를 우선한다.

- Phaser Input: 키보드, WASD, 마우스 및 게임패드 입력 처리
  - https://docs.phaser.io/phaser/concepts/input
- Phaser Scale Manager: 해상도, 화면 비율, 창 크기 및 전체화면 처리
  - https://docs.phaser.io/phaser/concepts/scale-manager
- Phaser Audio: 음량, 음소거 및 오디오 재생 관리
  - https://docs.phaser.io/phaser/concepts/audio
- Electron Documentation: Phaser 게임의 데스크톱 패키징 및 실행 파일 생성
  - https://www.electronjs.org/docs/latest
- Electron app API: 설정과 JSON 세이브 데이터의 운영체제별 저장 위치
  - https://www.electronjs.org/docs/latest/api/app
- Steam Input: 키 재설정, 게임패드 및 입력 액션 설계
  - https://partner.steamgames.com/doc/features/steam_controller/getting_started_for_devs
- SteamPipe: 실행 파일, Depot, 테스트 브랜치 및 빌드 업로드
  - https://partner.steamgames.com/doc/sdk/uploading
- Steam Review Process: Steam 출시 빌드의 실행 및 기능 검수 기준
  - https://partner.steamgames.com/doc/store/review_process
- ISO/IEC/IEEE 29148: 요구사항 구조, 품질, 검증 및 추적성
  - https://www.iso.org/standard/72089.html
- ISO/IEC 25010: 소프트웨어 제품 품질 분류
  - https://www.iso.org/standard/78176.html
- ISO 9241-210: 사용자 중심 설계와 반복 평가
  - https://www.iso.org/standard/77520.html
- WCAG 2.2: 인지·조작·가독성·입력 접근성 참고 기준
  - https://www.w3.org/TR/WCAG22/

공식 문서와 프로젝트 요구사항이 충돌하면 임의로 결정하지 않고 사용자에게 보고한다. 공식 문서에 여러 구현 방식이 제시된 경우 프로젝트에 적용할 방식을 `확정`, `제안`, `미정`으로 구분한다.

# DefenseLike

## 기본 원칙

- 요구사항의 정본은 `docs/requirement/`이다.
- 기획 내용을 임의로 추측하거나 생성하지 않는다.
- 사용자에게 확정받지 않은 내용을 확정된 요구사항처럼 취급하지 않는다.
- 요구사항의 상태는 `미정`, `제안`, `확정`, `승인`을 따른다.
- `확정`, `승인` 항목은 충돌이나 변경 요청이 없는 한 다시 질문하지 않는다.

## 기획 인터뷰

기획 인터뷰를 수행할 때는
`docs/interview/interview-rules.md`를 따른다.

새 세션에서 인터뷰를 재개할 때는
`docs/interview/interview-state.md`를 먼저 확인한다.

## 문서 조회

- 필요한 정보를 검색 또는 부분 조회로 확보할 수 있으면 전체 파일을 다시 읽지 않는다.
- 현재 질문을 준비하기 위해 필요한 관련 요구사항은 자유롭게 검색할 수 있다.
- 다음 인터뷰 대상을 선정하기 위해 정본의 `제안`, `미정` 항목을 탐색할 수 있다.
- 정확한 판단을 위해 필요한 경우 연관 요구사항까지 추가로 조회한다.
- 단순한 맥락 파악을 목적으로 모든 요구사항 문서를 처음부터 다시 읽지 않는다.

## 정보 우선순위

내용이 충돌하면 다음 순서를 따른다.

1. `docs/requirement/` 정본
2. `interview-state.md`
3. 현재 대화의 이전 내용

`interview-state.md`는 정본을 대체하지 않는다.
