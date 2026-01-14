import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import SearchPanel from "@components/SearchPanel.jsx";
import "./RootLayout.css";

function RootLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="root-layout">
      <header className="root-header">
        <div className="root-header__inner">
          <div className="root-header__brand">
            <Link className="root-header__logo" to="/">
              Instagram Clone
            </Link>
          </div>
          <nav className="root-nav" aria-label="Primary">
            <Link className="root-nav__item" to="/">
              홈
            </Link>
            <button
              className="root-nav__item root-nav__search-trigger"
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              검색
            </button>
            <Link className="root-nav__item" to="/explore">
              탐색 탭
            </Link>
            <Link className="root-nav__item" to="/reels">
              릴스
            </Link>
            <Link className="root-nav__item" to="/direct/inbox">
              메시지
            </Link>
            <Link className="root-nav__item" to="/notifications">
              알림
            </Link>
            <button className="root-nav__item" type="button">
              만들기
            </button>
            <div className="root-nav__profile">
              <img
                className="root-nav__avatar"
                src="https://via.placeholder.com/28"
                alt="honggihyeon98 profile"
              />
              <Link className="root-nav__item" to="/account/profile">
                프로필
              </Link>
            </div>
          </nav>
          <div className="root-gnb" aria-label="Global">
            <button className="root-gnb__item" type="button">
              더 보기
            </button>
            <button className="root-gnb__item" type="button">
              Meta의 다른 앱
            </button>
          </div>
        </div>
      </header>
      {isSearchOpen ? <SearchPanel /> : null}
      <main className="root-content">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
