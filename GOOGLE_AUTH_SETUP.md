# Google 로그인 설정 가이드

"Unsupported provider: provider is not enabled" 오류를 해결하기 위한 단계별 가이드입니다.

## 📋 설정 단계

### 1단계: Google Cloud Console에서 OAuth 클라이언트 생성

1. **Google Cloud Console 접속**
   - https://console.cloud.google.com 접속
   - 프로젝트 선택 (없으면 새로 생성)

2. **API 및 서비스 활성화**
   - 좌측 메뉴에서 **"API 및 서비스"** → **"사용자 인증 정보"** 클릭
   - 상단의 **"+ 사용자 인증 정보 만들기"** → **"OAuth 클라이언트 ID"** 선택

3. **동의 화면 구성** (처음인 경우)
   - "동의 화면 구성" 클릭
   - 사용자 유형: **외부** 선택 → **만들기**
   - 앱 정보 입력:
     - 앱 이름: `Valusophy City`
     - 사용자 지원 이메일: 본인 이메일
     - 개발자 연락처 정보: 본인 이메일
   - **저장 및 계속** 클릭

4. **OAuth 클라이언트 생성**
   - 애플리케이션 유형: **웹 애플리케이션** 선택
   - 이름: `Valusophy City Web Client`
   - **승인된 리디렉션 URI** 필드에 다음을 정확히 입력 (하나씩 추가):
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```
     ⚠️ **중요**: 
     - URL 끝에 슬래시(/)가 없어야 합니다
     - `https://`로 시작해야 합니다
     - `http://`는 제외 (HTTPS만 허용)
     - 각 URI는 한 줄에 하나씩 입력
     - 로컬 개발용 (선택사항, 나중에 추가 가능):
     ```
     http://localhost:3000/auth/callback
     ```
   - **만들기** 클릭
   
   📝 **만약 "올바르지 않은 출처" 오류가 발생하면**:
   - URL이 정확히 위와 같은지 확인 (복사-붙여넣기 권장)
   - 프로젝트 ID가 `udekizctpsuzgmykxxhe`인지 확인
   - Supabase 대시보드에서 정확한 Redirect URL 확인

5. **클라이언트 ID와 시크릿 복사**
   - 생성된 클라이언트 ID와 클라이언트 보안 비밀번호를 복사 (나중에 필요)

### 2단계: Supabase에서 Google Provider 활성화

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe 접속
   - 또는 https://supabase.com/dashboard → 프로젝트 선택

2. **Authentication 설정으로 이동**
   - 좌측 메뉴에서 **"Authentication"** 클릭
   - **"Providers"** 탭 선택

3. **Google Provider 활성화**
   - Provider 목록에서 **"Google"** 찾기
   - Google 옆의 토글을 **ON**으로 변경

4. **OAuth 클라이언트 정보 입력**
   - **Client ID (for OAuth)**: Google Cloud Console에서 복사한 클라이언트 ID 붙여넣기
   - **Client Secret (for OAuth)**: Google Cloud Console에서 복사한 클라이언트 보안 비밀번호 붙여넣기
   - **"Save"** 버튼 클릭

5. **Redirect URL 확인**
   - Supabase가 자동으로 설정한 Redirect URL 확인:
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```
   - 이 URL이 Google Cloud Console의 "승인된 리디렉션 URI"에 추가되어 있는지 확인

### 3단계: Supabase URL 설정 확인

1. **Authentication → URL Configuration**
   - **Site URL**: 본인의 웹사이트 URL 설정
     - 로컬 개발: `http://localhost:3000`
     - Vercel 배포: `https://your-project.vercel.app`
   - **Redirect URLs**: 추가 리디렉션 URL 설정
     ```
     http://localhost:3000/auth/callback
     https://your-project.vercel.app/auth/callback
     ```

### 4단계: 테스트

1. **애플리케이션 재시작** (로컬인 경우)
   ```bash
   npm run dev
   ```

2. **Google 로그인 버튼 클릭**
   - Google 로그인 페이지로 리디렉션되어야 함
   - 로그인 후 `/auth/callback`으로 리디렉션되어야 함

## 🔍 문제 해결

### 여전히 "provider is not enabled" 오류가 발생하는 경우

1. **Supabase Provider 설정 확인**
   - Authentication → Providers → Google이 **ON**인지 확인
   - Client ID와 Secret이 올바르게 입력되었는지 확인

2. **Redirect URL 확인**
   - Google Cloud Console의 "승인된 리디렉션 URI"에 다음이 포함되어 있는지 확인:
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```

3. **Supabase 프로젝트 확인**
   - 올바른 프로젝트에 로그인되어 있는지 확인
   - 프로젝트 ID가 `udekizctpsuzgmykxxhe`인지 확인

4. **브라우저 캐시 지우기**
   - 브라우저 캐시 삭제 후 다시 시도

### "올바르지 않은 출처" 또는 "URI는 경로를 포함하거나 '/'로 끝날 수 없습니다" 오류

이 오류가 발생하는 경우:

1. **정확한 형식 확인**
   - 다음 형식을 정확히 따르세요:
     ```
     https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback
     ```
   - 끝에 슬래시(/)가 없어야 합니다
   - `https://`로 시작해야 합니다

2. **입력 필드 확인**
   - "승인된 리디렉션 URI" 필드에 입력하는지 확인
   - "승인된 JavaScript 출처"가 아닌 **"승인된 리디렉션 URI"** 필드입니다

3. **Supabase에서 정확한 URL 확인**
   - Supabase 대시보드 → Authentication → Providers → Google
   - 여기에 표시된 Redirect URL을 정확히 복사하여 사용

4. **대안: OAuth 클라이언트를 다시 생성**
   - 기존 클라이언트를 삭제하고 새로 만들기
   - 이번에는 URL을 수동으로 타이핑하지 말고 Supabase에서 복사

### "redirect_uri_mismatch" 오류가 발생하는 경우

- Google Cloud Console의 "승인된 리디렉션 URI"에 Supabase의 callback URL이 정확히 입력되어 있는지 확인
- URL 끝에 슬래시(/)가 없어야 함
- 정확히 일치해야 함 (대소문자, 경로 포함)

### 로그인 후 에러가 발생하는 경우

- `/auth/callback` 경로가 올바르게 작동하는지 확인
- 브라우저 콘솔에서 오류 메시지 확인

## ✅ 확인 체크리스트

- [ ] Google Cloud Console에서 OAuth 클라이언트 생성 완료
- [ ] Google Cloud Console에 Supabase callback URL 추가 완료
- [ ] Supabase에서 Google Provider 활성화 완료
- [ ] Supabase에 Client ID와 Secret 입력 완료
- [ ] Supabase Site URL 설정 완료
- [ ] 로그인 테스트 성공

## 📚 참고 자료

- [Supabase Auth 문서](https://supabase.com/docs/guides/auth)
- [Google OAuth 설정 가이드](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google Cloud Console](https://console.cloud.google.com)

