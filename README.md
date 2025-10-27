# 🏙️ Valusophy City - 발루소사이어시티

철학적 세계관 위의 디지털 도시 - 각자의 삶과 창작을 시각화하는 메타 커뮤니티

## 🌟 개요

Valusophy City는 단순한 포트폴리오 플랫폼이 아닙니다. 각 입주민의 창작 활동을 시각화하고, 커뮤니티 간 협업을 촉진하는 디지털 도시입니다.

## ✨ 주요 기능

### 🏢 펜트하우스 (프로필 공간)
- 각 입주민의 독특한 아파트 공간
- 작업물 전시 및 일상 기록
- 입체적 인테리어로 포트폴리오 구성

### 🗺️ 시티맵 (Citymap)
- 3D 인터랙티브 월드맵
- 건물 클릭 시 입주민 페이지로 이동
- 도시 전체 활동 시각화

### 👥 프로젝트 (Projects)
- 공동작업 및 협업 공간
- 공용 아틀리에에서 실시간 소통
- 프로젝트 전시 및 관리

### 📝 입주 신청 (Contact)
- 온라인 입주 신청서
- 정보 수집 및 승인 프로세스

## 🛠️ 기술 스택

- **프론트엔드**: Next.js 14, React, TypeScript
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **데이터베이스**: Supabase
- **3D 엔진**: Three.js (예정)

## 🚀 시작하기

### 1. 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 설정을 추가하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 데이터베이스 설정

Supabase에서 `database/schema.sql` 파일의 내용을 실행하여 테이블을 생성하세요.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🚢 배포하기

### Vercel 배포 (추천)

1. **코드를 GitHub에 푸시**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel에 배포**
   - [vercel.com](https://vercel.com)에서 GitHub 계정으로 로그인
   - "Add New Project" 클릭 → 저장소 선택
   - Environment Variables 추가:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy 클릭

3. **완료!** 자동으로 배포되고 URL 제공

> 더 자세한 배포 가이드는 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

## 📁 프로젝트 구조

```
valusophy-city/
├── app/
│   ├── about/          # 철학·세계관 소개
│   ├── citymap/        # 3D 시티맵
│   ├── contact/        # 입주 신청
│   ├── profile/        # 펜트하우스 (프로필)
│   ├── projects/       # 협업 프로젝트
│   └── layout.tsx      # 루트 레이아웃
├── components/         # React 컴포넌트
├── lib/                # 유틸리티 함수
├── database/           # 데이터베이스 스키마
└── public/             # 정적 파일
```

## 🎨 디자인 컨셉

### 비주얼 키워드
**Neo-minimal + Ether + Glow**
- 투명 유리 효과
- 은색 금속 질감
- 빛의 반사감 강조

### 컬러 팔레트
- **Primary**: Cyan (#00D4FF)
- **Secondary**: Purple (#9333EA)
- **Accent**: Pink (#EC4899)
- **Background**: Black / Purple gradients

## 📊 데이터베이스 구조

- `residents`: 입주민 정보
- `posts`: 창작물 및 포스트
- `projects`: 협업 프로젝트
- `project_members`: 프로젝트 멤버
- `comments`: 댓글
- `likes`: 좋아요
- `activity_logs`: 활동 로그

## 🔮 향후 계획

- [ ] Three.js로 3D 시티맵 구현
- [ ] 실시간 채팅 기능
- [ ] NFT 시민증 발급
- [ ] 포트폴리오 자동 캡처 및 SNS 공유
- [ ] AI 기반 활동 로그 시각화
- [ ] 프로젝트 통계 및 분석

## 📝 라이선스

MIT License

## 👥 기여

입주 신청서를 작성하여 발루소사이어시티의 새로운 입주민이 되어보세요!

---

**Valusophy City** - Neo-minimal + Ether + Glow
Created with ❤️ by Valusophy Community
