# Codegenic 공식 홈페이지

AI를 활용해 게임을 만드는 회사 Codegenic의 공식 홈페이지 레포지토리.

## 프로젝트 개요

- **프레임워크:** Next.js 15 (App Router)
- **언어:** TypeScript
- **패키지 매니저:** Yarn Berry (Yarn v2+) — `npm` 사용 금지
- **스타일링:** Tailwind CSS v4
- **애니메이션:** Framer Motion
- **다국어:** next-intl (한국어 `/ko`, 영어 `/en`)
- **배포:** Vercel (GitHub push → 자동 배포)

## 개발 명령어

```bash
yarn dev         # 개발 서버 (localhost:3000)
yarn build       # 프로덕션 빌드
yarn lint        # ESLint 검사
yarn dlx tsc --noEmit  # TypeScript 타입 체크
```

## 디렉토리 구조

```
src/
├── app/[locale]/          # 다국어 라우트 (/ko, /en)
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── sections/          # 페이지 섹션 컴포넌트
│   └── ui/                # 공용 UI 컴포넌트
├── i18n/
│   ├── routing.ts         # 지원 언어 목록 및 기본 언어
│   └── request.ts
├── messages/
│   ├── ko.json            # 한국어 텍스트 (기준)
│   └── en.json            # 영어 텍스트
└── lib/
    └── constants.ts       # SNS 링크, 이메일 등 설정값
```

## i18n 규칙

- 컴포넌트에 텍스트를 **절대 하드코딩하지 않는다**
- 모든 텍스트는 `useTranslations()` 훅으로 가져온다
- 새 텍스트 추가 시 `ko.json`과 `en.json` **양쪽에 동시** 추가
- 키는 반드시 `섹션명.항목명` 형태의 dot notation 사용
- `/translate` 스킬로 간편하게 추가 가능

```tsx
// ✅ 올바른 방법
const t = useTranslations('hero')
<h1>{t('title')}</h1>

// ❌ 하드코딩 금지
<h1>AI로 게임을 만드는 회사</h1>
```

## 컴포넌트 규칙

- 섹션 컴포넌트는 `src/components/sections/` 위치
- 공용 UI는 `src/components/ui/` 위치
- 스크롤 시 나타나는 애니메이션은 `AnimatedSection` 래퍼 재사용
- `/section` 스킬로 새 섹션 boilerplate 자동 생성 가능

## 디자인 토큰

- **테마:** 다크 고정 (라이트 모드 없음)
- **색상:** `tailwind.config`의 커스텀 팔레트만 사용 (임의 hex 금지)
- **폰트:** Pretendard (한국어), Space Grotesk (영어/숫자)
- **애니메이션:** Framer Motion, `AnimatedSection` 컴포넌트 우선 활용

## 커스텀 스킬

| 스킬                             | 설명                              |
| -------------------------------- | --------------------------------- |
| `/translate <key> "<ko>" "<en>"` | ko.json + en.json 동시 추가       |
| `/section <ComponentName>`       | 새 섹션 컴포넌트 boilerplate 생성 |
| `/deploy-check`                  | Vercel 배포 상태 및 URL 확인      |
| `/commit`                        | 커밋 메시지 제안 + push           |

## 주의사항

- 인스타그램 URL, 이메일은 현재 placeholder (`src/lib/constants.ts`)
- 게임 이미지 없음 → CSS 그라디언트로 대체 (추후 교체 예정)
- OG 이미지는 Phase 4에서 추가 예정

## Claude Code 설정 레퍼런스

스킬, 훅, 에이전트, 규칙 파일 작성 시 포맷 가이드:

@.claude/references/index.md
