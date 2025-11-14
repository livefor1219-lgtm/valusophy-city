# 🧭 Valusophy SocieCity Project Context (Final for Stitch & Claude/Cursor)

## 🎯 Core Concept

철학적 커뮤니티 × 창작자 메타버스  
**“사유가 공간이 되고, 철학이 산업이 되는 도시.”**

---

## 💜 Brand Identity

- **컬러 팔레트**
  - Purple `#12061A` – 사유 · 창의
  - Gold `#D4AF37` – 가치 · 명예
  - Black `#0C081A` – 도시 · 깊이
- **미학**: Neon Minimal + Glassmorphism + Digital Luxury
- **키워드**: City of Thinkers · AI Cognition · Post-Human Urbanism

---

## 🧱 Structure / Modules

1. **Home (Hero 3D)**
   - React Three Fiber + Framer Motion
   - 보라-금 Glow 오브젝트
   - CTA: “Enter the City”

2. **City Map**
   - 2D ↔ 3D 하이브리드
   - 입주민 카드 → Penthouse 링크
   - 추후: 실시간 활동 시각화 (히트맵/빛 패턴)

3. **Penthouse (Profile)**
   - 노션형 블록 편집기
   - Supabase CRUD 포스트 + 파일 업로드
   - SNS 공유 캡처

4. **Projects**
   - 협업 생성 / 신청 / 상태 관리

5. **Residents**
   - 프로필 카드 / 팔로우 / 좋아요 / 댓글

---

## ⚙️ Tech Stack

| Layer      | Tools                                   |
|----------- |-----------------------------------------|
| Framework  | Next.js 15 + TypeScript                 |
| Styling    | Tailwind CSS + Framer Motion            |
| 3D         | @react-three/fiber + drei               |
| Auth / DB  | Supabase                                |
| Storage    | Supabase Storage                        |
| Animation  | Framer Motion / Lenis (smooth scroll)   |
| Export     | html-to-image / Vercel                  |

---

## 🪄 Visual / Motion Direction

- Glass 패널, 퍼플 → 골드 그라데이션, Glow Edge Light
- 스크롤 전이: 색상 Morph + Opacity Stagger
- Hero: 3D 박스/링 회전 + 금빛 조명
- 페이지 전환: Framer Motion Route Fade
- CityMap Hover: Light Bloom 강조

---

## 🧭 Roadmap

1. **Phase 1 (Core)**
   - Auth, CRUD, Upload, Residents 리스트
2. **Phase 2 (Interaction)**
   - 3D CityMap, 검색/필터, 알림
3. **Phase 3 (Vision)**
   - AI 시각화, NFT 시민증, Realtime Chat

---

## 🤖 Integration Guideline

필요한 경우 이 문서를 읽고 **프로젝트 철학 · 브랜딩 · 기술 방향**을 반영하라.  
3D Hero, City ↔ Penthouse ↔ Projects 연계, Supabase CRUD 및 SNS 공유 기능을 기본으로 한다.

---

## 🧩 Cursor / Claude Prompt Template

```
CLAUDE_CONTEXT.md를 읽고 프로젝트를 완전히 이해했는지 확인해줘.

특히 아래 3가지를 반영해:
1. 3D Hero (React Three Fiber, purple + gold glow)
2. City Map ↔ Penthouse ↔ Projects 구조
3. Supabase 기반 CRUD + SNS 공유 기능

이제 Phase 1 (Core Implementation)을 시작하자.
- Next.js 15, Tailwind, Framer Motion 셋업
- Supabase Auth/DB 연결
- 포스트 CRUD + 파일 업로드 완성
- Residents 리스트 출력

필요 패키지:
- @supabase/supabase-js
- @react-three/fiber, @react-three/drei
- framer-motion, lenis, html-to-image
```

---

## 🧠 Design Focus

- **3D 비주얼**: Hero ↔ CityMap ↔ Penthouse 사이 통일된 Glow & Glass 미학
- **AI 챗봇 / 방명록**: Anthropic Claude + Supabase 연동 (Phase 2 이후)
- **SNS 최적화**: OG 자동생성, 스크린샷 공유, QR 코드, Ma’at 보상
- **로드맵**: Phase 1 (Core) → Phase 2 (Interaction) → Phase 3 (Vision)

