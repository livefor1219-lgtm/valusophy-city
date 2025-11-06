# 🔧 Vercel 환경 변수 설정 가이드

## ⚠️ 재배포 후 로그인이 안 되는 문제 해결

재배포 후 Google 로그인이 갑자기 작동하지 않는 경우, 환경 변수가 누락되었을 가능성이 높습니다.

## 📋 필수 환경 변수

Vercel Dashboard에서 다음 환경 변수를 설정해야 합니다:

### 1. Vercel Dashboard 접속
- https://vercel.com → 프로젝트 선택
- Settings → Environment Variables

### 2. 다음 변수 추가/확인

#### 필수 변수

```
NEXT_PUBLIC_SITE_URL
값: https://valusophy-city.vercel.app
환경: Production, Preview, Development 모두 선택
```

```
NEXT_PUBLIC_SUPABASE_URL
값: https://udekizctpsuzgmykxxhe.supabase.co
환경: Production, Preview, Development 모두 선택
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
값: (Supabase Dashboard에서 복사)
환경: Production, Preview, Development 모두 선택
```

### 3. 환경 선택
- ✅ Production
- ✅ Preview
- ✅ Development

**중요:** 모든 환경에 동일한 변수를 설정하는 것이 좋습니다.

### 4. 저장 및 재배포
1. **Save** 버튼 클릭
2. **Deployments** 탭으로 이동
3. 최신 배포의 **...** 메뉴 클릭
4. **Redeploy** 선택
5. 또는 새 커밋을 푸시하여 자동 재배포

## 🔍 환경 변수 확인 방법

### Vercel에서 확인
1. Settings → Environment Variables
2. 각 변수가 올바르게 설정되어 있는지 확인

### 빌드 로그에서 확인
1. Deployments → 최신 배포 → Build Logs
2. 환경 변수가 주입되었는지 확인
3. `NEXT_PUBLIC_SITE_URL`이 출력되는지 확인

### 런타임에서 확인
1. 브라우저 개발자 도구 (F12)
2. Console 탭
3. `OAuth redirect URL:` 로그 확인 (개발 환경에서만)

## ⚠️ 주의사항

1. **환경 변수 변경 후 반드시 재배포**
   - 환경 변수는 빌드 타임에 번들에 포함됨
   - 변경 후 재배포하지 않으면 이전 값 사용

2. **변수 이름 정확히 입력**
   - `NEXT_PUBLIC_` 접두사 필수
   - 대소문자 구분

3. **값에 공백 없음**
   - URL 끝에 공백이나 슬래시 없음
   - `https://valusophy-city.vercel.app` (올바름)
   - `https://valusophy-city.vercel.app/` (잘못됨)

4. **모든 환경에 설정**
   - Production만 설정하면 Preview/Development에서 작동 안 함

## 🔄 재배포 후 체크리스트

- [ ] Vercel 환경 변수 설정 확인
- [ ] 재배포 완료 확인
- [ ] 빌드 로그에서 오류 없음 확인
- [ ] Google 로그인 테스트
- [ ] Supabase Redirect URLs 확인

## 📝 Supabase 설정도 확인

환경 변수 설정과 함께 Supabase 설정도 확인:

1. **Supabase Dashboard**
   - https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
   - Authentication → URL Configuration

2. **Redirect URLs 확인:**
   ```
   https://valusophy-city.vercel.app/auth/callback
   https://valusophy-city.vercel.app/**
   ```

## 🆘 문제 해결

### 환경 변수가 적용되지 않는 경우

1. **재배포 확인**
   - 환경 변수 변경 후 반드시 재배포 필요

2. **변수 이름 확인**
   - `NEXT_PUBLIC_` 접두사 확인
   - 대소문자 확인

3. **환경 선택 확인**
   - Production, Preview, Development 모두 선택했는지 확인

4. **빌드 로그 확인**
   - Deployments → Build Logs
   - 환경 변수 주입 확인

### 여전히 안 되는 경우

1. **Supabase 로그 확인**
   - Authentication → Logs
   - 최근 인증 시도 확인

2. **브라우저 콘솔 확인**
   - F12 → Console
   - 오류 메시지 확인

3. **캐시 삭제**
   - 브라우저 캐시 완전 삭제
   - 시크릿 모드에서 테스트

