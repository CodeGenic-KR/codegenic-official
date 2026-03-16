# Agent 타입 및 사용 가이드

## Agent 도구란?

`Agent` 도구는 특화된 서브에이전트를 실행하는 기능.
복잡한 멀티스텝 작업이나 독립적인 병렬 작업에 활용.

## 사용 가능한 Agent 타입

### general-purpose
- **용도:** 복잡한 다단계 작업, 코드 검색, 자유로운 탐색
- **도구:** 모든 도구 사용 가능
- **언제 사용:** 여러 라운드의 검색과 실행이 필요한 작업

### Explore
- **용도:** 코드베이스 빠른 탐색 전용 (읽기 전용)
- **도구:** Edit, Write, NotebookEdit 제외한 모든 도구
- **언제 사용:** 파일 패턴 검색, 키워드 코드 검색, 아키텍처 파악
- **옵션:** thoroughness — `quick` / `medium` / `very thorough`

### Plan
- **용도:** 구현 계획 설계, 아키텍처 분석
- **도구:** Edit, Write, NotebookEdit 제외한 모든 도구
- **언제 사용:** 기능 추가/리팩토링 전 설계 단계

### claude-code-guide
- **용도:** Claude Code CLI, Anthropic API, Agent SDK 관련 질문
- **도구:** Glob, Grep, Read, WebFetch, WebSearch
- **언제 사용:** 스킬/훅/설정 포맷 조사, API 사용법 확인
- **주의:** 이미 실행 중인 에이전트가 있으면 `resume`으로 재사용

### statusline-setup
- **용도:** Claude Code 상태표시줄 설정
- **도구:** Read, Edit

## 언제 Agent를 사용하는가

### 사용하는 경우
- 범위가 불확실한 코드베이스 탐색
- 3개 이상의 파일을 병렬로 조사할 때
- 메인 컨텍스트를 검색 결과로 오염시키고 싶지 않을 때
- 독립적인 작업을 병렬로 처리할 때

### 사용하지 않는 경우
- 특정 파일 경로를 읽을 때 → `Read` 도구 직접 사용
- 특정 클래스/함수 검색 → `Glob` 또는 `Grep` 직접 사용
- 2~3개 파일 내 코드 검색 → `Read` 직접 사용

## 병렬 실행 패턴

독립적인 탐색 작업은 한 번에 여러 Agent를 동시에 실행:

```
새 섹션 추가 시:
├── Agent 1 (Explore)  → 기존 섹션 컴포넌트 패턴 파악
├── Agent 2 (Explore)  → messages 파일 구조 파악
└── 결과 통합 후 구현

i18n 작업 시:
├── Agent 1  → ko.json 작성
└── Agent 2  → en.json 작성 (동시 진행)
```

## SKILL.md에서 Agent 사용

스킬 내에서 서브에이전트를 실행하려면 frontmatter에 지정:

```yaml
---
name: explore-sections
context: fork
agent: Explore
---

src/components/sections/ 디렉토리의 모든 컴포넌트 구조를 파악하고
공통 패턴을 정리해주세요.
```

## Hooks에서 Agent 사용

```json
{
  "type": "agent",
  "prompt": "이 변경사항이 i18n 규칙을 위반하는지 확인해주세요.",
  "timeout": 120
}
```

## resume 파라미터

이전에 실행한 Agent를 재개할 때:
- 에이전트 완료 시 반환된 `agentId` 사용
- 전체 이전 컨텍스트를 유지한 채로 계속 실행
- 특히 `claude-code-guide` 같은 조사형 에이전트에 유용
