# "requested path is invalid" 오류 해결

Google 로그인 후 `{"error":"requested path is invalid"}` 오류가 발생하는 경우 해결 방법입니다.

## 🔍 문제 원인

이 오류는 Supabase가 요청된 리디렉션 경로를 인식하지 못할 때 발생합니다. Supabase의 Redirect URLs 설정과 실제 애플리케이션의 리디렉션 경로가 일치하지 않기 때문입니다.

## 🔧 해결 방법

### 1단계: Supabase 대시보드에서 정확한 URL 설정

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe

2. **Authentication → URL Configuration**
   - 좌측 메뉴: **Authentication**
   - **URL Configuration** 탭 클릭

3. **Site URL 설정**
   ```
   https://valusophy-city.vercel.app
   ```
   ⚠️ **중요**: 끝에 슬래시(/) 없이 입력

4. **Redirect URLs 정확히 설정** (가장 중요!)
   - **Redirect URLs** 섹션에 다음 URL들을 **정확히** 추가:
   
   ```
   https://valusophy-city.vercel.app/auth/callback
   https://valusophy-city.vercel.app/**
   ```
   
   ⚠️ **주의사항**:
   - 각 URL은 별도 줄에 입력
   - 끝에 슬래시 없음
   - `https://`로 시작
   - 경로는 정확히 `/auth/callback`

5. **저장**
   - **Save** 버튼 클릭
   - 변경사항이 적용될 때까지 몇 초 대기

### 2단계: Google Cloud Console 확인

Google Cloud Console의 리디렉션 URI도 확인:

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com

2. **API 및 서비스 → 사용자 인증 정보**
   - OAuth 2.0 클라이언트 ID 클릭

3. **승인된 리디렉션 URI 확인**
   - 다음 URL이 포함되어 있는지 확인:
   ```
   https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
   ```
   - 이것은 Supabase의 callback URL이므로 **변경하지 마세요**

### 3단계: 코드 확인

애플리케이션 코드는 올바르게 설정되어 있어야 합니다:

- `lib/auth.ts`: `redirectTo: ${window.location.origin}/auth/callback`
- `app/auth/callback/route.ts`: 존재하고 올바르게 작동

### 4단계: Vercel 환경 변수 확인

Vercel 대시보드에서 환경 변수 확인:

1. **Vercel 대시보드**
   - https://vercel.com → 프로젝트 선택

2. **Settings → Environment Variables**
   - 다음 변수가 설정되어 있는지 확인:
     - `NEXT_PUBLIC_SUPABASE_URL`: `https://udekizctpsuzgmykxxhe.supabase.co`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (Supabase anon key)

3. **재배포**
   - 환경 변수를 변경했다면 재배포 필요
   - Deployments → 최신 배포 → Redeploy

## 🔄 로그인 플로우 확인

올바른 플로우:

1. 사용자가 Google 로그인 버튼 클릭
   - `https://valusophy-city.vercel.app`에서 시작

2. Supabase가 Google로 리디렉션
   - OAuth 요청 시작

3. Google 로그인 완료
   - Google이 Supabase callback으로 리디렉션:
   - `https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback`

4. Supabase가 애플리케이션으로 리디렉션
   - `https://valusophy-city.vercel.app/auth/callback?code=...`
   - ⚠️ 이 URL이 Supabase Redirect URLs에 등록되어 있어야 함

5. `/auth/callback`에서 세션 교환
   - `exchangeCodeForSession(code)` 호출

6. `/profile`로 리디렉션
   - 로그인 완료

## ⚠️ 자주 하는 실수

1. **Redirect URL에 슬래시 추가**
   - ❌ `https://valusophy-city.vercel.app/auth/callback/`
   - ✅ `https://valusophy-city.vercel.app/auth/callback`

2. **Site URL과 Redirect URL 불일치**
   - Site URL: `https://valusophy-city.vercel.app`
   - Redirect URL: `https://valusophy-city.vercel.app/auth/callback`

3. **HTTPS/HTTP 혼동**
   - 모두 `https://`여야 함 (Vercel은 HTTPS만 지원)

4. **와일드카드 미사용**
   - `https://valusophy-city.vercel.app/**`를 추가하면 모든 경로 허용

## 🧪 테스트 방법

1. **브라우저 캐시 완전 삭제**
   - Chrome: `Cmd+Shift+Delete` → 모든 항목 선택 → 삭제
   - 또는 시크릿 모드 사용

2. **https://valusophy-city.vercel.app 접속**

3. **개발자 도구 열기**
   - F12 또는 `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Console 탭 확인

4. **Google 로그인 버튼 클릭**

5. **네트워크 탭 확인**
   - Network 탭에서 리디렉션 흐름 확인
   - `/auth/callback` 요청 확인

6. **콘솔 오류 확인**
   - 오류 메시지가 있으면 기록

## 🔍 디버깅

문제가 계속되면:

1. **Supabase 로그 확인**
   - Supabase 대시보드 → Logs → Auth Logs
   - 최근 인증 시도 확인

2. **Vercel 로그 확인**
   - Vercel 대시보드 → Deployments → Functions Logs
   - `/auth/callback` 요청 로그 확인

3. **브라우저 콘솔 확인**
   - 네트워크 요청 실패 여부 확인
   - CORS 오류 여부 확인

## ✅ 체크리스트

- [ ] Supabase Site URL: `https://valusophy-city.vercel.app` (슬래시 없음)
- [ ] Supabase Redirect URLs에 `https://valusophy-city.vercel.app/auth/callback` 추가
- [ ] Supabase Redirect URLs에 `https://valusophy-city.vercel.app/**` 추가 (와일드카드)
- [ ] Google Cloud Console에 Supabase callback URL 포함
- [ ] Vercel 환경 변수 설정 확인
- [ ] 브라우저 캐시 삭제 후 테스트
- [ ] 개발자 도구에서 오류 확인

## 💡 추가 팁

### 로컬 개발도 함께 사용하려면

Redirect URLs에 로컬 URL도 추가:
```
http://localhost:3000/auth/callback
http://localhost:3000/**
```

이렇게 하면 로컬과 배포 환경 모두에서 작동합니다.

