# 로딩 최적화 가이드

## 🔍 로딩이 걸리는 주요 원인

### 1. **Supabase 쿼리 지연**
- 네트워크 지연 (특히 해외 서버)
- 복잡한 JOIN 쿼리 (project_members + residents)
- 인덱스 부족으로 인한 느린 쿼리

### 2. **순차적 데이터 로딩**
```typescript
// 현재: 순차적 로딩
await getUser() → await getResident() → await loadPosts()
// 각각 1-2초씩 걸리면 총 3-6초
```

### 3. **불필요한 재렌더링**
- `onAuthStateChange`가 너무 자주 트리거됨
- 상태 업데이트가 연쇄적으로 발생

### 4. **타임아웃이 너무 김**
- 10초는 사용자 경험에 좋지 않음
- 더 빠른 피드백 필요

## ✅ 개선 방안

### 1. **병렬 로딩 (Parallel Loading)**
```typescript
// 개선: 병렬 로딩
const [user, resident, posts] = await Promise.all([
  getUser(),
  getResident(),
  loadPosts()
]);
// 가장 느린 것만 기다리면 됨 (1-2초)
```

### 2. **Suspense + Streaming**
```typescript
// React Suspense로 점진적 로딩
<Suspense fallback={<Skeleton />}>
  <UserProfile />
</Suspense>
<Suspense fallback={<Skeleton />}>
  <PostList />
</Suspense>
```

### 3. **캐싱 전략**
- Supabase 쿼리 결과 캐싱
- React Query 또는 SWR 사용

### 4. **타임아웃 단축**
- 10초 → 5초로 단축
- 더 빠른 에러 피드백

### 5. **로딩 상태 세분화**
```typescript
// 전체 로딩 대신 부분 로딩
const [userLoading, setUserLoading] = useState(true);
const [postsLoading, setPostsLoading] = useState(true);
// 각각 독립적으로 관리
```

## 🚀 즉시 적용 가능한 개선

### 프로필 페이지 최적화
- `getUser()`와 `getResident()` 병렬 실행
- 타임아웃 5초로 단축
- Suspense 경계 추가

### 프로젝트 페이지 최적화
- 복잡한 JOIN 쿼리 최적화
- 인덱스 추가 (project_id, resident_id)
- 페이지네이션 추가

