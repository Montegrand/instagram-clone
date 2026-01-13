# 인스타그램 클론코딩

[README](README.md) | [Architecture](README_%20Architecture.md)

## 프로젝트 개요
- 주제: 인스타그램 클론코딩
- 기간: 1주
- 인원: 3인
- 피드 게시: 텍스트 + 이미지

## 구현 기능
- 회원가입
- 로그인
- 피드 게시
- 유저 검색
- 프로필

## 기술 스택
- 형상관리: GitHub
- 프론트엔드: React, Vite
- 백엔드/인증/DB: Firebase (Auth, Firestore, Storage)
- 배포: Vercel

## 역할 분담
- 박제하: API
- 조건우: 화면(UI)
- 홍기현: 아키텍처

## 문서
- 아키텍처 상세: [README_%20Architecture.md](README_%20Architecture.md)

## 현재 진행 상황
- 라우팅 구성 완료 (루트/탐색/릴스/메시지/알림/로그인/회원가입/계정-프로필)
- 공통 레이아웃 분리 완료 (`RootLayout`) 및 헤더 네비 구성
- 검색 패널 컴포넌트 구성 (라우터 제외, 메뉴 토글 방식)
- 페이지별 디렉토리 구조로 정리 (feed/explore/reels/direct/notifications/auth/account)
- Vite 경로 alias 설정 적용 (`@`, `@pages`, `@components` 등)
- Redux 스토어 및 유저 상태 슬라이스 구성
- 상태 변경 로거 미들웨어 적용
- 유저 관리 미들웨어 자리 잡기 완료(주석 처리)
- Firebase 패키지 설치 및 서비스 파일 플레이스홀더 구성

## 실행
```bash
npm install
npm run dev
```
