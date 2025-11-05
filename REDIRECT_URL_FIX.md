# ERR_CONNECTION_REFUSED 오류 해결 (localhost 연결 오류)

Google 로그인 후 `ERR_CONNECTION_REFUSED` 또는 `localhost에서 연결을 거부했습니다` 오류가 발생하는 경우 해결 방법입니다.

## 🔍 문제 원인

Google 로그인 성공 후 Supabase가 애플리케이션으로 리디렉션할 때, Supabase에 등록된 Redirect URL이 현재 실행 중인 URL과 일치하지 않아 발생합니다.

## 🔧 해결 방법

### 1단계: Supabase 대시보드에서 URL 설정 확인

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe

2. **Authentication → URL Configuration 이동**
   - 좌측 메뉴: **Authentication**
   - **URL Configuration** 탭 클릭

3. **Site URL 설정**
   - **현재 실행 중인 애플리케이션 URL**을 입력:
   
   **로컬 개발 중인 경우:**
   ```
   http://localhost:3000
   ```
   
   **Vercel에 배포된 경우:**
   ```
   https://your-project.vercel.app
   ```
   또는 실제 도메인:
   ```2
   https://yourdomain.com
   ```

4. **Redirect URLs 추가** (중요!)
   - **Redirect URLs** 섹션에 다음을 추가:
   
   **로컬 개발용:**
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/**
   ```
   
   **Vercel 배포용:**
   ```
   https://your-project.vercel.app/auth/callback
   https://your-project.vercel.app/**
   ```
   
   ⚠️ **주의**: `**`는 와일드카드로 모든 경로를 허용합니다.

5. **저장**
   - **Save** 버튼 클릭

### 2단계: 로컬 개발 환경 확인

로컬에서 실행 중인 경우:

1. **개발 서버가 실행 중인지 확인**
   ```bash
   npm run dev
   ```

2. **포트 확인**
   - 기본적으로 `http://localhost:3000`에서 실행
   - 다른 포트를 사용 중이면 Supabase의 Site URL도 해당 포트로 수정

3. **환경 변수 확인**
   - `.env.local` 파일에 다음이 설정되어 있는지 확인:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://udekizctpsuzgmykxxhe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

### 3단계: Vercel 배포 환경 확인

Vercel에 배포된 경우:

1. **Vercel 대시보드 확인**
   - 프로젝트 → Settings → Environment Variables
   - `NEXT_PUBLIC_SUPABASE_URL`과 `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 설정되어 있는지 확인

2. **Supabase Site URL 확인**
   - Vercel 배포 URL과 Supabase Site URL이 일치하는지 확인
   - 예: `https://your-project.vercel.app`

### 4단계: 브라우저 캐시 및 쿠키 확인

1. **브라우저 캐시 삭제**
   - Chrome: `Cmd+Shift+Delete` (Mac) 또는 `Ctrl+Shift+Delete` (Windows)
   - 캐시 및 쿠키 삭제

2. **시크릿/프라이빗 모드로 테스트**
   - 새 시크릿 창에서 로그인 테스트

## 📝 체크리스트

로컬 개발 환경:
- [ ] `npm run dev`로 개발 서버 실행 중
- [ ] Supabase Site URL: `http://localhost:3000`
- [ ] Supabase Redirect URLs에 `http://localhost:3000/auth/callback` 추가
- [ ] `.env.local` 파일에 환경 변수 설정

Vercel 배포 환경:
- [ ] Vercel 배포 URL 확인
- [ ] Supabase Site URL: Vercel URL과 일치
- [ ] Supabase Redirect URLs에 Vercel URL 추가
- [ ] Vercel 환경 변수 설정 확인

## 🔄 로그인 플로우 확인

올바른 로그인 플로우:

1. 사용자가 "Google 로그인" 버튼 클릭
2. Google 로그인 페이지로 이동
3. Google 로그인 완료
4. Supabase callback: `https://udekizctpsuzgmykxxhe.supabase.co/auth/v1/callback`
5. 애플리케이션으로 리디렉션: `http://localhost:3000/auth/callback` (로컬) 또는 `https://your-project.vercel.app/auth/callback` (배포)
6. `/auth/callback`에서 세션 교환
7. `/profile` 페이지로 리디렉션

## ⚠️ 자주 하는 실수

1. **Site URL과 실제 애플리케이션 URL 불일치**
   - Supabase Site URL이 `http://localhost:3000`인데 애플리케이션이 다른 포트에서 실행

2. **Redirect URL 누락**
   - Redirect URLs에 `/auth/callback` 경로가 추가되지 않음

3. **HTTPS/HTTP 불일치**
   - 로컬: `http://`
   - 배포: `https://`

4. **환경 변수 누락**
   - Vercel에 환경 변수가 설정되지 않음

## 🧪 테스트

설정 완료 후:

1. 개발 서버 재시작 (로컬인 경우)
   ```bash
   npm run dev
   ```

2. Google 로그인 버튼 클릭

3. Google 로그인 완료

4. `/auth/callback`으로 정상 리디렉션되어야 함

5. `/profile` 페이지로 이동되어야 함

오류가 계속되면 브라우저 개발자 도구(F12)의 콘솔과 네트워크 탭에서 오류를 확인하세요.