---

## 🧾 Next Steps

1. `CLAUDE_CONTEXT.md` 파일로 저장 & 커밋  
2. `.cursorrules`에 요약 추가  
3. Cursor / Claude에게 “Phase 1 시작” 명령  
4. Supabase 스키마 확장 준비 (resident_ai, guestbook 등 Phase 2~3 용)

## 🎯 Project Vision

**핵심 컨셉**: 현실 경제 시스템 + AI 챗봇 + 3D 비주얼을 결합한 창작자 메타버스

**차별점**: 
1. **스크린샷만 찍어도 인스타에 올리고 싶은 3D 비주얼**
2. **각 입주민마다 AI 분신 챗봇 (방명록 시스템)**
3. **성장 과정 가시화 + 경제 활동**

### 핵심 경험:

```
입주 → 3D 펜트하우스 받기 → AI 챗봇 설정 (내 분신)
→ 일일 작업 → 즉각 보상 → 펜트하우스 꾸미기
→ 이웃 방문 → AI 챗봇과 대화 (방명록 남기기)
→ 스크린샷 → 인스타 업로드 → 바이럴
→ 당근마켓 홍보 → 신규 유입
```

### 왜 사람들이 올까?

1. **비주얼**: "와 이거 뭐야? 너무 예쁜데?"
2. **AI 챗봇**: "내 분신이 대신 응대해주네?"
3. **성장 가시화**: "내가 성장하고 있구나"
4. **수익화**: "이거로 돈도 벌 수 있어?"
5. **SNS**: "인스타에 올려야지"

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **3D Engine**: 
  - Three.js (핵심)
  - React Three Fiber (@react-three/fiber)
  - @react-three/drei (헬퍼)
  - @react-three/postprocessing (효과)
- **Animation**: 
  - Framer Motion (2D)
  - Three.js Animation (3D)
- **State**: Zustand
- **Charts**: Recharts

### Backend
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth (Google OAuth)
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime
- **AI**: Anthropic Claude API (챗봇)

### Tools
- **3D Assets**: 
  - Spline (3D 디자인)
  - Blender (선택사항)
  - Ready Player Me (아바타)
- **Image Generation**: 
  - html-to-image (스크린샷)
  - og-image (소셜 공유)

---

## 🎨 Visual Design System

### 3D 펜트하우스 디자인

```typescript
// 펜트하우스 3D 구성
interface Penthouse3D {
  // 기본 구조
  structure: {
    walls: 'glass' | 'concrete' | 'wood',
    floor: 'marble' | 'wood' | 'metal',
    ceiling: 'high' | 'medium' | 'low',
    lighting: 'ambient' | 'spotlight' | 'neon'
  },
  
  // 가구/오브젝트
  objects: {
    desk: { position: [x, y, z], model: string },
    chair: { position: [x, y, z], model: string },
    bookshelf: { position: [x, y, z], items: string[] },
    artworks: { position: [x, y, z], image: string }[],
    plants: { position: [x, y, z], type: string }[]
  },
  
  // 분위기
  atmosphere: {
    fogDensity: number,
    bloomIntensity: number,
    shadowQuality: 'low' | 'medium' | 'high',
    ambientColor: string,
    skybox: string
  },
  
  // 특별 효과
  effects: {
    particles: boolean, // 먼지, 별 등
    reflections: boolean,
    caustics: boolean, // 물 반사
    postprocessing: {
      bloom: boolean,
      chromaticAberration: boolean,
      vignette: boolean
    }
  }
}
```

### 예시 펜트하우스 테마

