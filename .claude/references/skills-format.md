# SKILL.md 작성 포맷 가이드

## 파일 위치

```
.claude/skills/<skill-name>/SKILL.md        # 프로젝트 스킬
~/.claude/skills/<skill-name>/SKILL.md      # 개인 전역 스킬
```

## 기본 구조

```yaml
---
name: skill-name                    # 슬래시 명령어 이름 (영소문자, 하이픈, 숫자만)
description: 스킬 설명              # Claude 자동 실행 시 사용하는 설명
argument-hint: [arg1] [arg2]        # 자동완성에 표시되는 인자 힌트
user-invocable: true                # false면 Claude만 호출 가능 (사용자 호출 불가)
disable-model-invocation: false     # true면 사용자만 호출 가능 (Claude 자동 실행 불가)
allowed-tools: Read, Grep           # 이 스킬 활성화 시 허용할 도구 목록
model: claude-opus-4-6              # 이 스킬 실행 시 사용할 모델 (기본: 상속)
context: fork                       # "fork"면 서브에이전트에서 실행
agent: Explore                      # context: fork 사용 시 에이전트 타입
---

스킬 본문 (Markdown). 여기에 지시사항을 작성합니다.
```

## frontmatter 필드 상세

| 필드 | 필수 | 기본값 | 설명 |
|------|------|--------|------|
| `name` | ✅ | — | `/name` 으로 호출되는 슬래시 명령어 이름 |
| `description` | 권장 | — | Claude가 스킬을 선택하는 기준 |
| `argument-hint` | 선택 | — | 자동완성 UI에 표시되는 힌트 |
| `user-invocable` | 선택 | `true` | `false`면 `/name`으로 직접 호출 불가 |
| `disable-model-invocation` | 선택 | `false` | `true`면 Claude가 자동으로 스킬 호출 불가 |
| `allowed-tools` | 선택 | — | 이 스킬이 사용 가능한 도구 화이트리스트 |
| `model` | 선택 | 상속 | 스킬 실행 시 강제 사용할 모델 |
| `context` | 선택 | — | `"fork"` 지정 시 서브에이전트에서 실행 |
| `agent` | 선택 | — | `context: fork` 사용 시 에이전트 타입 |

## 변수 치환

| 변수 | 설명 |
|------|------|
| `$ARGUMENTS` | 슬래시 명령어 뒤의 전체 인자 문자열 |
| `$ARGUMENTS[N]` | N번째 인자 (0-indexed, 공백으로 구분) |
| `$N` | `$ARGUMENTS[N]` 단축 문법 (`$0`, `$1`, ...) |
| `${CLAUDE_SESSION_ID}` | 현재 세션 ID |
| `${CLAUDE_SKILL_DIR}` | 이 스킬 파일이 위치한 디렉토리 경로 |

### 변수 예시

```markdown
---
name: fix-issue
argument-hint: <issue-number>
---

GitHub 이슈 #$ARGUMENTS[0] 를 수정해주세요.
```

`/fix-issue 123` 호출 → `$ARGUMENTS[0]` = `123`

## 스킬 디렉토리 구조

```
.claude/skills/<name>/
├── SKILL.md              # 필수: 메인 지시사항
├── reference.md          # 선택: 참고 자료 (스킬 내에서 @import 가능)
├── examples.md           # 선택: 사용 예시
└── scripts/
    └── helper.py         # 선택: 실행 스크립트
```

## 실제 예시: /translate 스킬

```yaml
---
name: translate
description: 새 i18n 텍스트를 ko.json과 en.json에 동시에 추가합니다
argument-hint: <dot.notation.key> "<korean text>" "<english text>"
user-invocable: true
---

i18n 텍스트를 두 언어 파일에 추가합니다: $ARGUMENTS

1. src/messages/ko.json에 한국어 텍스트 추가
2. src/messages/en.json에 영어 텍스트 추가
```

## 주의사항

- `name`은 영소문자, 하이픈(-), 숫자만 사용 가능
- `$ARGUMENTS[N]`에서 N은 0부터 시작
- 인자에 공백이 포함된 경우 따옴표로 감싸도 파싱이 단순 공백 분리임에 유의
- `context: fork` 사용 시 서브에이전트가 별도 컨텍스트에서 실행됨
