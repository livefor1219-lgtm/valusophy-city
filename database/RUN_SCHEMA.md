# Supabase 스키마 실행 가이드

## 방법 1: Supabase 웹 대시보드 (추천)

1. **Supabase 프로젝트 대시보드 접속**
   - https://supabase.com/dashboard

2. **SQL Editor 열기**
   - 왼쪽 사이드바에서 **SQL Editor** 클릭
   - 또는 URL: `https://supabase.com/dashboard/project/_/sql/new`

3. **스키마 실행**
   - 새 쿼리 작성
   - `database/schema.sql` 파일의 전체 내용을 복사하여 붙여넣기
   - **Run** 또는 `Ctrl+Enter` (Mac: `Cmd+Enter`)로 실행

4. **확인**
   - 성공 메시지 확인
   - 왼쪽 사이드바에서 **Table Editor** 클릭하여 생성된 테이블 확인

## 방법 2: Supabase CLI 사용

### CLI 설치

```bash
# macOS
brew install supabase/tap/supabase

# 또는 npm으로 설치
npm install -g supabase
```

### 로그인 및 프로젝트 연결

```bash
# 로그인
supabase login

# 프로젝트 연결 (프로젝트 ID는 Supabase 대시보드에서 확인)
supabase link --project-ref your-project-ref
```

### 스키마 실행

```bash
# 로컬에서 실행
supabase db push

# 또는 직접 SQL 실행
supabase db execute --file database/schema.sql
```

## 실행 전 확인사항

✅ Supabase 프로젝트가 생성되어 있어야 함  
✅ 프로젝트의 Database URL과 Anon Key를 환경 변수에 설정  
✅ `IF NOT EXISTS`가 추가되어 있어 안전하게 재실행 가능  

## 스키마 포함 내용

- ✅ `residents` - 입주민 정보
- ✅ `posts` - 창작물 및 포스트
- ✅ `projects` - 협업 프로젝트
- ✅ `project_members` - 프로젝트 멤버
- ✅ `comments` - 댓글
- ✅ `likes` - 좋아요
- ✅ `activity_logs` - 활동 로그
- ✅ 7개의 인덱스

