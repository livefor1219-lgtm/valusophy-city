# OAuth 리다이렉트 오류 반복 발생 원인 분석

## 🔴 문제 증상

```
{"error":"requested path is invalid"}
```

이 오류가 반복적으로 발생하는 이유를 설명합니다.

## 🔍 근본 원인

### 1. **URL 불일치 문제**

현재 코드 (`lib/auth.ts`):
```typescript
redirectTo: `${window.location.origin}/auth/callback`
```

**문제점:**
- `window.location.origin`은 브라우저에서 동적으로 결정됩니다
- 로컬 개발: `http://localhost:3000`
- Vercel 배포: `https://valusophy-city.vercel.app`
- Supabase는 **명시적으로 등록된 Redirect URL만** 허용합니다

### 2. **Supabase 검증 로직**

Supabase는 OAuth 리다이렉트 시 다음을 확인합니다:
1. `redirectTo` 파라미터로 전달된 URL
2. Supabase Dashboard의 **Redirect URLs** 목록
3. **정확히 일치**해야만 허용 (부분 일치 불가)

### 3. **설정 누락 가능성**

Supabase Dashboard에서 다음이 설정되지 않았을 수 있습니다:
- `https://valusophy-city.vercel.app/auth/callback` (정확한 경로)
- 또는 와일드카드: `https://valusophy-city.vercel.app/**`

## 🔄 반복되는 이유

1. **환경 변수 미사용**: 하드코딩된 `window.location.origin` 사용
2. **설정 불일치**: 코드와 Supabase 설정이 자동으로 동기화되지 않음
3. **캐시 문제**: Supabase 설정 변경 후 즉시 반영되지 않을 수 있음
4. **다중 환경**: 로컬/프로덕션 환경에서 다른 URL 사용

## ✅ 해결 방법

### 방법 1: 환경 변수 사용 (권장)

1. **환경 변수 설정**
   - `.env.local` (로컬):
     ```
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     ```
   - Vercel 환경 변수:
     ```
     NEXT_PUBLIC_SITE_URL=https://valusophy-city.vercel.app
     ```

2. **코드 수정** (`lib/auth.ts`):
   ```typescript
   redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`
   ```

3. **Supabase 설정**
   - Site URL: `https://valusophy-city.vercel.app`
   - Redirect URLs:
     - `https://valusophy-city.vercel.app/auth/callback`
     - `http://localhost:3000/auth/callback` (로컬 개발용)

### 방법 2: 직접 URL 하드코딩 (간단하지만 덜 유연함)

```typescript
redirectTo: 'https://valusophy-city.vercel.app/auth/callback'
```

## 📋 체크리스트

### Supabase Dashboard 확인

1. **Authentication → URL Configuration**
   - [ ] Site URL: `https://valusophy-city.vercel.app` (슬래시 없음)
   - [ ] Redirect URLs에 다음이 포함되어 있는지:
     - [ ] `https://valusophy-city.vercel.app/auth/callback`
     - [ ] `https://valusophy-city.vercel.app/**` (와일드카드)

2. **Authentication → Providers → Google**
   - [ ] Google Provider가 **Enabled** 상태
   - [ ] Client ID와 Client Secret이 올바르게 설정됨

### Google Cloud Console 확인

1. **API 및 서비스 → 사용자 인증 정보**
   - [ ] OAuth 클라이언트 ID가 생성되어 있음
   - [ ] **승인된 리디렉션 URI**에 다음이 포함:
     - [ ] `https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback`

### Vercel 환경 변수 확인

1. **Project Settings → Environment Variables**
   - [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정됨
   - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정됨
   - [ ] `NEXT_PUBLIC_SITE_URL` 설정됨 (선택사항, 권장)

## 🛠️ 즉시 해결 단계

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
   - Authentication → URL Configuration

2. **Redirect URLs에 다음 추가** (한 줄씩):
   ```
   https://valusophy-city.vercel.app/auth/callback
   https://valusophy-city.vercel.app/**
   ```

3. **Save 클릭**

4. **5-10초 대기** (설정 적용 시간)

5. **브라우저 캐시 삭제 후 재시도**

## 🔒 예방 방법

### 코드 개선

환경 변수를 사용하여 명확하게 설정:

```typescript
// lib/auth.ts
export async function signInWithGoogle() {
  const supabase = createBrowserClient();
  
  // 환경 변수 우선, 없으면 window.location.origin 사용
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  (typeof window !== 'undefined' ? window.location.origin : '');
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${siteUrl}/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
```

### 문서화

- 모든 환경의 Redirect URL을 문서에 명시
- 새 환경 추가 시 Supabase 설정 업데이트 필수

## 📝 참고사항

- Supabase는 **대소문자를 구분**합니다
- **슬래시(/) 위치**가 중요합니다
- **프로토콜 (http/https)**이 정확해야 합니다
- 설정 변경 후 **몇 초에서 몇 분** 걸릴 수 있습니다

