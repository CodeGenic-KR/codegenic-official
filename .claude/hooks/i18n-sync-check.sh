#!/bin/bash
# PostToolUse(Edit|Write) 후 i18n 키 동기화 체크
# messages/ko.json 또는 messages/en.json 수정 시 키 불일치 경고

INPUT=$(cat)

FILE_PATH=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_input', {}).get('file_path', ''))
except Exception:
    print('')
" 2>/dev/null)

# messages/ 하위 JSON 파일이 아니면 스킵
if [[ "$FILE_PATH" != *"messages/"* ]] || [[ "$FILE_PATH" != *".json" ]]; then
    exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

KO_FILE="src/messages/ko.json"
EN_FILE="src/messages/en.json"

# 두 파일이 모두 존재할 때만 체크
if [ ! -f "$KO_FILE" ] || [ ! -f "$EN_FILE" ]; then
    exit 0
fi

# 두 파일의 최상위 키를 비교
DIFF_OUTPUT=$(python3 -c "
import json, sys

def get_all_keys(obj, prefix=''):
    keys = []
    for k, v in obj.items():
        full_key = f'{prefix}.{k}' if prefix else k
        if isinstance(v, dict):
            keys.extend(get_all_keys(v, full_key))
        else:
            keys.append(full_key)
    return sorted(keys)

try:
    with open('$KO_FILE', encoding='utf-8') as f:
        ko = json.load(f)
    with open('$EN_FILE', encoding='utf-8') as f:
        en = json.load(f)

    ko_keys = set(get_all_keys(ko))
    en_keys = set(get_all_keys(en))

    only_in_ko = ko_keys - en_keys
    only_in_en = en_keys - ko_keys

    if only_in_ko or only_in_en:
        print('MISMATCH')
        if only_in_ko:
            for k in sorted(only_in_ko):
                print(f'  ko.json에만 있음: {k}')
        if only_in_en:
            for k in sorted(only_in_en):
                print(f'  en.json에만 있음: {k}')
    else:
        print('OK')
except Exception as e:
    print(f'ERROR: {e}')
" 2>&1)

if echo "$DIFF_OUTPUT" | grep -q "^MISMATCH"; then
    echo "⚠️  i18n 키 불일치 감지:" >&2
    echo "$DIFF_OUTPUT" | grep -v "^MISMATCH" >&2
    echo "" >&2
    echo "ko.json과 en.json의 키를 맞춰주세요. /translate 스킬을 사용하면 자동으로 동시 추가됩니다." >&2
    # exit 0: Claude에게 경고만 전달, 작업은 계속 진행
    exit 0
fi

exit 0
