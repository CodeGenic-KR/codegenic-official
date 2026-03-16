#!/bin/bash
# PostToolUse(Edit|Write) 후 Prettier 자동 포맷
# 수정된 파일을 stdin JSON에서 추출하여 prettier로 포맷

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    ti = d.get('tool_input', {})
    # Edit 도구: file_path 필드
    # Write 도구: file_path 필드
    print(ti.get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

# 파일 경로가 없거나 대상 확장자가 아니면 스킵
if [ -z "$FILE_PATH" ]; then
    exit 0
fi

if [[ ! "$FILE_PATH" =~ \.(ts|tsx|js|jsx|css|json|md)$ ]]; then
    exit 0
fi

# 프로젝트 루트로 이동
cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

# prettier가 설치되어 있을 때만 실행
if npx prettier --version > /dev/null 2>&1; then
    npx prettier --write "$FILE_PATH" --log-level silent 2>/dev/null
fi

exit 0
