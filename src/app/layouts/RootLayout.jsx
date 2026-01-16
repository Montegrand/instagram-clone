import { useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import "./RootLayout.css";
import {
  homeIcon,
  homeActiveIcon,
  searchIcon,
  searchActiveIcon,
  exploreIcon,
  exploreActiveIcon,
  reelsIcon,
  reelsActiveIcon,
  messagesIcon,
  messagesActiveIcon,
  notificationsIcon,
  notificationsActiveIcon,
  createIcon,
//   createActiveIcon,
  menuIcon,
  appsIcon,
} from "@/assets/icons";

function RootLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="root-layout">
      <header className="root-header">
        <div className="root-header__inner">
          <div className="root-header__brand">
            <Link className="root-header__logo" to="/">
              Instagram Clone {/* 인스타그램 사진 */}
            </Link>
          </div>
          <nav className="root-nav" aria-label="Primary">
            <NavLink className="root-nav__item" to="/" end>
              {({ isActive }) => (
                <>
                  <img
                    className="root-nav__icon"
                    src={isActive ? homeActiveIcon : homeIcon}
                    alt=""
                  />
                  <span>홈</span>
                </>
              )}
            </NavLink>

            <button
              className="root-nav__item"
              type="button"
              onClick={() => setIsSearchOpen((prev) => !prev)}
            >
              <img
                className="root-nav__icon"
                src={isSearchOpen ? searchActiveIcon : searchIcon}
                alt=""
              />
              <span>검색</span>
            </button>

            <NavLink className="root-nav__item" to="/explore">
              {({ isActive }) => (
                <>
                  <img
                    className="root-nav__icon"
                    src={isActive ? exploreActiveIcon : exploreIcon}
                    alt=""
                  />
                  <span>탐색 탭</span>
                </>
              )}
            </NavLink>

            <NavLink className="root-nav__item" to="/reels">
              {({ isActive }) => (
                <>
                  <img
                    className="root-nav__icon"
                    src={isActive ? reelsActiveIcon : reelsIcon}
                    alt=""
                  />
                  <span>릴스</span>
                </>
              )}
            </NavLink>

            <NavLink className="root-nav__item" to="/direct/inbox">
              {({ isActive }) => (
                <>
                  <img
                    className="root-nav__icon"
                    src={isActive ? messagesActiveIcon : messagesIcon}
                    alt=""
                  />
                  <span>메시지</span>
                </>
              )}
            </NavLink>

            <NavLink className="root-nav__item" to="/notifications">
              {({ isActive }) => (
                <>
                  <img
                    className="root-nav__icon"
                    src={isActive ? notificationsActiveIcon : notificationsIcon}
                    alt=""
                  />
                  <span>알림</span>
                </>
              )}
            </NavLink>

            <button className="root-nav__item" type="button">
              <img className="root-nav__icon" src={createIcon} alt="" />
              <span>만들기</span>
            </button>

            <div className="root-nav__profile">
              <img
                className="root-nav__avatar"
                src="https://via.placeholder.com/28"
                alt=""
              />
              <Link className="root-nav__item" to="/account/profile">
                프로필 {/* 프로필 사진 삽입 미구현 */}
              </Link>
            </div>
          </nav>

          <div className="root-gnb" aria-label="Global">
            <button className="root-gnb__item" type="button">
              <img className="root-nav__icon" src={menuIcon} alt="" />
              <span>더 보기</span>
            </button>

            <button className="root-gnb__item" type="button">
              <img className="root-nav__icon" src={appsIcon} alt="" />
              <span>Meta의 다른 앱</span>
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