```typescript
const PENTHOUSE_THEMES = {
  cyberpunk: {
    walls: 'glass',
    floor: 'metal',
    lighting: 'neon',
    colors: ['#FF00FF', '#00FFFF', '#FF0080'],
    effects: {
      bloom: true,
      particles: true,
      fogDensity: 0.02
    }
  },
  
  minimalist: {
    walls: 'concrete',
    floor: 'marble',
    lighting: 'ambient',
    colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0'],
    effects: {
      bloom: false,
      reflections: true,
      shadowQuality: 'high'
    }
  },
  
  cozy: {
    walls: 'wood',
    floor: 'wood',
    lighting: 'ambient',
    colors: ['#8B4513', '#D2691E', '#FFE4B5'],
    effects: {
      particles: true, // 먼지 효과
      fogDensity: 0.01
    }
  },
  
  galaxy: {
    walls: 'glass',
    floor: 'glass',
    lighting: 'spotlight',
    colors: ['#000033', '#6600FF', '#FF00FF'],
    skybox: '/skybox/nebula.hdr',
    effects: {
      bloom: true,
      particles: true, // 별
      chromaticAberration: true
    }
  }
};
```

### 인스타그램 최적화 샷

```typescript
// 자동으로 예쁜 앵글 캡처
const INSTAGRAM_SHOTS = {
  entrance: {
    camera: { position: [0, 1.6, 5], target: [0, 1, 0] },
    fov: 60,
    description: "펜트하우스 입구 전경"
  },
  
  workspace: {
    camera: { position: [2, 1.2, 3], target: [0, 1, 0] },
    fov: 50,
    description: "작업 공간 클로즈업"
  },
  
  gallery: {
    camera: { position: [0, 1.6, 4], target: [0, 1.6, 0] },
    fov: 70,
    description: "작품 갤러리 벽"
  },
  
  aerial: {
    camera: { position: [0, 5, 0], target: [0, 0, 0] },
    fov: 80,
    description: "하늘에서 본 전경"
  }
};
```

---

## 🤖 AI Chatbot System

### 챗봇 설정 프로세스

```typescript
interface ResidentAI {
  id: string;
  resident_id: string;
  
  // 기본 정보
  name: string, // "혜민봇"
  avatar_url: string,
  
  // 성격 설정
  personality: {
    traits: string[], // ["친근한", "유머러스", "진지한"]
    tone: 'formal' | 'casual' | 'playful',
    emoji_frequency: 'none' | 'low' | 'medium' | 'high'
  },
  
  // 학습 데이터
  knowledge_base: {
    bio: string, // 자기소개
    interests: string[], // 관심사
    works: string[], // 작품 설명
    faq: { question: string, answer: string }[]
  },
  
  // 시스템 프롬프트
  system_prompt: string,
  
  // 설정
  settings: {
    auto_reply: boolean,
    max_conversation_length: number,
    greeting_message: string
  }
}
```

### 챗봇 온보딩 플로우

```tsx
// components/onboarding/AISetup.tsx
'use client';

export function AISetup() {
  const steps = [
    {
      title: "AI 분신 만들기",
      description: "당신을 대신해 방문자와 대화할 AI를 설정하세요"
    },
    {
      title: "성격 설정",
      questions: [
        "어떤 말투로 대화하고 싶나요?",
        "어떤 성격으로 응대할까요?",
        "이모지를 얼마나 사용할까요?"
      ]
    },
    {
      title: "지식 입력",
      prompts: [
        "자신을 소개해주세요 (3줄)",
        "주요 관심사를 알려주세요",
        "대표 작품을 설명해주세요"
      ]
    },
    {
      title: "인사말 설정",
      example: "안녕하세요! 혜민님의 펜트하우스에 오신 걸 환영해요 😊"
    },
    {
      title: "테스트",
      description: "AI와 대화해보고 성격을 조정하세요"
    }
  ];
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* 단계별 UI */}
    </div>
  );
}
```

### 방명록 시스템

```typescript
// 챗봇 대화 = 방명록
interface GuestbookEntry {
  id: string,
  penthouse_id: string,
  visitor_id: string,
  visitor_name: string,
  
  // 대화 내역
  conversation: {
    role: 'visitor' | 'ai',
    message: string,
    timestamp: Date
  }[],
  
  // 요약
  summary: string, // AI가 자동 생성
  sentiment: 'positive' | 'neutral' | 'negative',
  
  // 반응
  host_reply: string | null, // 집주인이 나중에 답글
  
  visited_at: Date
}
```

