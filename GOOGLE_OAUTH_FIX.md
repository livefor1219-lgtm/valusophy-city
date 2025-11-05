# Google OAuth "올바르지 않은 출처" 오류 해결

Google Cloud Console에서 "URI는 경로를 포함하거나 '/'로 끝날 수 없습니다" 오류를 해결하는 방법입니다.

## 🔧 해결 방법

### 방법 1: 정확한 URI 형식 확인

1. **Supabase에서 정확한 Redirect URL 확인**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
   - **Authentication** → **Providers** → **Google** 클릭
   - 여기에 표시된 **Redirect URL**을 확인
   - 일반적으로: `https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback`

2. **Google Cloud Console에서 정확히 입력**
   - https://console.cloud.google.com → 프로젝트 선택
   - **API 및 서비스** → **사용자 인증 정보**
   - OAuth 2.0 클라이언트 ID 클릭 (또는 새로 생성)
   - **"승인된 리디렉션 URI"** 섹션에 다음을 추가:
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```
   - ⚠️ **주의사항**:
     - URL 끝에 슬래시(/)가 없어야 합니다
     - `https://`로 시작해야 합니다 (http 아님)
     - 정확히 복사-붙여넣기 (수동 타이핑 지양)

3. **저장**
   - **저장** 버튼 클릭

### 방법 2: 기존 클라이언트 삭제 후 재생성

오류가 계속되면 기존 OAuth 클라이언트를 삭제하고 새로 만드세요:

1. **기존 클라이언트 삭제**
   - Google Cloud Console → 사용자 인증 정보
   - 기존 OAuth 2.0 클라이언트 ID 옆 휴지통 아이콘 클릭

2. **새 클라이언트 생성**
   - **"+ 사용자 인증 정보 만들기"** → **"OAuth 클라이언트 ID"**
   - 애플리케이션 유형: **웹 애플리케이션**
   - 이름: `Valusophy City`
   - 승인된 리디렉션 URI:
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```
   - **만들기** 클릭

3. **새 Client ID와 Secret을 Supabase에 입력**
   - 생성된 Client ID와 Client Secret 복사
   - Supabase → Authentication → Providers → Google
   - Client ID와 Secret 업데이트
   - **Save** 클릭

### 방법 3: 입력 필드 확인

Google Cloud Console에서 두 가지 필드가 있는데, 올바른 필드에 입력해야 합니다:

- ❌ **"승인된 JavaScript 출처"** (여기에 입력하면 안 됨)
- ✅ **"승인된 리디렉션 URI"** (여기에 입력해야 함)

## 📝 정확한 URI 예시

다음은 정확한 URI 형식입니다:

```
https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
```

이것은:
- ✅ `https://`로 시작
- ✅ 도메인: `udekizctpsuzgmykxxhe.supabase.co`
- ✅ 경로: `/auth/v1/callback`
- ✅ 끝에 슬래시 없음

## ⚠️ 자주 하는 실수

1. URL 끝에 슬래시 추가: `https://...callback/` ❌
2. `http://` 사용: `http://...` ❌
3. 잘못된 필드에 입력: "JavaScript 출처"에 입력 ❌
4. 수동 타이핑: 오타 발생 가능 ❌

## ✅ 체크리스트

- [ ] Supabase에서 Redirect URL 확인 완료
- [ ] Google Cloud Console에서 "승인된 리디렉션 URI" 필드 선택
- [ ] URL을 복사-붙여넣기로 입력
- [ ] URL 끝에 슬래시 없음 확인
- [ ] `https://`로 시작하는지 확인
- [ ] 저장 완료
- [ ] Supabase에 Client ID와 Secret 입력 완료

## 🧪 테스트

설정 완료 후:

1. 애플리케이션에서 Google 로그인 버튼 클릭
2. Google 로그인 페이지로 리디렉션되어야 함
3. 로그인 후 `/auth/callback`으로 리디렉션되어야 함

오류가 계속되면 브라우저 콘솔과 네트워크 탭에서 오류 메시지를 확인하세요.

