# Codegenic 공식 홈페이지 개발 계획

## 프로젝트 개요

Codegenic은 AI를 활용해 게임을 만드는 1인 개발사 (2026년 3월 개인사업자 등록).
첫 게임 **"우주 댕댕 수호대: 디펜스 (Cosmic Daeng Guardians)"** 를 2026년 11월 출시 예정.
SBA 지원을 통해 개발 중이며, **"AI 네이티브 게임사"** 로 포지셔닝.

### 홈페이지에 포함할 콘텐츠
- 회사 소개 (AI 네이티브 게임사 Codegenic)
- 인스타그램 링크 _(추후 추가)_
- 이메일 링크 _(추후 추가)_
- 출시 예정 게임 소개 (우주 댕댕 수호대, 2026년 11월)

---

## 기술 스택

| 항목 | 선택 | 이유 |
|------|------|------|
| 프레임워크 | **Next.js 15 (App Router)** | SEO, Vercel 배포 최적, 향후 확장성 |
| 언어 | **TypeScript** | 안전한 타입 관리 |
| 스타일링 | **Tailwind CSS v4** | 빠른 개발, 유지보수 쉬움 |
| 애니메이션 | **Framer Motion** | 게임사다운 인터랙션 |
| i18n | **next-intl** | Next.js App Router 네이티브, 한/영 이중 언어 |
| 배포 | **Vercel** | 무료 티어, GitHub 연동 자동 CI/CD |
| 폰트 | **Pretendard (KO) + Space Grotesk (EN)** | 모던하고 게임스러운 느낌 |

- **다국어 구조:** `next-intl` 기반 라우트 분리 (`/ko`, `/en`) + 언어 전환 버튼
- **디자인 방향:** 다크 테마 + 우주/SF 감성 (딥 네이비, 퍼플, 시안 계열)

---

## 폴더 구조

```
codegenic-official/
├── CLAUDE.md                       # Claude Code 프로젝트 규칙서 (자동 로드)
├── PLAN.md                         # 개발 계획 (이 파일)
├── .claude/
│   ├── settings.json               # Hooks 자동화 설정
│   ├── rules/
│   │   ├── i18n.md                 # messages/ 파일 작업 시 자동 적용 규칙
│   │   └── components.md           # src/components/ 작업 시 자동 적용 규칙
│   ├── skills/
│   │   ├── translate/SKILL.md      # /translate 커맨드
│   │   ├── section/SKILL.md        # /section 커맨드
│   │   └── deploy-check/SKILL.md   # /deploy-check 커맨드
│   └── hooks/
│       ├── prettier-format.sh      # 파일 저장 후 자동 포맷
│       ├── i18n-sync-check.sh      # ko/en 키 불일치 경고
│       └── tsc-check.sh            # git commit 전 타입 체크
├── src/
│   ├── app/
│   │   └── [locale]/               # /ko, /en 동적 라우트
│   │       ├── layout.tsx
│   │       └── page.tsx
│   ├── components/
│   │   ├── sections/               # Hero, About, Game, Contact
│   │   └── ui/                     # Button, Badge, LanguageSwitcher, AnimatedSection
│   ├── i18n/
│   │   ├── routing.ts              # 지원 언어 설정
│   │   └── request.ts
│   ├── messages/
│   │   ├── ko.json                 # 한국어 텍스트 (기준)
│   │   └── en.json                 # 영어 텍스트
│   └── lib/
│       └── constants.ts            # SNS 링크, 이메일 등 설정값
├── public/
└── .env.local                      # 환경변수 (이메일, 인스타 URL 등)
```

---

## 커스텀 스킬 (Claude Code)

| 스킬 | 동작 |
|------|------|
| `/translate <key> "<ko>" "<en>"` | `ko.json` + `en.json` 동시 추가 |
| `/section <ComponentName>` | 섹션 컴포넌트 boilerplate 자동 생성 |
| `/deploy-check` | Vercel 배포 상태 및 URL 확인 |
| `/commit` | 커밋 메시지 3안 제안 후 push |

## Hooks 자동화 (`.claude/settings.json`)

| 시점 | 동작 |
|------|------|
| 파일 편집/저장 후 | Prettier 자동 포맷 (`.ts` `.tsx` `.json` 등) |
| `messages/*.json` 편집 후 | `ko.json` ↔ `en.json` 키 불일치 경고 |
| `git commit` 실행 전 | `tsc --noEmit` 타입 오류 시 커밋 차단 |

---

## 작업 순서 (Phase별)

### ✅ Phase 0: Claude Code 환경 세팅
> **완료** — Claude Code 프로젝트 설정 완료