### 방명록 확인 UI

```tsx
// components/guestbook/GuestbookList.tsx
'use client';

export function GuestbookList({ entries }: { entries: GuestbookEntry[] }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        방명록 ({entries.length}명 방문)
      </h2>
      
      {entries.map(entry => (
        <motion.div
          key={entry.id}
          className="bg-slate-800 rounded-lg p-6"
          whileHover={{ scale: 1.02 }}
        >
          {/* 방문자 정보 */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar src={entry.visitor.avatar} />
            <div>
              <p className="font-bold">{entry.visitor_name}</p>
              <p className="text-sm text-slate-400">
                {formatDistanceToNow(entry.visited_at)} 방문
              </p>
            </div>
          </div>
          
          {/* AI 요약 */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3 mb-3">
            <p className="text-sm text-blue-300">
              💬 {entry.summary}
            </p>
          </div>
          
          {/* 대화 내역 펼치기 */}
          <Collapsible>
            <CollapsibleTrigger>
              대화 내역 보기 ({entry.conversation.length}개 메시지)
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 mt-3">
                {entry.conversation.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-2 rounded ${
                      msg.role === 'visitor'
                        ? 'bg-slate-700 ml-0 mr-8'
                        : 'bg-blue-600 ml-8 mr-0'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
          
          {/* 집주인 답글 */}
          <div className="mt-4">
            <textarea
              placeholder="방문자에게 답글을 남기세요..."
              className="w-full bg-slate-700 rounded p-3"
              value={entry.host_reply || ''}
              onChange={(e) => updateReply(entry.id, e.target.value)}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
```

---

## 👤 Profile Settings (확장)

```typescript
interface ResidentProfile {
  // 기본 정보
  username: string,
  display_name: string,
  avatar_url: string,
  bio: string,
  
  // 추가 정보
  entry_code: string, // 입주 코드 (랜덤 생성, 유니크)
  mbti: string | null,
  favorite_color: string,
  
  // 작업 정보
  job_title: string, // "소설가", "일러스트레이터"
  skills: string[], // ["글쓰기", "스토리텔링"]
  
  // 공개 설정
  privacy: {
    show_assets: boolean, // 자산 공개 여부 (기본: false)
    show_progress: boolean, // 진행도 공개
    show_streak: boolean, // 연속일 공개
    allow_ai_chat: boolean // AI 챗봇 활성화
  },
  
  // 소셜
  social_links: {
    instagram?: string,
    twitter?: string,
    github?: string,
    portfolio?: string
  },
  
  // 통계 (공개)
  stats: {
    total_works: number,
    total_collaborations: number,
    city_rank: number,
    level: number
  }
}
```

---

## 📸 Social Sharing System

### 스크린샷 & 공유 기능

```typescript
// lib/share.ts
import html2canvas from 'html-to-canvas';

export const captureAndShare = async (elementId: string) => {
  // 1. 캡처
  const element = document.getElementById(elementId);
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2, // 고해상도
    logging: false
  });
  
  // 2. 이미지 생성
  const blob = await new Promise<Blob>((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png');
  });
  
  // 3. 공유
  if (navigator.share) {
    await navigator.share({
      title: 'Valusophy City',
      text: '내 펜트하우스 구경하러 오세요!',
      files: [new File([blob], 'penthouse.png', { type: 'image/png' })]
    });
  } else {
    // 폴백: 다운로드
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'penthouse.png';
    a.click();
  }
  
  // 4. 보상
  await rewardForSharing(50); // +50 Ma'at
};
```

### 공유 버튼 UI

