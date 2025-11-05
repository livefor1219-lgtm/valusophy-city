# 🚀 빠른 해결: "requested path is invalid" 오류

## ⚡ 2분 안에 해결하기

### 1단계: Supabase Dashboard 접속
- https://supabase.com/dashboard/project/udekizctpsuzgmykxxhe
- 또는 https://supabase.com/dashboard → 프로젝트 선택

### 2단계: Redirect URLs 추가
1. 좌측 메뉴: **Authentication**
2. **URL Configuration** 탭 클릭
3. **Redirect URLs** 섹션에서 **+ Add URL** 클릭
4. 다음 URL을 **정확히** 입력 (한 줄씩):
   ```
   https://valusophy-city.vercel.app/auth/callback
   ```
5. 다시 **+ Add URL** 클릭하고:
   ```
   https://valusophy-city.vercel.app/**
   ```
6. **Save** 버튼 클릭

### 3단계: 10초 대기
- 설정이 적용되는 시간이 필요합니다

### 4단계: 테스트
1. 브라우저 캐시 삭제 (Cmd+Shift+Delete 또는 Ctrl+Shift+Delete)
2. https://valusophy-city.vercel.app 접속
3. Google 로그인 버튼 클릭

## ✅ 확인 사항

Supabase Dashboard에서 다음을 확인:

```
Authentication → URL Configuration

Site URL:
  ✅ https://valusophy-city.vercel.app

Redirect URLs:
  ✅ https://valusophy-city.vercel.app/auth/callback
  ✅ https://valusophy-city.vercel.app/**
```

## 🔍 여전히 안 되는 경우

1. **Supabase 로그 확인**
   - Authentication → Logs
   - 최근 오류 확인

2. **URL 정확성 확인**
   - 슬래시(/) 위치 확인
   - `https://` 확인 (http가 아님)
   - 대소문자 확인

3. **브라우저 개발자 도구**
   - F12 → Console 탭
   - Network 탭에서 리디렉션 확인

## 📝 참고

- Supabase 설정 변경 후 **즉시 반영되지 않을 수 있음** (최대 1-2분)
- 여러 환경(로컬/프로덕션) 사용 시 **각각 설정 필요**

