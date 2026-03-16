---
name: section
description: 새 페이지 섹션 컴포넌트의 boilerplate를 생성합니다
argument-hint: <ComponentName>
user-invocable: true
---

`$ARGUMENTS` 이름의 새 섹션 컴포넌트를 생성합니다.

## 수행할 작업

### 1단계: 기존 섹션 패턴 파악
`src/components/sections/` 디렉토리를 읽어 기존 섹션들의 구조와 패턴을 파악합니다.

### 2단계: 컴포넌트 파일 생성
`src/components/sections/$ARGUMENTS.tsx` 를 다음 구조로 생성합니다:

```tsx
'use client'

import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function $ARGUMENTSSection() {
  const t = useTranslations('$ARGUMENTS_lower')

  return (
    <AnimatedSection>
      <section id="$ARGUMENTS_lower" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">
            {t('title')}
          </h2>
        </div>
      </section>
    </AnimatedSection>
  )
}
```

- `$ARGUMENTS_lower`는 $ARGUMENTS를 camelCase로 변환한 값 (예: FAQ → faq)
- CLAUDE.md의 컴포넌트 규칙을 반드시 준수

### 3단계: messages 키 추가
`src/messages/ko.json`과 `src/messages/en.json` 양쪽에 새 섹션 키를 추가합니다:

```json
{
  "$ARGUMENTS_lower": {
    "title": ""
  }
}
```

### 4단계: page.tsx 안내
`src/app/[locale]/page.tsx`를 읽고, 새 섹션을 어디에 추가하면 좋을지 제안합니다.
(자동 삽입하지 말고 제안만 — 위치는 사용자가 결정)

## 사용 예시

```
/section FAQ
/section Roadmap
/section Press
```
