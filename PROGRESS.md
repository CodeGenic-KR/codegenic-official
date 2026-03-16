# Codegenic 공식 홈페이지 진행 상태

## ✅ Phase 0: Claude Code 환경 세팅 — 완료

- CLAUDE.md, .claude/settings.json, rules, skills, hooks 모두 설정 완료

---

## ✅ Phase 1: 프로젝트 초기화 및 환경 세팅 — 완료

- [x] Next.js 16 프로젝트 생성 (TypeScript, Tailwind v4, ESLint, App Router)
- [x] Yarn Berry (v4.4.1) + node-modules linker 설정 (`.yarnrc.yml`)
- [x] 추가 패키지 설치: `framer-motion`, `lucide-react`, `next-intl`
- [x] Tailwind 커스텀 색상 팔레트 설정 (`globals.css` — 다크 우주/SF 테마)
- [x] `.env.local` 생성 (이메일, 인스타그램 placeholder)
- [x] `.gitignore` 업데이트 (`package-lock.json` 추가)
- [x] 프로덕션 빌드 성공 확인
- [x] GitHub 레포 연결 & 첫 커밋 (CodeGenic-KR/codegenic-official, SSH 인증)
- [x] Vercel 프로젝트 연결 (Public 레포, Hobby 플랜, 자동 배포 설정)

---

## ✅ Phase 2: 레이아웃 & 디자인 시스템

- [x] next-intl 설정 (routing.ts, request.ts, middleware.ts)
- [x] messages/ko.json, messages/en.json
- [x] `[locale]/layout.tsx` — Pretendard + Space Grotesk 폰트, SEO 메타데이터
- [x] `Button` 컴포넌트 (primary / outline)
- [x] `AnimatedSection` 컴포넌트 (Framer Motion viewport 감지)
- [x] `LanguageSwitcher` 컴포넌트 (KO / EN 전환)
- [x] 네비게이션 바 (고정 상단, blur 배경)
- [x] Footer (이메일, 인스타그램 링크)

---

## ✅ Phase 3: 섹션 콘텐츠 구현

- [x] Hero 섹션 (슬로건, CTA, 스크롤 힌트, 그라디언트 글로우)
- [x] About 섹션 (AI-First / Global / Indie Spirit 가치 카드)
- [x] Game 섹션 (우주 댕댕 수호대, CSS 그라디언트 placeholder, 특징 3가지)
- [x] Contact 섹션 (이메일 + 인스타그램)

---

## ⬜ Phase 4: SEO & 최적화

- [ ] metadata, OG 태그
- [ ] robots.txt, sitemap.xml
- [ ] Lighthouse 점수 확인

---

## ⬜ Phase 5: 도메인 연결 _(선택)_
