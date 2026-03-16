---
name: translate
description: 새 i18n 텍스트 키를 ko.json과 en.json에 동시에 추가합니다
argument-hint: <dot.notation.key> "<korean text>" "<english text>"
user-invocable: true
---

i18n 텍스트를 두 언어 파일에 동시에 추가합니다.

입력된 인자: $ARGUMENTS

## 수행할 작업

위 인자에서 다음 세 가지를 파악하세요:
1. **키 경로** (dot notation, 예: `hero.subtitle`)
2. **한국어 텍스트**
3. **영어 텍스트**

그 다음 아래 단계를 수행하세요:

### 1단계: ko.json 수정
`src/messages/ko.json`을 읽고, 키 경로에 한국어 텍스트를 추가합니다.
- 중간 경로가 없으면 객체를 생성합니다
- JSON 들여쓰기는 2칸(space 2) 유지
- 기존 키 순서를 유지합니다

### 2단계: en.json 수정
`src/messages/en.json`을 읽고, 동일한 키 경로에 영어 텍스트를 추가합니다.
- ko.json과 동일한 방식으로 수정

### 3단계: 확인
두 파일이 모두 수정되면 추가된 키와 값을 요약해서 보여주세요.

## 사용 예시

```
/translate hero.subtitle "AI로 게임을 만드는 회사" "The AI-Native Game Studio"
/translate about.values.aiFirst "AI 퍼스트" "AI First"
/translate game.badge "2026년 11월 출시 예정" "Coming November 2026"
```