```tsx
// components/share/ShareButton.tsx
'use client';

import { Share2, Instagram, Twitter, Download } from 'lucide-react';

export function ShareButton({ elementId }: { elementId: string }) {
  const [loading, setLoading] = useState(false);
  
  const handleShare = async (platform: 'instagram' | 'twitter' | 'download') => {
    setLoading(true);
    
    try {
      const image = await captureAndShare(elementId);
      
      switch (platform) {
        case 'instagram':
          // Instagram 스토리 공유 링크
          const igUrl = `https://www.instagram.com/create/story`;
          window.open(igUrl, '_blank');
          break;
          
        case 'twitter':
          const tweetText = `내 Valusophy City 펜트하우스 🏠✨\n\nhttps://valusophy.city/u/${username}`;
          const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
          window.open(twitterUrl, '_blank');
          break;
          
        case 'download':
          // 이미 다운로드됨
          break;
      }
      
      toast.success(
        <div>
          공유 완료! <span className="text-amber-500">+50 Ma'at</span>
        </div>
      );
    } catch (error) {
      toast.error('공유 실패');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={loading}>
          <Share2 className="w-4 h-4 mr-2" />
          공유하기
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleShare('instagram')}>
          <Instagram className="w-4 h-4 mr-2" />
          Instagram 스토리
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare('twitter')}>
          <Twitter className="w-4 h-4 mr-2" />
          Twitter
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleShare('download')}>
          <Download className="w-4 h-4 mr-2" />
          이미지 다운로드
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### OG Image 자동 생성

```tsx
// app/u/[username]/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export default async function Image({ params }: { params: { username: string } }) {
  const user = await getUser(params.username);
  
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 80
        }}
      >
        {/* 아바타 */}
        <img
          src={user.avatar_url}
          width={200}
          height={200}
          style={{
            borderRadius: '50%',
            border: '8px solid #3b82f6'
          }}
        />
        
        {/* 이름 */}
        <h1 style={{ 
          fontSize: 80, 
          color: 'white',
          marginTop: 40
        }}>
          {user.display_name}
        </h1>
        
        {/* 통계 */}
        <div style={{ 
          display: 'flex', 
          gap: 60,
          marginTop: 40
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 48, color: '#3b82f6', fontWeight: 'bold' }}>
              {user.level}
            </p>
            <p style={{ fontSize: 24, color: '#94a3b8' }}>Level</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 48, color: '#f59e0b', fontWeight: 'bold' }}>
              {user.total_works}
            </p>
            <p style={{ fontSize: 24, color: '#94a3b8' }}>Works</p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 48, color: '#10b981', fontWeight: 'bold' }}>
              {user.streak_days}
            </p>
            <p style={{ fontSize: 24, color: '#94a3b8' }}>Streak</p>
          </div>
        </div>
        
        {/* 로고 */}
        <p style={{ 
          fontSize: 32, 
          color: '#64748b',
          marginTop: 60
        }}>
          Valusophy City
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
```

---

## 🗄️ Updated Database Schema

