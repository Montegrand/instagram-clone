import "./FeedPage.css";
import { Link } from "react-router-dom";
import defaultAvatar from "@/assets/images/avatar-default.png";

function FeedPage() {
  const me = {
    username: "닉네임",
    name: "이름",
    photoURL: "",
  };

  const suggestedUsers = [
    { username: "닉네임1" },
    { username: "닉네임2" },
    { username: "닉네임3" },
    { username: "닉네임4" },
    { username: "닉네임5" },
  ].slice(0, 5);

  const myAvatarSrc = me.photoURL?.trim() ? me.photoURL : defaultAvatar;

  return (
    <main className="feed-page">
      <div className="feed-page__container">
        <section className="feed-page__timeline" aria-label="Feed">
          <div className="feed-page__placeholder">Feed</div>
        </section>

        <aside className="feed-page__sidebar" aria-label="Recommendations">
          <div className="sidebar-card sidebar-me">
            <img className="sidebar-me__avatar" src={myAvatarSrc} alt="" />
            <div className="sidebar-me__meta">
              <Link className="sidebar-me__username-link" to="/profile">
                {me.username}
              </Link>
              <div className="sidebar-me__name">{me.name}</div>
            </div>
            <button className="sidebar-link" type="button">
              전환
            </button>
          </div>

          <div className="sidebar-row sidebar-suggest-header">
            <div className="sidebar-suggest-header__title">
              회원님을 위한 추천
            </div>
            <button className="sidebar-link sidebar-link--dark" type="button">
              모두 보기
            </button>
          </div>

          <ul className="suggest-list" aria-label="Suggested accounts">
            {suggestedUsers.map((u) => (
              <li className="suggest-item" key={u.username}>
                <img
                  className="suggest-item__avatar"
                  src={defaultAvatar}
                  alt=""
                />
                <div className="suggest-item__username">{u.username}</div>
                <button className="follow-btn" type="button">
                  팔로우
                </button>
              </li>
            ))}
          </ul>

          <div className="sidebar-footer" aria-label="Footer links">
            <div className="footer-links">
              {[
                "소개",
                "도움말",
                "홍보 센터",
                "API",
                "채용 정보",
                "개인정보처리방침",
                "약관",
                "위치",
                "언어",
                "Meta Verified",
              ].map((label) => (
                <button className="footer-link" type="button" key={label}>
                  {label}
                </button>
              ))}
            </div>
            <div className="footer-copy">© 2026 INSTAGRAM FROM META</div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default FeedPage;
