---
name: docs
description: Claude Code 설정 포맷(스킬, 훅, 에이전트, 규칙)에 대한 레퍼런스 문서를 조회합니다
argument-hint: <topic>
user-invocable: true
---

Claude Code 레퍼런스 문서를 조회합니다.

요청 주제: $ARGUMENTS

## 수행할 작업

### 1단계: 주제 파악
`$ARGUMENTS`에서 조회할 주제를 파악합니다.

| 키워드 | 읽을 파일 |
|--------|----------|
| `skills`, `skill`, `스킬`, `커맨드`, `command` | `.claude/references/skills-format.md` |
| `hooks`, `hook`, `훅` | `.claude/references/hooks-format.md` |
| `agents`, `agent`, `에이전트` | `.claude/references/agents-guide.md` |
| `rules`, `rule`, `규칙` | `.claude/references/rules-format.md` |
| `all`, `전체`, 인자 없음 | `.claude/references/index.md` (인덱스 출력) |

### 2단계: 해당 파일 읽기
위 표에서 매칭된 파일을 읽고, 사용자가 묻는 내용에 집중하여 핵심만 요약합니다.

### 3단계: 현재 프로젝트 적용 예시 포함
단순 문서 출력이 아니라, 이 프로젝트(`.claude/` 하위 실제 파일)를 예시로 들어 설명합니다.

## 사용 예시

```
/docs skills          # SKILL.md 포맷 가이드
/docs hooks           # Hooks 설정 가이드
/docs agents          # Agent 타입 및 사용법
/docs rules           # .claude/rules/ 포맷
/docs                 # 전체 인덱스
```