```sql
-- AI 챗봇 테이블
CREATE TABLE resident_ai (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES residents(id) UNIQUE,
  
  name TEXT NOT NULL, -- "혜민봇"
  avatar_url TEXT,
  
  -- 성격
  personality_traits TEXT[], -- ["친근한", "유머러스"]
  tone TEXT DEFAULT 'casual', -- 'formal', 'casual', 'playful'
  emoji_frequency TEXT DEFAULT 'medium',
  
  -- 지식
  bio TEXT,
  interests TEXT[],
  works_description TEXT,
  faq JSONB, -- [{ q: "", a: "" }]
  
  -- 시스템 프롬프트
  system_prompt TEXT,
  
  -- 설정
  auto_reply BOOLEAN DEFAULT true,
  max_conversation_length INTEGER DEFAULT 20,
  greeting_message TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 방명록 (챗봇 대화)
CREATE TABLE guestbook_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  penthouse_id UUID REFERENCES properties(id),
  host_id UUID REFERENCES residents(id),
  visitor_id UUID REFERENCES residents(id),
  
  -- 대화 내역
  conversation JSONB, -- [{ role: "", message: "", timestamp: "" }]
  
  -- AI 요약
  summary TEXT,
  sentiment TEXT, -- 'positive', 'neutral', 'negative'
  
  -- 집주인 반응
  host_reply TEXT,
  host_replied_at TIMESTAMP,
  
  visited_at TIMESTAMP DEFAULT NOW()
);

-- 프로필 확장
ALTER TABLE residents ADD COLUMN entry_code TEXT UNIQUE;
ALTER TABLE residents ADD COLUMN mbti TEXT;
ALTER TABLE residents ADD COLUMN favorite_color TEXT DEFAULT '#3B82F6';
ALTER TABLE residents ADD COLUMN job_title TEXT;
ALTER TABLE residents ADD COLUMN skills TEXT[];

-- 공개 설정
CREATE TABLE privacy_settings (
  resident_id UUID PRIMARY KEY REFERENCES residents(id),
  show_assets BOOLEAN DEFAULT false,
  show_progress BOOLEAN DEFAULT true,
  show_streak BOOLEAN DEFAULT true,
  allow_ai_chat BOOLEAN DEFAULT true
);

-- 소셜 링크
CREATE TABLE social_links (
  resident_id UUID PRIMARY KEY REFERENCES residents(id),
  instagram TEXT,
  twitter TEXT,
  github TEXT,
  portfolio TEXT
);

-- 3D 펜트하우스 설정
CREATE TABLE penthouse_3d_config (
  property_id UUID PRIMARY KEY REFERENCES properties(id),
  
  -- 테마
  theme TEXT DEFAULT 'minimalist',
  
  -- 구조
  walls TEXT DEFAULT 'glass',
  floor TEXT DEFAULT 'marble',
  ceiling TEXT DEFAULT 'high',
  lighting TEXT DEFAULT 'ambient',
  
  -- 색상
  primary_color TEXT DEFAULT '#3B82F6',
  secondary_color TEXT DEFAULT '#8B5CF6',
  accent_color TEXT DEFAULT '#F59E0B',
  
  -- 오브젝트 (JSONB로 위치/모델 저장)
  objects JSONB,
  
  -- 효과
  fog_density DECIMAL(4,2) DEFAULT 0.01,
  bloom_intensity DECIMAL(4,2) DEFAULT 0.5,
  shadow_quality TEXT DEFAULT 'medium',
  particles_enabled BOOLEAN DEFAULT true,
  
  -- 하늘
  skybox_url TEXT,
  
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 공유 보상 추적
CREATE TABLE share_rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resident_id UUID REFERENCES residents(id),
  platform TEXT, -- 'instagram', 'twitter', 'download'
  maat_earned INTEGER DEFAULT 50,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🎮 Updated File Structure

```
valusophy-city/
├── app/
│   ├── (auth)/
│   ├── (main)/
│   │   ├── dashboard/
│   │   ├── city/                    # 2D 도시 맵
│   │   ├── penthouse/[id]/         # 3D 펜트하우스 뷰어
│   │   ├── profile/[username]/     # 프로필 페이지
│   │   ├── settings/
│   │   │   ├── profile/
│   │   │   ├── ai/                 # AI 챗봇 설정
│   │   │   └── privacy/
│   │   ├── guestbook/              # 내 방명록
│   │   └── ...
│   ├── api/
│   │   ├── ai/
│   │   │   ├── chat/route.ts       # 챗봇 대화
│   │   │   └── train/route.ts     # 챗봇 학습
│   │   ├── share/
│   │   │   └── reward/route.ts     # 공유 보상
│   │   └── ...
│   └── u/[username]/                # 공개 프로필
│       └── opengraph-image.tsx      # OG 이미지
├── components/
│   ├── 3d/
│   │   ├── Penthouse3D.tsx         # 메인 3D 컴포넌트
│   │   ├── Scene.tsx               # Three.js 씬
│   │   ├── Camera.tsx
│   │   ├── Lighting.tsx
│   │   ├── Objects/
│   │   │   ├── Desk.tsx
│   │   │   ├── Chair.tsx
│   │   │   ├── Artwork.tsx
│   │   │   └── ...
│   │   ├── Effects/
│   │   │   ├── Bloom.tsx
│   │   │   ├── Fog.tsx
│   │   │   └── Particles.tsx
│   │   └── Controls.tsx
│   ├── ai/
│   │   ├── ChatInterface.tsx       # 챗봇 UI
│   │   ├── AISetup.tsx             # 챗봇 설정
│   │   └── GuestbookList.tsx       # 방명록
│   ├── share/
│   │   ├── ShareButton.tsx
│   │   ├── ScreenshotPreview.tsx
│   │   └── QRCode.tsx
│   └── ...
├── lib/
│   ├── ai/
│   │   ├── claude.ts               # Anthropic API
│   │   ├── prompts.ts              # 프롬프트 템플릿
│   │   └── memory.ts               # RAG 메모리
│   ├── 3d/
│   │   ├── loader.ts               # 3D 모델 로더
│   │   ├── materials.ts
│   │   └── animations.ts
│   └── share.ts
└── public/
    ├── models/                      # 3D 모델
    │   ├── furniture/
    │   ├── decorations/
    │   └── avatars/
    └── skybox/                      # 하늘 텍스처
