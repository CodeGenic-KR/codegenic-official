#!/bin/bash
# PreToolUse(Bash) - git commit 명령어 실행 전 TypeScript 타입 체크
# 타입 오류가 있으면 커밋을 차단하고 오류 내용을 Claude에게 전달

INPUT=$(cat)

COMMAND=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('command', ''))
except Exception:
    print('')
" 2>/dev/null)

# git commit 명령어가 아니면 스킵
if [[ "$COMMAND" != *"git commit"* ]]; then
    exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# node_modules 또는 tsconfig.json이 없으면 스킵 (아직 설치 전)
if [ ! -f "tsconfig.json" ] || [ ! -d "node_modules" ]; then
    exit 0
fi

echo "🔍 TypeScript 타입 체크 중..." >&2

TSC_OUTPUT=$(npx tsc --noEmit 2>&1)
TSC_EXIT=$?

if [ $TSC_EXIT -ne 0 ]; then
    echo "❌ TypeScript 타입 오류가 있습니다. 커밋 전에 수정해주세요:" >&2
    echo "" >&2
    echo "$TSC_OUTPUT" >&2
    exit 2
fi

echo "✅ TypeScript 타입 체크 통과" >&2
exit 0
