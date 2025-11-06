# 무한 로딩 문제 해결 가이드

## 🔴 문제 증상

프로필 페이지와 프로젝트 페이지에서 로딩이 끝나지 않고 계속 "로딩 중..."이 표시되는 문제

## 🔍 원인 분석

### 1. **타임아웃 부재**
- API 호출이나 데이터베이스 쿼리가 실패하거나 응답이 없을 때 무한 대기
- 네트워크 오류나 Supabase 연결 문제 시 로딩이 끝나지 않음

### 2. **에러 처리 부족**
- `getUser()` 호출 실패 시 로딩 상태가 업데이트되지 않음
- `resident` 조회 실패 시에도 로딩이 계속됨
- 예외가 발생해도 `finally` 블록이 실행되지 않는 경우

### 3. **비동기 작업 관리 문제**
- 여러 비동기 작업이 동시에 실행되면서 상태가 꼬임
- `onAuthStateChange`와 `getUser()`가 동시에 실행되면서 충돌

### 4. **로딩 상태 중복 관리**
- `loadProjects`가 `setLoading(true)`를 호출하지만, 이미 로딩 상태인 경우 중복
- 컴포넌트 언마운트 후에도 상태 업데이트 시도

## ✅ 해결 방법

### 1. **타임아웃 추가**

#### 프로필 페이지
- 10초 타임아웃 설정
- 타임아웃 시 강제로 로딩 종료
- 모든 비동기 작업 완료 시 타임아웃 클리어

#### 프로젝트 페이지
- 10초 타임아웃 설정
- `loadProjects` 완료 시 타임아웃 클리어

#### PostList 컴포넌트
- 5초 타임아웃 설정 (AbortController 사용)
- 타임아웃 시 에러 메시지 표시

### 2. **에러 처리 개선**

#### 프로필 페이지
- `getUser()` 에러 시 즉시 로딩 종료
- `resident` 조회 실패해도 계속 진행 (resident가 없는 경우 정상)
- 모든 에러 경로에서 `setLoading(false)` 보장

#### 프로젝트 페이지
- `loadProjects` 에러 시 빈 배열로 설정
- 에러 발생해도 로딩 종료 보장

#### PostList 컴포넌트
- fetch 에러 시 빈 배열로 설정
- 타임아웃 에러와 일반 에러 구분
- 에러 메시지 표시

### 3. **로딩 상태 관리 개선**

#### 프로필 페이지
- `mounted` 플래그로 언마운트 후 상태 업데이트 방지
- 모든 비동기 작업 완료 시 타임아웃 클리어
- `onAuthStateChange`에서도 타임아웃 관리

#### 프로젝트 페이지
- `loadProjects` 완료 시 타임아웃 클리어
- `useEffect` cleanup에서 타임아웃 클리어

### 4. **코드 개선 사항**

#### 타임아웃 패턴
```typescript
// 타임아웃 설정
const timeoutId = setTimeout(() => {
  console.warn('Loading timeout - forcing completion');
  setLoading(false);
}, 10000);

// 작업 완료 시 클리어
clearTimeout(timeoutId);
```

#### 에러 처리 패턴
```typescript
try {
  // 작업 수행
} catch (error) {
  console.error('Error:', error);
  // 에러 발생 시에도 로딩 종료
  setLoading(false);
} finally {
  // 항상 로딩 종료 보장
  setLoading(false);
}
```

#### AbortController 패턴 (PostList)
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 5000);

try {
  const response = await fetch(url, { signal: controller.signal });
  clearTimeout(timeoutId);
  // 처리
} catch (error) {
  clearTimeout(timeoutId);
  if (error.name === 'AbortError') {
    // 타임아웃 처리
  }
}
```

## 📋 수정된 파일

1. **`app/profile/page.tsx`**
   - 10초 타임아웃 추가
   - 에러 처리 개선
   - `resident` 조회 실패해도 계속 진행

2. **`app/projects/page.tsx`**
   - 10초 타임아웃 추가
   - `loadProjects` 완료 시 타임아웃 클리어
   - 에러 처리 개선

3. **`components/PostList.tsx`**
   - 5초 타임아웃 추가 (AbortController)
   - 에러 발생 시 빈 배열로 설정
   - 에러 메시지 개선

## 🧪 테스트 방법

1. **정상 케이스**
   - 프로필/프로젝트 페이지 접속
   - 로딩이 빠르게 종료되고 콘텐츠 표시

2. **에러 케이스**
   - 네트워크 오류 시뮬레이션 (개발자 도구 → Network → Offline)
   - 10초 이내에 로딩 종료 확인

3. **타임아웃 케이스**
   - 느린 네트워크 시뮬레이션
   - 10초 후 자동으로 로딩 종료 확인

## ⚠️ 주의사항

1. **타임아웃 시간 조정**
   - 현재: 프로필/프로젝트 10초, PostList 5초
   - 필요 시 환경에 맞게 조정 가능

2. **에러 메시지**
   - 콘솔에 에러 로그 출력
   - 사용자에게는 적절한 메시지 표시

3. **성능 최적화**
   - 타임아웃이 너무 짧으면 정상적인 느린 응답도 실패할 수 있음
   - 타임아웃이 너무 길면 사용자 경험이 나빠짐

## 🔄 추가 개선 사항

1. **로딩 인디케이터 개선**
   - 진행률 표시
   - 타임아웃 경고 메시지

2. **재시도 메커니즘**
   - 실패 시 자동 재시도
   - 재시도 횟수 제한

3. **오프라인 처리**
   - 오프라인 상태 감지
   - 적절한 메시지 표시

