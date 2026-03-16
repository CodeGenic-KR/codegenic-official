# Claude Code 레퍼런스 인덱스

이 디렉토리는 Claude Code 설정 파일 작성 시 참고할 공식 포맷 가이드를 담고 있습니다.

## 문서 목록

| 파일 | 내용 |
|------|------|
| `skills-format.md` | SKILL.md 작성 포맷 (frontmatter 필드, 변수, 디렉토리 구조) |
| `hooks-format.md` | Hooks 설정 포맷 (이벤트 타입, hook 타입, stdin/stdout 형식) |
| `agents-guide.md` | Agent 타입 목록 및 사용 가이드 |
| `rules-format.md` | `.claude/rules/` 파일 작성 포맷 |

## 빠른 참조

### 새 스킬 만들 때
→ `skills-format.md` 참고
→ 경로: `.claude/skills/<name>/SKILL.md`

### 새 Hook 추가할 때
→ `hooks-format.md` 참고
→ 경로: `.claude/settings.json`의 `hooks` 필드

### 경로별 규칙 만들 때
→ `rules-format.md` 참고
→ 경로: `.claude/rules/<name>.md`

### Agent 도구 사용할 때
→ `agents-guide.md` 참고

## 조회 방법

`/docs <주제>` 스킬로 언제든 검색 가능:
```
/docs skills
/docs hooks
/docs agents
/docs rules
```
