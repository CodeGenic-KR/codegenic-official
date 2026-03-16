---
name: deploy-check
description: Vercel 최신 배포 상태, URL, 빌드 로그를 확인합니다
user-invocable: true
---

Vercel 배포 상태를 확인합니다.

## 수행할 작업

### 1단계: Vercel CLI 확인
```bash
vercel --version
```
CLI가 없으면 설치 안내 후 중단합니다:
```
npm i -g vercel
vercel login
```

### 2단계: 최근 배포 목록 확인
```bash
vercel ls --limit 5
```
최근 5개 배포의 상태(Ready / Error / Building)와 URL을 보여줍니다.

### 3단계: 최신 배포 상세 확인
최신 배포 URL을 가져와서:
```bash
vercel inspect <latest-deployment-url>
```
다음 정보를 요약해서 출력합니다:
- 배포 상태 (Ready / Error)
- 배포 URL
- 배포 시각
- 빌드 시간
- 에러가 있으면 에러 내용

### 4단계: 결과 요약
```
✅ 배포 상태: Ready
🌐 URL: https://codegenic-official-xxx.vercel.app
⏱️  배포 시각: 2026-03-15 14:30
🔨 빌드 시간: 45초
```
