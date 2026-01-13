# 아키텍처

[README](README.md) | [아키텍처](README_%20Architecture.md)

## 개요
React + Vite 기반 프론트와 Firebase(Auth/Firestore/Storage)를 사용합니다. 피드는 텍스트와 이미지 업로드를 포함합니다.

## 디렉토리 구조
```
src/
  app/            # App shell, 라우팅, 전역 프로바이더
    layouts/      # 공통 레이아웃
    route/        # 라우팅 구성
    providers/    # 전역 프로바이더/미들웨어
  pages/          # 페이지별 디렉토리 (feed, explore, reels, direct, notifications, auth, account)
  components/     # 공용 UI 컴포넌트 (SearchPanel 등)
  features/       # 도메인별 기능 묶음 (feed, auth, profile, search)
  services/       # Firebase 초기화 및 API 래퍼 (apiClient/endpoints/firebaseClient)
  store/          # 전역 상태 (Redux)
  hooks/          # 커스텀 훅
  styles/         # 전역 스타일
  assets/         # 이미지/아이콘
```

## 라우팅
- `/` 피드
- `/login`, `/signup`
- `/explore`
- `/reels`
- `/direct/inbox`
- `/notifications`
- `/account/profile`

## 검색 구성
- 검색은 라우터가 아닌 헤더 메뉴에서 토글되는 컴포넌트로 구성

## 상태 관리
- 로그인 사용자: 전역 상태 (Redux Toolkit)
- 유저 상태 슬라이스: uid, username, nickname, email, photoURL, bio
- 피드/검색: 로컬 상태 + 캐시 전략

## 경로 별칭
- `@`: `src`
- `@app`, `@pages`, `@components`, `@styles`, `@services`, `@store`, `@hooks`, `@assets`

## Firebase 사용 범위
- Auth: 회원가입/로그인/로그아웃
- Firestore: users, posts, follows
- Storage: 피드 이미지, 프로필 이미지

## 데이터 모델 (초안)
- `users/{uid}`: username, nickname, bio, photoURL, createdAt
- `posts/{postId}`: uid, text, imageURL, createdAt
- `follows/{uid}/following/{targetUid}` (선택)

## 보안 규칙 (초안)
- users: 본인만 수정 가능
- posts: 작성자만 수정/삭제 가능

## 배포
- Vercel 단일 프로젝트
- 환경 변수: Firebase config
