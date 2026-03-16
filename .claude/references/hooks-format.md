# Hooks 설정 포맷 가이드

## 파일 위치

```
.claude/settings.json               # 프로젝트 훅 (git에 커밋됨, 팀 공유)
.claude/settings.local.json         # 프로젝트 훅 (gitignore, 개인용)
~/.claude/settings.json             # 전역 훅 (모든 프로젝트에 적용)
```

## 설정 우선순위 (높음 → 낮음)

1. `.claude/settings.local.json` (로컬 프로젝트)
2. `.claude/settings.json` (프로젝트)
3. `~/.claude/settings.json` (개인 전역)
4. 관리 정책 설정 (조직)

## 기본 구조

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/check.sh",
            "timeout": 30
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/format.sh",
            "timeout": 15
          }
        ]
      }
    ]
  }
}
```

## 이벤트 타입 (Hook 발생 시점)

| 이벤트 | 설명 | matcher 대상 |
|--------|------|-------------|
| `PreToolUse` | 도구 실행 **전** | 도구명 (`Bash`, `Edit`, ...) |
| `PostToolUse` | 도구 실행 **후** | 도구명 |
| `PostToolUseFailure` | 도구 실행 **실패 후** | 도구명 |
| `PermissionRequest` | 권한 요청 시 | 도구명 |
| `SessionStart` | 세션 시작 시 | `startup`, `resume`, `clear`, `compact` |
| `UserPromptSubmit` | 사용자 메시지 제출 시 | (matcher 없음, 항상 실행) |
| `Notification` | 알림 발생 시 | `permission_prompt`, `idle_prompt` |
| `SubagentStart` / `SubagentStop` | 서브에이전트 시작/종료 | 에이전트 타입 |
| `Stop` | Claude 응답 완료 시 | (matcher 없음, 항상 실행) |

## matcher 패턴

```json
"matcher": "Bash"               // 특정 도구
"matcher": "Edit|Write"         // OR 조건
"matcher": "mcp__github__.*"    // MCP 도구 (정규식): mcp__<서버>__<도구>
```

## Hook 타입 (type 필드)

### 1. command (쉘 명령어) — 가장 자주 사용
```json
{
  "type": "command",
  "command": "bash .claude/hooks/validate.sh",
  "timeout": 30
}
```
- stdin으로 JSON 입력 받음
- 환경변수: `$CLAUDE_PROJECT_DIR` (프로젝트 루트)

### 2. http (HTTP POST)
```json
{
  "type": "http",
  "url": "http://localhost:8080/hook",
  "timeout": 30,
  "headers": { "Authorization": "Bearer $TOKEN" },
  "allowedEnvVars": ["TOKEN"]
}
```

### 3. prompt (LLM 판단)
```json
{
  "type": "prompt",
  "prompt": "이 명령어가 안전한가요? $ARGUMENTS",
  "model": "claude-haiku-4-5-20251001",
  "timeout": 30
}
```

### 4. agent (서브에이전트)
```json
{
  "type": "agent",
  "prompt": "테스트 통과 여부 확인: $ARGUMENTS",
  "timeout": 120
}
```

## Hook 스크립트 stdin 형식

Hook 스크립트는 다음 JSON을 stdin으로 받음:

```json
{
  "session_id": "abc123",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "git commit -m 'fix: bug'"
  }
}
```

도구별 `tool_input` 필드:
- **Bash**: `{ "command": "..." }`
- **Edit**: `{ "file_path": "...", "old_string": "...", "new_string": "..." }`
- **Write**: `{ "file_path": "...", "content": "..." }`

## Exit 코드 (Hook 결과)

| exit 코드 | 의미 |
|----------|------|
| `0` | 성공, 처리 계속 (stderr는 Claude에게 참고 정보로 전달) |
| `2` | **차단/경고** — stderr 내용을 Claude에게 전달하고 처리 중단 |
| 기타 | 오류이지만 처리는 계속 |

```bash
# 경고만 전달 (차단 없음)
echo "⚠️ 경고 메시지" >&2
exit 0

# 차단 + Claude에게 이유 전달
echo "❌ 금지된 작업입니다" >&2
exit 2
```

## 실제 예시: git commit 전 tsc 체크

```bash
#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
print(d.get('tool_input', {}).get('command', ''))
")

if [[ "$COMMAND" != *"git commit"* ]]; then
    exit 0
fi

TSC_OUTPUT=$(npx tsc --noEmit 2>&1)
if [ $? -ne 0 ]; then
    echo "❌ TypeScript 오류:" >&2
    echo "$TSC_OUTPUT" >&2
    exit 2
fi
exit 0
```
