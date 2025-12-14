# Claude Code Demo - Frontend Debugging & Refactoring

Claude Code를 사용한 프론트엔드 디버깅 및 리팩토링 시연 프로젝트

## 프로젝트 구조

```
root/
  backend/          # 백엔드 (모든 브랜치 공통, 간단한 API)
    src/
      server.js
      routes.js
    schema.sql      # DDL (중요: COMMENT에만 enum 설명!)
    package.json
    .env
  frontend/         # 프론트엔드 (브랜치별로 다름)
    src/
      App.jsx
      (기타 컴포넌트)
```

## 브랜치 구조

### `main`
- 기본 템플릿 코드
- Backend + Frontend scaffolding

### `demo/broken-frontend`
**문제가 있는 프론트엔드**

1. **API 파라미터 오류**
   - 백엔드는 `user_type: 0 또는 1` 기대
   - 프론트엔드는 `user_type: "internal" 또는 "external"` 전송
   - 결과: API 호출 실패

2. **DB Enum 값 불명확**
   - DDL의 COMMENT에만 설명: `'0: regular user, 1: external user'`
   - 프론트엔드/백엔드 코드만 봐서는 알 수 없음

3. **중복 컴포넌트**
   - `UserCard.jsx`, `ExternalUserCard.jsx` 등 중복
   - Props 네이밍 불일치

### `demo/debug-with-dbjs`
**디버깅 프롬프트 제공 (실제 코드 없음)**

- `PROMPT_DEBUG.md` 파일만 존재
- Claude에게 제공할 프롬프트:
  - 백엔드 코드만 제공 (서버 실행 안 함)
  - `db.js` 파일을 만들어 DB 스키마 조회
  - COMMENT에서 enum 값 확인
  - 프론트엔드 API 호출 수정

### `demo/refactor-frontend`
**리팩토링 프롬프트 제공 (실제 코드 없음)**

- `PROMPT_REFACTOR.md` 파일만 존재
- Claude에게 제공할 프롬프트:
  - 중복 컴포넌트 통합
  - Props 네이밍 일관성
  - API 로직 분리

## 시연 흐름

1. `demo/broken-frontend` - 문제 상황 보여주기
2. `demo/debug-with-dbjs` - 프롬프트로 디버깅
3. `demo/refactor-frontend` - 프롬프트로 리팩토링

## 실행 방법

```bash
# Backend
cd backend
npm install
npm run dev  # http://localhost:5000

# Frontend (별도 터미널)
cd frontend
npm install
npm run dev  # http://localhost:5173

# DB 설정
mysql -u root -p < backend/schema.sql
```
