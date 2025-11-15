# 3D 도시 맵 구현 가이드

## 🎯 구현 목표

City Map 페이지에 3D 인터랙티브 도시 맵 구현
- 각 입주민을 건물로 표현
- 건물 클릭 시 해당 입주민 프로필로 이동
- 활동 지수에 따른 시각적 피드백 (색상, 높이, Glow)

## 🏗️ 구현 방식

### 1. **건물 배치 알고리즘**

```typescript
// 그리드 기반 배치
const gridSize = 5; // 5x5 그리드
const spacing = 2; // 건물 간 간격

buildings.forEach((resident, index) => {
  const x = (index % gridSize) * spacing - (gridSize - 1) * spacing / 2;
  const z = Math.floor(index / gridSize) * spacing - (gridSize - 1) * spacing / 2;
  position: [x, 0.5, z]
});
```

### 2. **활동 지수 계산**

```typescript
// 실제 활동 지수 계산 (추후 구현)
const calculateActivity = async (residentId: string) => {
  const [posts, projects, comments] = await Promise.all([
    getPostCount(residentId),
    getProjectCount(residentId),
    getCommentCount(residentId)
  ]);
  
  // 가중치 적용
  return Math.min(100, (posts * 10 + projects * 20 + comments * 5));
};
```

### 3. **시각적 표현**

- **높이**: 활동 지수에 비례 (1 ~ 3)
- **색상**: 
  - Gold (#D4AF37): 활동 > 70
  - Purple (#12061A): 활동 40-70
  - Dark (#12061A): 활동 < 40
- **Glow**: 활동 지수에 비례한 emissive intensity
- **애니메이션**: 미세한 떨림 효과 (활동 지수에 따라)

### 4. **인터랙션**

- **Hover**: 건물 강조 + 이름 표시
- **Click**: 프로필 페이지로 이동
- **카메라**: OrbitControls로 자유로운 시점 이동
- **자동 회전**: 천천히 회전하여 전체 도시 조망

## 📋 구현 단계

### Phase 1: 기본 3D 맵 (현재)
- ✅ CityMap3D 컴포넌트 생성
- ✅ 건물 배치 및 렌더링
- ✅ 클릭 이벤트 처리
- ✅ 기본 조명 및 효과

### Phase 2: 활동 지수 연동
- [ ] 실제 활동 지수 계산
- [ ] 실시간 업데이트
- [ ] 히트맵 시각화

### Phase 3: 고급 기능
- [ ] 건물 커스터마이징 (테마)
- [ ] 파티클 효과 (활동 시 빛나는 효과)
- [ ] 미니맵 (전체 도시 조망)
- [ ] 검색 및 필터링

## 🎨 디자인 가이드

### 브랜드 컬러 적용
- 배경: Black (#0C081A)
- 그리드: Purple (#12061A)
- 활발한 건물: Gold (#D4AF37)
- 일반 건물: Purple (#12061A)

### 효과
- Bloom: 활발한 건물 강조
- Fog: 깊이감 추가
- Particles: 활동 시 빛나는 효과 (추후)

## 🔧 성능 최적화

### 1. **LOD (Level of Detail)**
```typescript
// 카메라 거리에 따라 건물 디테일 조정
const distance = camera.position.distanceTo(building.position);
if (distance > 10) {
  // 간단한 박스만 렌더링
} else {
  // 전체 디테일 렌더링
}
```

### 2. **인스턴싱**
```typescript
// 같은 타입의 건물은 InstancedMesh 사용
<InstancedMesh args={[geometry, material, buildingCount]}>
  {buildings.map((building, i) => (
    <instanceMatrix key={i} matrix={building.matrix} />
  ))}
</InstancedMesh>
```

### 3. **Frustum Culling**
- 화면 밖의 건물은 렌더링하지 않음
- Three.js가 자동으로 처리

## 📝 사용 예시

```tsx
<CityMap3D
  buildings={[
    {
      id: '1',
      residentId: 'resident-1',
      position: [0, 0.5, 0],
      height: 2.5,
      color: '#12061A',
      name: '혜민',
      activity: 85
    },
    // ...
  ]}
  onBuildingClick={(buildingId) => {
    router.push(`/profile/${buildingId}`);
  }}
/>
```

## 🚀 다음 단계

1. 실제 활동 지수 계산 로직 구현
2. 건물 커스터마이징 기능 추가
3. 실시간 업데이트 (Supabase Realtime)
4. 파티클 효과 추가

