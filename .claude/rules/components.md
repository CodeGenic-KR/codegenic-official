---
paths:
  - "src/components/**/*.tsx"
  - "src/app/**/*.tsx"
---

# 컴포넌트 작성 규칙

`src/components/` 또는 `src/app/` 파일 작업 시 아래 규칙을 따른다.

## 파일 위치 규칙

| 종류 | 위치 |
|------|------|
| 페이지 섹션 | `src/components/sections/SectionName.tsx` |
| 공용 UI | `src/components/ui/ComponentName.tsx` |
| 페이지 | `src/app/[locale]/page.tsx` |
| 레이아웃 | `src/app/[locale]/layout.tsx` |

## 섹션 컴포넌트 기본 구조

```tsx
'use client'

import { useTranslations } from 'next-intl'
import { AnimatedSection } from '@/components/ui/AnimatedSection'

export function HeroSection() {
  const t = useTranslations('hero')

  return (
    <AnimatedSection>
      <section id="hero" className="...">
        <h1>{t('title')}</h1>
      </section>
    </AnimatedSection>
  )
}
```

## 필수 규칙

- **텍스트 하드코딩 금지** → 반드시 `useTranslations()` 사용
- **색상 임의 지정 금지** → `tailwind.config`의 커스텀 팔레트만 사용
- **인라인 스타일 금지** → Tailwind 클래스 사용
- **섹션에는 `id` 속성 필수** → 앵커 링크 스크롤용

## 애니메이션 규칙

- 페이드인 등 기본 스크롤 애니메이션 → `AnimatedSection` 래퍼 사용
- 복잡한 커스텀 애니메이션만 Framer Motion 직접 사용
- `motion.div` 남용 금지

## TypeScript 규칙

- `any` 사용 금지
- Props는 반드시 interface로 정의
- `'use client'` 필요 없는 경우 Server Component로 유지

## 새 섹션 추가 시

`/section` 스킬을 사용하면 boilerplate가 자동 생성된다:

```
/section FAQ
```

→ `src/components/sections/FAQ.tsx` 생성 + messages에 키 추가
