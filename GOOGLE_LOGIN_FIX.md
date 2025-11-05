# Google 로그인 "requested path is invalid" 오류 해결

## 🔧 즉시 해결 방법

### Supabase 대시보드 설정

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
   - 또는 https://supabase.com/dashboard → 프로젝트 선택

2. **Authentication → URL Configuration**
   - 좌측 메뉴: **Authentication**
   - **URL Configuration** 탭 클릭

3. **Site URL 설정**
   ```
   https://valusophy-city.vercel.app
   ```
   ⚠️ **끝에 슬래시(/) 없이 입력**

4. **Redirect URLs 추가** (가장 중요!)
   - **Redirect URLs** 섹션에 다음을 **정확히** 추가:
   
   ```
   https://valusophy-city.vercel.app/auth/callback
   ```
   
   그리고 와일드카드도 추가:
   
   ```
   https://valusophy-city.vercel.app/**
   ```
   
   ⚠️ **주의사항**:
   - 각 URL은 별도 줄에 입력
   - 끝에 슬래시 없음
   - `https://`로 시작
   - 정확히 복사-붙여넣기

5. **저장**
   - **Save** 버튼 클릭
   - 저장 후 **몇 초 기다리기** (설정이 적용되는 시간)

### 확인 사항

- ✅ Site URL: `https://valusophy-city.vercel.app` (슬래시 없음)
- ✅ Redirect URLs에 `https://valusophy-city.vercel.app/auth/callback` 포함
- ✅ Redirect URLs에 `https://valusophy-city.vercel.app/**` 포함 (와일드카드)

### 테스트

1. 브라우저 캐시 삭제 (Cmd+Shift+Delete)
2. 시크릿 모드에서 테스트
3. https://valusophy-city.vercel.app 접속
4. Google 로그인 버튼 클릭

## 📸 스크린샷 가이드

Supabase 대시보드에서 확인할 위치:

```
Authentication
  └─ URL Configuration
      ├─ Site URL: https://valusophy-city.vercel.app
      └─ Redirect URLs:
          ├─ https://valusophy-city.vercel.app/auth/callback
          └─ https://valusophy-city.vercel.app/**
```

## 🔍 디버깅

설정 후에도 오류가 발생하면:

1. **Supabase 로그 확인**
   - Authentication → Logs
   - 최근 인증 시도 확인
   - 오류 메시지 확인

2. **브라우저 개발자 도구**
   - F12 → Console 탭
   - Network 탭에서 리디렉션 확인
   - `/auth/callback` 요청 확인

3. **URL 확인**
   - Google 로그인 후 리디렉션되는 URL 확인
   - Supabase Redirect URLs와 정확히 일치하는지 확인

## ⚠️ 자주 하는 실수

1. ❌ URL 끝에 슬래시 추가: `https://...app/auth/callback/`
2. ❌ Site URL과 Redirect URL 불일치
3. ❌ `http://` 사용 (HTTPS만 허용)
4. ❌ 저장 후 바로 테스트 (몇 초 기다려야 함)

