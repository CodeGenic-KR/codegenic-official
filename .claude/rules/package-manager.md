# 패키지 매니저 규칙

이 프로젝트는 **Yarn Berry (Yarn v2+)** 를 패키지 매니저로 사용한다.

## 필수 규칙

- `npm` 명령어 사용 금지 → 반드시 `yarn` 사용
- `npx` 대신 `yarn dlx` 사용
- `package-lock.json` 생성 금지 (`.gitignore`에 추가)
- `yarn.lock` 파일을 항상 커밋에 포함

## 주요 명령어 대응표

| npm                    | yarn berry          |
| ---------------------- | ------------------- |
| `npm install`          | `yarn install`      |
| `npm install <pkg>`    | `yarn add <pkg>`    |
| `npm install -D <pkg>` | `yarn add -D <pkg>` |
| `npm uninstall <pkg>`  | `yarn remove <pkg>` |
| `npm run <script>`     | `yarn <script>`     |
| `npx <cmd>`            | `yarn dlx <cmd>`    |
| `npm init`             | `yarn init`         |

## 초기 세팅 방법

```bash
# yarn berry 활성화 (프로젝트 최초 1회)
yarn set version berry

# 패키지 설치
yarn install
```

## .yarnrc.yml 기본 설정

```yaml
nodeLinker: node-modules
```

> Plug'n'Play(PnP)는 Next.js와 호환성 이슈가 있을 수 있으므로 `node-modules` linker를 사용한다.
