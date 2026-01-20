import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@services/firebaseClient.js";
import Modal from "@components/Modal/Modal.jsx";
import { CreatePostModal } from "@features/feed";
import SearchPanel from "@/components/SearchPanel/SearchPanel";
import defaultAvatar from "@/assets/images/avatar-default.png";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, status } = useSelector((state) => state.user);
  const isAuthRequired = status !== "loading" && !isAuthenticated;

  const handleLogout = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleAuthFallback = () => {
    navigate("/");
  };

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
            <NavLink className="root-nav__item" to="/feed" end>
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

            <button
              className="root-nav__item"
              type="button"
              onClick={() => setIsCreateOpen(true)}
            >
              <img className="root-nav__icon" src={createIcon} alt="" />
              <span>만들기</span>
            </button>

            <NavLink className="root-nav__item" to="/account/profile">
              {({ isActive }) => (
                <>
                  <img
                    className={`root-nav__avatar ${
                      isActive ? "is-active" : ""
                    }`}
                    src={defaultAvatar}
                    alt=""
                  />
                  <span>프로필</span>
                </>
              )}
            </NavLink>
          </nav>

          <div className="root-gnb" aria-label="Global">
            <button
              className="root-gnb__item"
              type="button"
              aria-expanded={isMenuOpen}
              aria-controls="root-gnb-modal-panel"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
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
      {isMenuOpen && !isAuthRequired ? (
        <div
          className="root-gnb-modal"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            id="root-gnb-modal-panel"
            className="root-gnb-modal__panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="root-gnb-modal__item" type="button">
              설정
            </button>
            <button className="root-gnb-modal__item" type="button">
              내활동
            </button>
            <button className="root-gnb-modal__item" type="button">
              저장됨
            </button>
            <button className="root-gnb-modal__item" type="button">
              모드전환
            </button>
            <button className="root-gnb-modal__item" type="button">
              문제신고
            </button>
            <div className="root-gnb-modal__divider" />
            <button className="root-gnb-modal__item" type="button">
              계정전환
            </button>
            <button
              className="root-gnb-modal__item root-gnb-modal__item--danger"
              type="button"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      ) : null}
      <Modal
        open={isAuthRequired}
        titleId="auth-required-title"
        onClose={handleAuthFallback}
      >
        <header className="root-auth-modal__header">
          <h2 id="auth-required-title">로그인이 필요합니다</h2>
        </header>
        <div className="root-auth-modal__body">
          <p>이 페이지에 접근하려면 로그인해야 합니다.</p>
        </div>
        <div className="root-auth-modal__actions">
          <button type="button" onClick={handleAuthFallback}>
            로그인 페이지로 이동
          </button>
        </div>
      </Modal>
      <Modal
        open={isCreateOpen && !isAuthRequired}
        titleId="create-post-title"
        onClose={() => setIsCreateOpen(false)}
        dialogClassName="modal__dialog--create-post"
        showClose
        closeLabel="닫기"
      >
        <CreatePostModal onClose={() => setIsCreateOpen(false)} />
      </Modal>
    </div>
  );
}

export default RootLayout;
