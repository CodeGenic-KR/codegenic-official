# .claude/rules/ 파일 작성 포맷 가이드

## 개요

`.claude/rules/` 디렉토리의 규칙 파일은 특정 파일 경로에서 작업할 때
Claude에게 자동으로 추가 지시사항을 적용하는 기능.

## 파일 위치

```
.claude/rules/           # 프로젝트 규칙 (git 커밋 가능)
~/.claude/rules/         # 개인 전역 규칙
```

## 기본 구조

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "**/*.test.ts"
---

# 규칙 제목

규칙 내용을 Markdown으로 작성...
```

## frontmatter 필드

| 필드 | 필수 | 설명 |
|------|------|------|
| `paths` | 선택 | 이 규칙이 적용될 glob 패턴 배열. 없으면 항상 적용 |

- `paths`를 지정하면 해당 경로 파일 작업 시에만 자동 로드됨
- `paths`가 없으면 모든 작업에 적용 (CLAUDE.md와 유사)

## glob 패턴 예시

```yaml
paths:
  - "src/messages/**/*.json"    # messages 하위 모든 JSON
  - "src/components/**/*.tsx"   # components 하위 모든 TSX
  - ".claude/**/*.md"           # .claude 하위 모든 MD
  - "**/*.test.ts"              # 모든 테스트 파일
  - "src/api/*.ts"              # src/api 바로 아래 TS 파일만
```

## CLAUDE.md와의 차이

| 항목 | CLAUDE.md | .claude/rules/ |
|------|-----------|---------------|
| 적용 범위 | 항상 전체 적용 | 파일 경로별 선택 적용 |
| 로드 시점 | 세션 시작 시 | 해당 경로 파일 작업 시 |
| 용도 | 전체 프로젝트 규칙 | 특정 영역 세부 규칙 |
| `@import` | 지원 | 지원 |

## 실제 예시: i18n 규칙

```markdown
---
paths:
  - "src/messages/**/*.json"
  - "src/i18n/**/*.ts"
---

# i18n 작업 규칙

- ko.json 수정 시 en.json도 반드시 동일 키로 수정
- JSON 들여쓰기는 2칸(space 2)으로 통일
- 키는 섹션명.항목명 형태 (camelCase)
```

## 실제 예시: 컴포넌트 규칙

```markdown
---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# 컴포넌트 작성 규칙

- 텍스트 하드코딩 금지, useTranslations() 사용
- 섹션 컴포넌트는 AnimatedSection 래퍼 필수
```

## 경로 없는 규칙 (항상 적용)

```markdown
# 전역 코딩 규칙

frontmatter 없이 작성하면 모든 파일 작업 시 적용됨.
```

## 주의사항

- 너무 많은 규칙 파일을 만들면 컨텍스트가 과부하될 수 있음
- CLAUDE.md에 이미 있는 내용은 중복 작성하지 않기
- 규칙 파일은 지시사항/제약이지, 레퍼런스 문서가 아님
- 레퍼런스 문서는 `.claude/references/`에 따로 관리
