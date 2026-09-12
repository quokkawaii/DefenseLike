#!/bin/zsh

# UserPromptSubmit 입력에서 GitHub 작업 의도를 구분하고,
# 사용자가 합의한 수동 승인형 PR/머지 후 절차를 Codex에 전달한다.

input="$(cat)"
prompt="$(print -r -- "$input" | jq -r '.prompt // ""' 2>/dev/null)"

if [[ -z "$prompt" ]]; then
  exit 0
fi

workflow="general"

if [[ "$prompt" =~ '(머지|병합).*(했|완료|됐|되었)' || "$prompt" =~ '([Mm]erged|[Mm]erge completed)' ]]; then
  workflow="post_merge"
elif [[ "$prompt" =~ '([Pp][Rr]|풀[[:space:]]*리퀘스트)' ]] && \
     [[ "$prompt" =~ '(준비|올려|생성|만들|요청|진행|작성)' ]]; then
  workflow="prepare_pr"
elif [[ "$prompt" =~ '^(승인|승인해|생성해|올려|진행해|그대로[[:space:]]*(해|진행)|좋아)' ]]; then
  workflow="approval_candidate"
fi

base_policy='[GitHub 워크플로 필수 정책]
- PR은 자동 생성하지 않는다. 사용자가 명시적으로 PR을 요청한 경우에만 준비 절차를 시작한다.
- 최초 PR 요청은 준비 권한이다. 원격 push와 PR 생성 권한으로 간주하지 않는다.
- PR 제목과 본문은 한국어로 작성하고, 생성 전에 사용자에게 전체 미리보기를 보고한다.
- 사용자가 미리보기를 확인한 뒤 명시적으로 승인해야만 push와 PR 생성을 수행한다.
- 승인 여부가 불분명하면 원격 변경을 만들지 말고 사용자에게 확인한다.
- 충돌을 임의로 해결하거나 브랜치를 임의로 삭제하지 않는다.'

case "$workflow" in
  prepare_pr)
    action_policy='[현재 요청: PR 준비]
1. 최신 AGENTS.md와 git status를 다시 확인한다.
2. 이번 작업에 해당하는 파일만 검토·스테이징·커밋한다. 다른 사용자 변경을 포함하지 않는다.
3. git fetch origin 후 현재 브랜치를 origin/main 기준으로 최신화한다. 필요하면 git rebase origin/main을 사용한다.
4. 충돌이 발생하면 즉시 중단하고 충돌 파일, 진행 단계, 수행하지 않은 작업을 사용자에게 보고한다. 자동 해결하지 않는다.
5. 가능한 테스트와 문법 검사를 수행한다.
6. 한국어 PR 제목·본문, 대상/작업 브랜치, 커밋, 변경 파일, 검증 결과를 미리보기로 보고한다.
7. 이 단계에서는 push와 PR 생성을 하지 말고 사용자의 최종 승인을 기다린다.'
    ;;
  post_merge)
    action_policy='[현재 요청: 머지 후 정리]
1. 최신 AGENTS.md와 git status를 다시 확인한다. 미커밋 변경이 있으면 main 전환 전에 보고하고 중단한다.
2. git switch main 후 git pull --ff-only origin main으로 최신화한다. 실패나 충돌이 있으면 사용자에게 보고한다.
3. 직전 작업 브랜치가 GitHub 원격에서 삭제되었는지와 로컬에 남아 있는지를 각각 확인해 보고한다.
4. 남은 브랜치를 자동 삭제하지 않는다. 삭제가 필요하면 사용자 허락을 받는다.
5. 사용자가 새 브랜치 주제를 이미 말했다면 최신 main에서 그 의미에 맞는 브랜치를 생성한다.
6. 새 브랜치 주제가 없다면 브랜치를 만들지 말고 사용자에게 주제를 질문한다.
7. 완료 후 최신 main 커밋, 이전 브랜치 상태, 새 브랜치명을 보고한다.'
    ;;
  approval_candidate)
    action_policy='[현재 요청: 승인 후보]
- 직전 대화에 한국어 PR 미리보기가 있고 사용자가 그 미리보기를 승인하는 상황인지 확인한다.
- 승인 대상이 명확할 때만 미리보기와 동일한 내용으로 push 및 PR 생성을 수행하고 PR 번호와 URL을 보고한다.
- 직전 PR 미리보기가 없거나 다른 작업의 실행 요청일 가능성이 있으면 PR 승인으로 간주하지 않는다.'
    ;;
  *)
    action_policy='[현재 요청: 일반 작업]
- 일반 작업만 수행한다. 대화 종료나 작업 완료를 이유로 PR을 준비하거나 생성하지 않는다.
- 대화가 이미 PR 미리보기 승인 대기 또는 머지 후 브랜치 주제 확인 단계라면 그 상태를 유지한다.'
    ;;
esac

context="$base_policy

$action_policy"

jq -n \
  --arg context "$context" \
  '{hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $context}}'