- [x] `CLAUDE.md` 생성 (프로젝트 규칙서)
- [x] `.claude/settings.json` — Hooks 설정
- [x] `.claude/rules/i18n.md` — i18n 경로별 규칙
- [x] `.claude/rules/components.md` — 컴포넌트 경로별 규칙
- [x] `.claude/skills/translate/SKILL.md`
- [x] `.claude/skills/section/SKILL.md`
- [x] `.claude/skills/deploy-check/SKILL.md`
- [x] `.claude/hooks/prettier-format.sh`
- [x] `.claude/hooks/i18n-sync-check.sh`
- [x] `.claude/hooks/tsc-check.sh`

---

### ⬜ Phase 1: 프로젝트 초기화 및 환경 세팅
> **목표:** 개발 환경 완성 + 첫 커밋 + Vercel 배포 연결

1. Next.js 프로젝트 생성
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```
2. 추가 패키지 설치
   ```bash
   npm install framer-motion lucide-react next-intl
   ```
3. Tailwind 커스텀 색상 팔레트 설정
4. `.env.local` 생성 (이메일, 인스타 URL — 현재 placeholder)
5. GitHub 레포 연결 & 첫 커밋
6. Vercel 프로젝트 연결 (GitHub push → 자동 배포)

**완료 기준:** `vercel.app` 주소로 빈 페이지가 접속됨

---

### ⬜ Phase 2: 레이아웃 & 디자인 시스템
> **목표:** 전체 페이지의 뼈대와 공용 컴포넌트 완성

1. `layout.tsx` — 글로벌 폰트, SEO 메타데이터, 기본 배경
2. 공용 컴포넌트
   - `Button` — CTA 버튼 (primary / outline)
   - `AnimatedSection` — Framer Motion 페이드인 래퍼
   - `LanguageSwitcher` — KO / EN 전환 버튼
3. 네비게이션 바 (로고 + 앵커 링크 + 언어 전환)
4. Footer (copyright + 링크 모음)

---

### ⬜ Phase 3: 섹션 콘텐츠 구현
> **목표:** 실제 보여줄 내용 전체 구현 (한/영 이중 언어)

#### 3-1. Hero 섹션
- 슬로건: "AI로 게임을 만드는 회사, Codegenic"
- 회사 한 줄 설명
- CTA 버튼 → 게임 섹션으로 스크롤

#### 3-2. About 섹션
- Codegenic 소개: AI 네이티브 게임사, Claude Code 활용, 1인 개발
- 핵심 가치 3가지 카드 (AI-First / Global / Indie Spirit)

#### 3-3. Game 섹션
- 게임명: 우주 댕댕 수호대: 디펜스 (Cosmic Daeng Guardians)
- 장르: 하이브리드 캐주얼 (방치형 + 디펜스 + 수집형 RPG)
- 플랫폼: iOS / Android
- "Coming November 2026" 배지
- 주요 특징: 디펜스, 가챠 수집, 우주산책(방치) 시스템
- 게임 이미지: **CSS 그라디언트 placeholder** (추후 실제 이미지로 교체)

#### 3-4. Contact 섹션
- 이메일 아이콘 + 링크
- 인스타그램 아이콘 + 링크
- 문구: "협업 및 문의는 언제든지 환영합니다"

---

### ⬜ Phase 4: SEO & 최적화
> **목표:** 검색엔진 노출 준비 + 퍼포먼스 최적화

1. `metadata` 설정 (title, description, keywords)
2. Open Graph 태그 (SNS 공유 시 미리보기)
3. `robots.txt`, `sitemap.xml`
4. 이미지 최적화 (`next/image` 사용)
5. Lighthouse 점수 확인 (목표: Performance 90+)

---

### ⬜ Phase 5: 도메인 연결 _(선택, 향후)_
- `codegenic.io` 또는 `codegenic.kr` 등 도메인 구매 후 Vercel에 연결

---

## 나중에 채워야 할 정보

| 항목 | 상태 | 비고 |
|------|------|------|
| 인스타그램 URL | 추후 추가 | placeholder 버튼으로 처리 |
| 이메일 주소 | 추후 추가 | placeholder로 처리 |
| 게임 이미지/스크린샷 | 없음 | CSS 그라디언트로 대체 |
| 회사 로고 | 없음 | 텍스트 로고로 대체 |
| OG 이미지 | Phase 4에서 생성 | 텍스트 기반으로 제작 |

---

## 검증 방법

1. `npm run dev` → `localhost:3000` 에서 전체 섹션 확인
2. `/ko`, `/en` 라우트 전환 정상 동작 확인
3. Vercel 배포 → 실제 URL로 모바일/PC 반응형 확인
4. PageSpeed Insights로 성능 점수 측정
5. SNS에 URL 공유 시 OG 미리보기 정상 출력 여부 확인