```

---

## 🚀 Updated MVP Roadmap

### Phase 1: Foundation (Week 1-2)
```
Priority 1: Auth & Basic Profile
- [ ] Google OAuth
- [ ] 프로필 생성 (username, entry_code)
- [ ] 은행 계좌 생성

Priority 2: 3D Penthouse Setup
- [ ] React Three Fiber 기본 씬
- [ ] 간단한 펜트하우스 모델 (박스 3개)
- [ ] 카메라 컨트롤 (OrbitControls)
- [ ] 기본 조명 & 그림자
```

### Phase 2: AI Chatbot (Week 3-4)
```
Priority 3: AI Setup
- [ ] Anthropic API 연동
- [ ] AI 챗봇 온보딩 플로우
- [ ] 성격/지식 설정 UI
- [ ] 시스템 프롬프트 생성

Priority 4: Chat Interface
- [ ] 실시간 채팅 UI
- [ ] 대화 저장 (guestbook)
- [ ] AI 자동 응답
- [ ] 대화 요약 (AI)
```

### Phase 3: Social Sharing (Week 5-6)
```
Priority 5: Screenshot & Share
- [ ] 3D 씬 캡처 기능
- [ ] 공유 버튼 (Instagram, Twitter)
- [ ] QR 코드 생성
- [ ] 공유 시 Ma'at 보상

Priority 6: OG Image
- [ ] 동적 OG 이미지 생성
- [ ] 프로필 공유 최적화
```

### Phase 4: 3D Enhancement (Week 7-8)
```
Priority 7: Visual Polish
- [ ] 다양한 테마 (Cyberpunk, Minimalist, Galaxy)
- [ ] 포스트프로세싱 (Bloom, Fog)
- [ ] 파티클 효과
- [ ] 가구 배치 에디터

Priority 8: Performance
- [ ] LOD (Level of Detail)
- [ ] Lazy loading 3D 모델
- [ ] 텍스처 압축
```

---

## ⚠️ Critical Implementation Notes

### 1. 3D Performance Optimization

```typescript
// 무거운 3D는 선택적 렌더링
'use client';

import dynamic from 'next/dynamic';

// 3D 컴포넌트는 클라이언트 사이드만
const Penthouse3D = dynamic(
  () => import('@/components/3d/Penthouse3D'),
  { 
    ssr: false,
    loading: () => <PenthouseLoadingSkeleton />
  }
);

// 모바일에서는 스크린샷만 표시
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

return (
  <div>
    {isMobile ? (
      <img src={penthouse.screenshot_url} alt="Penthouse" />
    ) : (
      <Penthouse3D config={penthouse.config} />
    )}
  </div>
);
```

### 2. AI Chatbot Rate Limiting

```typescript
// 무제한 대화 방지
const CHAT_LIMITS = {
  free: {
    daily_messages: 50,
    max_conversation_length: 20
  },
  pro: {
    daily_messages: 500,
    max_conversation_length: 100
  }
};

