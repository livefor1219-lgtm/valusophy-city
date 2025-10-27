# Vercel 배포 가이드

## 🚀 빠른 배포 방법

### 1단계: Supabase 설정

**Supabase 대시보드에서 정보 가져오기:**
1. https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe 접속
2. **Settings** → **API** 이동
3. 다음 정보 복사:
   - Project URL: `https://udekizctpsuzgmykxxhe.supabase.co` (이미 있음)
   - `anon` `public` key

### 2단계: 환경 변수 설정

`.env.local` 파일을 열고 Supabase 키를 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://udekizctpsuzgmykxxhe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=복사한_anon_키를_여기에_붙여넣기
```

### 3단계: GitHub에 푸시 (필수)

```bash
# GitHub 저장소 생성 (아직 안 했다면)
# https://github.com/new 접속하여 저장소 생성

# 원격 저장소 연결
git remote add origin https://github.com/your-username/valusophy-city.git

# 푸시
git push -u origin main
```

### 4단계: Vercel 배포

**옵션 A: 웹 인터페이스 (추천)**

1. **Vercel 로그인**
   - https://vercel.com 접속
   - "Sign up" 또는 "Login" → GitHub 계정으로 로그인

2. **프로젝트 가져오기**
   - "Add New Project" 클릭
   - GitHub 저장소 목록에서 `valusophy-city` 선택
   - "Import" 클릭

3. **환경 변수 설정** (중요!)
   - "Environment Variables" 섹션으로 스크롤
   - 다음 변수 추가:
     - Key: `NEXT_PUBLIC_SUPABASE_URL`
       Value: `https://udekizctpsuzgmykxxhe.supabase.co`
     - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
       Value: (Supabase에서 복사한 anon key)

4. **배포 실행**
   - "Deploy" 버튼 클릭
   - 자동으로 빌드 및 배포 진행
   - 완료 후 URL 제공 (예: `valusophy-city.vercel.app`)

**옵션 B: Vercel CLI**

```bash
# Vercel CLI 설치
npm i -g vercel

# 로그인
vercel login

# 배포 (프로젝트 루트에서)
vercel

# 환경 변수 설정
# Vercel 대시보드에서 또는 CLI로 설정
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# 프로덕션 배포
vercel --prod
```

## ✅ 배포 후 확인

1. 제공된 URL로 접속
2. 모든 페이지 확인:
   - `/` - 메인 페이지
   - `/about` - 소개
   - `/citymap` - 시티맵
   - `/profile` - 프로필
   - `/projects` - 프로젝트
   - `/contact` - 연락처

## 🎉 커스텀 도메인 (선택)

Vercel 대시보드에서:
1. 프로젝트 선택
2. Settings → Domains
3. 원하는 도메인 입력
4. DNS 설정 안내 따르기

무료로 SSL 인증서 자동 설정됩니다!

## 📊 모니터링

배포 후 Vercel 대시보드에서:
- 실시간 로그 확인
- 빌드 상태 모니터링
- 성능 분석
- 트래픽 통계

## ⚠️ 문제 해결

### 빌드 실패
```bash
# 로컬에서 테스트
npm run build

# 문제 발견 시
npm install
npm run build
```

### 환경 변수 적용 안됨
- Vercel 대시보드에서 환경 변수 확인
- Environment Variables가 모든 환경(Production, Preview, Development)에 설정되어 있는지 확인

### 데이터베이스 연결 오류
- Supabase 프로젝트가 활성 상태인지 확인
- RLS (Row Level Security) 정책 확인 필요할 수 있음

