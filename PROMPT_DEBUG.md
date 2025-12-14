# Claude Code Debugging Prompt

## 상황 설명

프론트엔드에서 사용자 추가 API를 호출하면 계속 실패합니다.
백엔드 코드와 프론트엔드 코드만 봐서는 무엇이 문제인지 알기 어렵습니다.

**주어진 파일:**
- `backend/src/routes.js` - Backend API code (서버는 실행하지 않음)
- `backend/schema.sql` - DDL file
- `frontend/src/AddUserForm.jsx` - Form that makes API call
- `.env` - Database connection info

## 요청사항

1. **`backend/src/db.js` 파일을 생성하세요**
   - MySQL 데이터베이스에 연결
   - 테이블 스키마 정보를 조회하는 함수 작성
   - 특히 `users` 테이블의 `user_type` 컬럼 정보 조회
   - COMMENT에서 enum 값 설명 읽어오기

2. **DB 스키마 정보를 기반으로 문제 진단**
   - `user_type` 컬럼이 실제로 어떤 값을 기대하는지 확인
   - DDL의 COMMENT를 읽어서 enum 값의 의미 파악
   - 0 = 어떤 사용자, 1 = 어떤 사용자

3. **프론트엔드 코드 수정**
   - `frontend/src/AddUserForm.jsx` 수정
   - API 호출 시 올바른 `user_type` 값 전송
   - "internal" → 0, "external" → 1 변환 로직 추가

4. **검증**
   - 수정된 코드가 올바르게 동작하는지 설명
   - 어떤 부분이 문제였고 어떻게 해결했는지 문서화

## 핵심 포인트

- **서버를 실행하지 않고** DB 스키마만 조회하여 문제 파악
- **DDL의 COMMENT**에서 enum 값 의미 확인
- 백엔드 코드를 보면 `user_type`을 받지만, 구체적인 값은 알 수 없음
- 프론트엔드 코드를 보면 "internal", "external" 문자열을 보내고 있음
- **이 불일치를 db.js를 통한 DB 스키마 조회로 해결**

## 기대 결과

1. `backend/src/db.js` 파일 생성
   ```javascript
   // DB 연결 및 스키마 조회 함수
   export async function getTableSchema(tableName) {
     // INFORMATION_SCHEMA를 사용하여 컬럼 정보 조회
     // COMMENT 포함
   }
   ```

2. `frontend/src/AddUserForm.jsx` 수정
   ```javascript
   // Before: user_type: userType ("internal" or "external")
   // After: user_type: userType === "internal" ? 0 : 1
   ```

3. 문제 분석 문서 (`DEBUG_REPORT.md`)
   - 문제 원인: API 파라미터 불일치
   - 발견 방법: DB 스키마 COMMENT 조회
   - 해결 방법: 프론트엔드에서 값 변환

## 주의사항

- 백엔드 서버를 실행하지 마세요 (코드만 분석)
- DB에 직접 연결하여 스키마 정보만 읽으세요
- DDL의 COMMENT가 유일한 단서입니다:
  ```sql
  user_type TINYINT NOT NULL COMMENT '0: regular user, 1: external user'
  ```

이 프롬프트를 Claude Code에 제공하여 디버깅을 진행하세요!
