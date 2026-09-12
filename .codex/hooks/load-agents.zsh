#!/bin/zsh

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
agents_file="$repo_root/AGENTS.md"

if [[ ! -f "$agents_file" ]]; then
  jq -n \
    --arg message "AGENTS.md 파일이 없습니다: $agents_file" \
    --arg context "[AGENTS.md 보고] 파일이 없습니다: $agents_file" \
    '{systemMessage: $message, hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $context}}'
  exit 0
fi

if [[ ! -s "$agents_file" ]]; then
  jq -n \
    --arg message "AGENTS.md 파일이 비어 있습니다: $agents_file" \
    --arg context "[AGENTS.md 보고] 파일이 비어 있습니다: $agents_file" \
    '{systemMessage: $message, hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $context}}'
  exit 0
fi

content="$(<"$agents_file")"
context="[AGENTS.md 보고] 최신 파일을 읽었습니다: $agents_file
--- AGENTS.md BEGIN ---
$content
--- AGENTS.md END ---"

jq -n \
  --arg message "AGENTS.md 최신 내용을 읽었습니다." \
  --arg context "$context" \
  '{systemMessage: $message, hookSpecificOutput: {hookEventName: "UserPromptSubmit", additionalContext: $context}}'
