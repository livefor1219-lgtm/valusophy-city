# Valusophy City 배포 가이드

이 문서는 발루소사이어시티 Next.js 애플리케이션의 배포 방법을 안내합니다.

## 배포 전 준비사항

### 1. Supabase 데이터베이스 설정

1. [Supabase](https://supabase.com)에서 계정 생성 및 새 프로젝트 생성
2. 프로젝트 대시보드에서 **Settings → API**로 이동
3. 다음 정보를 복사:
   - Project URL
   - `anon` `public` 키
4. Supabase SQL Editor에서 `database/schema.sql` 파일의 내용을 실행하여 테이블 생성

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 배포 방법

### 방법 1: Vercel 배포 (추천)

Vercel은 Next.js를 만들고 관리하는 회사이므로 가장 간단하고 최적화된 배포 방법입니다.

#### 단계:

1. **GitHub에 코드 푸시**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel 계정 연결**
   - [Vercel](https://vercel.com)에서 GitHub 계정으로 로그인
   - "Add New Project" 클릭
   - GitHub 저장소 선택

3. **환경 변수 설정**
   - Environment Variables 섹션에서 다음 추가:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. **배포 실행**
   - "Deploy" 버튼 클릭
   - 자동으로 빌드 및 배포 진행

5. **완료!**
   - 배포 완료 후 제공되는 URL로 접속 가능
   - 도메인 설정도 가능

### 방법 2: Netlify 배포

1. [Netlify](https://netlify.com)에서 GitHub 계정 연결
2. 저장소 선택 및 설정:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. 환경 변수 추가 (Supabase 설정)
4. 배포 실행

### 방법 3: 자체 서버 배포

#### 필요한 것:
- Node.js 18+ 설치
- PM2 또는 systemd로 프로세스 관리

#### 단계:

1. **서버에서 코드 클론**
   ```bash
   git clone your-repo-url
   cd valusophy-city
   ```

2. **환경 변수 설정**
   ```bash
   # .env.production 파일 생성
   nano .env.production
   ```

3. **빌드 및 실행**
   ```bash
   npm install
   npm run build
   ```

4. **PM2로 실행**
   ```bash
   npm install -g pm2
   pm2 start npm --name "valusophy-city" -- start
   pm2 save
   pm2 startup
   ```

5. **Nginx 설정** (필요시)
   ```
   server {
     listen 80;
     server_name your-domain.com;
     
     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## 로컬에서 테스트

배포 전 로컬에서 먼저 테스트하세요:

```bash
# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 Supabase 정보 입력

# 개발 서버 실행
npm run dev

# 빌드 테스트
npm run build
npm start
```

## 트러블슈팅

### 배포 후 데이터베이스 연결 안됨
- 환경 변수가 올바르게 설정되었는지 확인
- Supabase 프로젝트가 활성화되어 있는지 확인
- Row Level Security (RLS) 정책 확인

### 빌드 에러
- Node.js 버전 확인 (18+ 필요)
- 의존성 재설치: `rm -rf node_modules && npm install`
- TypeScript 에러 확인: `npm run lint`

## 추가 팁

1. **커스텀 도메인**: Vercel/Netlify에서 무료로 SSL 인증서 자동 설정
2. **CI/CD**: GitHub에 푸시하면 자동으로 재배포
3. **환경별 설정**: Vercel에서 Preview, Staging, Production 환경 분리 가능
4. **모니터링**: Vercel Analytics 또는 Sentry 추가 권장

## 배포 체크리스트

- [ ] Supabase 프로젝트 생성 및 스키마 실행
- [ ] 환경 변수 준비
- [ ] 로컬에서 빌드 성공 확인
- [ ] GitHub에 코드 푸시
- [ ] Vercel/Netlify에 프로젝트 연결
- [ ] 환경 변수 설정
- [ ] 배포 실행 및 확인
- [ ] 커스텀 도메인 설정 (선택)

