---
paths:
  - ".claude/**/*.md"
  - ".claude/**/*.json"
  - ".claude/**/*.sh"
---

# Claude Code 설정 파일 작업 규칙

`.claude/` 하위 파일을 생성하거나 수정할 때 반드시 레퍼런스 포맷을 준수한다.

## 파일 타입별 포맷 기준

| 파일 | 참고할 레퍼런스 |
|------|---------------|
| `.claude/skills/*/SKILL.md` | `.claude/references/skills-format.md` |
| `.claude/settings.json` | `.claude/references/hooks-format.md` |
| `.claude/hooks/*.sh` | `.claude/references/hooks-format.md` |
| `.claude/rules/*.md` | `.claude/references/rules-format.md` |

## 작업 전 확인사항

### 새 스킬 만들 때
1. `.claude/references/skills-format.md` 를 읽어 frontmatter 필드 확인
2. 경로는 반드시 `.claude/skills/<name>/SKILL.md`
3. `name` 필드는 영소문자, 하이픈, 숫자만 사용

### 새 Hook 추가할 때
1. `.claude/references/hooks-format.md` 를 읽어 이벤트 타입 및 stdin 형식 확인
2. 스크립트는 `.claude/hooks/` 에 `.sh` 파일로 저장
3. 생성 후 `chmod +x` 실행 권한 부여 필수
4. Exit 코드: `0` = 계속 진행, `2` = 차단 + Claude에게 알림

### 새 규칙 만들 때
1. `.claude/references/rules-format.md` 를 읽어 paths 문법 확인
2. CLAUDE.md에 이미 있는 내용은 중복 작성하지 않기

## 빠른 참조

모든 레퍼런스는 `/docs <topic>` 스킬로 조회:
```
/docs skills   /docs hooks   /docs agents   /docs rules
```
