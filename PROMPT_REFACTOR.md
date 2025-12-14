# Claude Code Frontend Refactoring Prompt

## 현재 상황

프론트엔드 코드에 다음과 같은 문제들이 있습니다:

### 문제점

1. **중복 컴포넌트**
   - `frontend/src/UserCard.jsx` - 일반 사용자용 카드
   - `frontend/src/ExternalUserCard.jsx` - 외부 사용자용 카드
   - 두 컴포넌트가 거의 동일한 로직 (스타일만 다름)

2. **API 로직 중복**
   - `App.jsx`와 `AddUserForm.jsx`에 각각 fetch 로직 존재
   - 에러 처리가 각 컴포넌트에 흩어져 있음

3. **Props 일관성 부족**
   - `user` 객체를 직접 전달
   - 명시적인 props 정의 없음

4. **코드 구조**
   - API 호출 로직이 컴포넌트에 직접 포함
   - 재사용성 낮음

## 리팩토링 목표

### 1. 컴포넌트 통합
- `UserCard.jsx`와 `ExternalUserCard.jsx`를 하나의 `UserCard.jsx`로 통합
- `userType` prop을 받아서 스타일 분기 처리
- Props 명시적으로 정의

**기대 결과:**
```jsx
// 통합된 UserCard
<UserCard
  id={user.id}
  username={user.username}
  email={user.email}
  userType={user.user_type}
/>
```

### 2. API 로직 분리
- `frontend/src/api/users.js` 파일 생성
- 모든 API 호출을 이 파일로 분리
- `fetchUsers()`, `createUser()` 등의 함수로 캡슐화

**기대 결과:**
```javascript
// api/users.js
export async function fetchUsers() { ... }
export async function createUser(userData) { ... }
```

### 3. Props 일관성 & 명시성
- 모든 컴포넌트에서 명시적인 props destructuring
- Props 타입 주석 (JSDoc 또는 PropTypes)

**기대 결과:**
```jsx
/**
 * @param {Object} props
 * @param {number} props.id
 * @param {string} props.username
 * @param {string} props.email
 * @param {number} props.userType - 0: regular, 1: external
 */
export default function UserCard({ id, username, email, userType }) {
  // ...
}
```

### 4. 파일 구조 개선
```
frontend/src/
  api/
    users.js          # API 로직 분리
  components/
    UserCard.jsx      # 통합된 카드 컴포넌트
    AddUserForm.jsx
  App.jsx
```

## 구체적 요구사항

### UserCard.jsx 통합
- [ ] `ExternalUserCard.jsx` 삭제
- [ ] `UserCard.jsx`에 `userType` prop 추가
- [ ] `userType`에 따라 스타일 분기:
  - `userType === 0`: 녹색 테마 (Regular User)
  - `userType === 1`: 주황색 테마 (External User)
- [ ] Props 명시적 destructuring

### API 로직 분리 (api/users.js)
- [ ] `frontend/src/api/` 폴더 생성
- [ ] `fetchUsers()` 함수 - GET /api/users
- [ ] `createUser({ username, email, userType })` 함수 - POST /api/users
- [ ] 에러 처리 포함
- [ ] API base URL 상수화

### App.jsx 수정
- [ ] API 로직을 `api/users.js`에서 import
- [ ] 통합된 `UserCard` 컴포넌트만 사용
- [ ] 조건부 렌더링 제거 (UserCard가 userType 처리)

### AddUserForm.jsx 수정
- [ ] API 로직을 `api/users.js`에서 import
- [ ] fetch 로직 제거, `createUser()` 호출로 대체

## 성과 지표

리팩토링 후 다음 항목을 측정하여 보고:

1. **파일 개수 감소**
   - Before: 컴포넌트 3개 (App, UserCard, ExternalUserCard)
   - After: 컴포넌트 2개 + API 파일 1개

2. **코드 중복 제거**
   - 중복된 fetch 로직 → 단일 API 함수
   - 중복된 카드 컴포넌트 → 통합 컴포넌트

3. **재사용성 향상**
   - API 함수는 어디서든 import 가능
   - UserCard는 userType만 바꿔서 재사용

4. **유지보수성**
   - API 엔드포인트 변경 시 한 곳만 수정
   - 컴포넌트 스타일 변경 시 한 곳만 수정

## 결과 문서

리팩토링 완료 후 `REFACTOR_REPORT.md` 생성:
- Before/After 코드 비교
- 파일 개수/LOC 변화
- 개선 사항 요약
- 추가 개선 제안

---

**이 프롬프트를 Claude Code에 제공하여 리팩토링을 진행하세요!**
