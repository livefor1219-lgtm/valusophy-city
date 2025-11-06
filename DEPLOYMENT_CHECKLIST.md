# 🚀 재배포 후 로그인 문제 해결 체크리스트

## 🔴 문제 상황

재배포 후 Google 로그인이 갑자기 작동하지 않는 경우:
- 이전에는 잘 작동했음
- 코드 추가/수정 후 Git 푸시
- Vercel 자동 재배포
- 로그인 시 `{"error":"requested path is invalid"}` 오류 발생

## 🔍 원인 분석

### 1. **환경 변수 누락**
- Vercel 재배포 시 환경 변수가 리셋되거나 누락될 수 있음
- `NEXT_PUBLIC_SITE_URL`이 설정되지 않으면 `window.location.origin` 사용
- 빌드 타임과 런타임의 환경 변수 차이

### 2. **빌드 타임 vs 런타임**
- Next.js는 빌드 타임에 `NEXT_PUBLIC_*` 변수를 번들에 포함
- 재배포 시 환경 변수가 없으면 빌드 타임에 `undefined`로 고정됨
- 런타임에 `window.location.origin`을 사용하지만 Supabase 설정과 불일치 가능

### 3. **Supabase 설정 불일치**
- 코드에서 생성한 redirect URL이 Supabase에 등록되지 않음
- 재배포 후 URL이 변경되었을 수 있음

## ✅ 해결 방법

### 방법 1: 프로덕션 URL 하드코딩 (가장 안정적)

**장점:**
- 환경 변수에 의존하지 않음
- 재배포 후에도 일관된 동작
- Supabase 설정과 항상 일치

**단점:**
- 로컬 개발 시 수동 변경 필요
- 여러 환경 관리가 어려움

### 방법 2: 환경 변수 확실히 설정 (권장)

**장점:**
- 유연한 환경 관리
- 로컬/프로덕션 분리

**단점:**
- Vercel 환경 변수 설정 필요
- 재배포 시 확인 필요

## 🛠️ 즉시 해결 단계

### 1단계: Vercel 환경 변수 확인

1. **Vercel Dashboard 접속**
   - https://vercel.com → 프로젝트 선택
   - Settings → Environment Variables

2. **다음 변수 확인/추가:**
   ```
   NEXT_PUBLIC_SITE_URL = https://valusophy-city.vercel.app
   NEXT_PUBLIC_SUPABASE_URL = https://udekizctpsuzgmykxxhe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = (your_anon_key)
   ```

3. **환경 선택**
   - Production, Preview, Development 모두 선택
   - Save 클릭

4. **재배포**
   - Deployments → 최신 배포 → ... → Redeploy
   - 또는 새 커밋 푸시

### 2단계: Supabase Redirect URLs 확인

1. **Supabase Dashboard 접속**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
   - Authentication → URL Configuration

2. **Redirect URLs 확인/추가:**
   ```
   https://valusophy-city.vercel.app/auth/callback
   https://valusophy-city.vercel.app/**
   ```

3. **Save 클릭**

### 3단계: 테스트

1. 브라우저 캐시 삭제
2. 시크릿 모드에서 테스트
3. Google 로그인 버튼 클릭

## 📋 재배포 전 체크리스트

매번 재배포 전에 확인:

- [ ] Vercel 환경 변수 설정 확인
  - [ ] `NEXT_PUBLIC_SITE_URL` 설정됨
  - [ ] `NEXT_PUBLIC_SUPABASE_URL` 설정됨
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정됨

- [ ] Supabase Redirect URLs 확인
  - [ ] `https://valusophy-city.vercel.app/auth/callback` 포함
  - [ ] `https://valusophy-city.vercel.app/**` 포함

- [ ] 코드에서 redirect URL 확인
  - [ ] `lib/auth.ts`에서 올바른 URL 사용

## 🔄 재배포 후 체크리스트

재배포 후 즉시 확인:

- [ ] Vercel 배포 로그 확인
  - [ ] 빌드 성공
  - [ ] 환경 변수 주입 확인

- [ ] 로그인 테스트
  - [ ] Google 로그인 버튼 클릭
  - [ ] Google 로그인 페이지로 이동
  - [ ] 로그인 후 `/auth/callback`으로 리디렉션
  - [ ] `/profile`로 최종 리디렉션

- [ ] 오류 발생 시
  - [ ] 브라우저 콘솔 확인
  - [ ] Supabase 로그 확인 (Authentication → Logs)
  - [ ] Vercel 함수 로그 확인

## 🔒 예방 방법

### 코드 개선

1. **프로덕션 URL 하드코딩 + 환경 변수 fallback**
   ```typescript
   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                   'https://valusophy-city.vercel.app' ||
                   (typeof window !== 'undefined' ? window.location.origin : '');
   ```

2. **에러 로깅 추가**
   - redirect URL을 콘솔에 로그
   - Supabase 설정과 비교 가능하도록

3. **환경 변수 검증**
   - 빌드 타임에 환경 변수 확인
   - 누락 시 경고

### 자동화

1. **GitHub Actions로 환경 변수 검증**
2. **Vercel 환경 변수 템플릿 사용**
3. **배포 전 자동 테스트**

## 📝 참고사항

- Vercel은 빌드 타임에 `NEXT_PUBLIC_*` 변수를 번들에 포함
- 환경 변수 변경 후 **반드시 재배포** 필요
- Supabase 설정 변경은 **즉시 반영** (몇 초 소요)
- 브라우저 캐시는 **수동 삭제** 필요