// 대화 전 체크
const canChat = async (visitorId: string, hostId: string) => {
  const count = await getMessageCount(visitorId, hostId, 'today');
  const limit = await getUserTier(visitorId) === 'pro' 
    ? CHAT_LIMITS.pro.daily_messages 
    : CHAT_LIMITS.free.daily_messages;
    
  return count < limit;
};
```

### 3. Screenshot Quality

```typescript
// 고품질 스크린샷 설정
const captureHighQuality = async (scene: THREE.Scene) => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true
  });
  
  renderer.setPixelRatio(2); // 레티나 디스플레이
  renderer.setSize(1920, 1080); // Full HD
  
  renderer.render(scene, camera);
  
  const dataURL = renderer.domElement.toDataURL('image/png');
  return dataURL;
};
```

---

## 🎨 Example 3D Penthouse Component

```tsx
// components/3d/Penthouse3D.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface Penthouse3DProps {
  config: Penthouse3DConfig;
  interactive?: boolean;
}

export function Penthouse3D({ config, interactive = true }: Penthouse3DProps) {
  return (
    <div className="w-full h-screen">
      <Canvas shadows>
        {/* 카메라 */}
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={60} />
        
        {/* 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          castShadow
          intensity={1}
          shadow-mapSize={[2048, 2048]}
        />
        
        {/* 환경 */}
        <Environment preset={config.atmosphere.skybox || "sunset"} />
        
        {/* 펜트하우스 구조 */}
        <PenthouseStructure config={config} />
        
        {/* 가구 */}
        <Furniture objects={config.objects} />
        
        {/* 효과 */}
        {config.effects.particles && <Particles />}
        {config.atmosphere.fogDensity > 0 && (
          <fog attach="fog" args={['#000000', 0, 30]} />
        )}
        
        {/* 포스트프로세싱 */}
        {config.effects.postprocessing.bloom && (
          <EffectComposer>
            <Bloom
              intensity={config.atmosphere.bloomIntensity}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        )}
        
        {/* 컨트롤 */}
        {interactive && (
          <OrbitControls
            enablePan={false}
            minDistance={3}
            maxDistance={10}
            maxPolarAngle={Math.PI / 2}
          />
        )}
      </Canvas>
    </div>
  );
}

// 펜트하우스 구조
function PenthouseStructure({ config }: { config: Penthouse3DConfig }) {
  return (
    <group>
      {/* 바닥 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color={config.primary_color}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      
      {/* 벽 */}
      <mesh position={[0, 2.5, -5]} receiveShadow>
        <boxGeometry args={[10, 5, 0.2]} />
        <meshStandardMaterial 
          color="#ffffff"
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* 천장 */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

// 가구
function Furniture({ objects }: { objects: any }) {
  return (
    <group>
      {objects.desk && (
        <Desk position={objects.desk.position} />
      )}
      {objects.chair && (
        <Chair position={objects.chair.position} />
      )}
      {objects.artworks?.map((art: any, i: number) => (
        <Artwork
          key={i}
          position={art.position}
          image={art.image}
        />
      ))}
    </group>
  );
}
```

---

## 🎯 핵심 차별점 정리

### 차별점 3대 요소:

1. **3D 비주얼** 🎨
   - 스크린샷만 찍어도 인스타 갈 정도로 예쁨
   - 당근마켓 홍보용 이미지 자동 생성
   - OG 이미지로 자동 바이럴

2. **AI 챗봇 (방명록)** 🤖
   - 내 분신이 24시간 응대
   - 방문자와 대화 기록 = 방명록
   - 나중에 확인하고 답글 가능

3. **성장 + 경제** 💰
   - 게이미피케이션 (레벨, 스트릭)
   - 실제 수익 전환 (Ma'at → 돈)
   - 부동산 경제 시뮬레이션

---

## 📝 현재 구현 상태

### ✅ 완료된 기능
- Google OAuth 로그인
- 기본 프로필 페이지
- 프로젝트 페이지
- 포스트 시스템
- 무한 로딩 문제 해결
- OAuth 리다이렉트 문제 해결

### 🔄 다음 단계
- 3D 펜트하우스 구현
- AI 챗봇 시스템
- SNS 공유 기능

---

이 문서를 다른 Claude나 개발자에게 공유하면 프로젝트의 전체 비전과 기술 스택을 빠르게 이해할 수 있습니다.
