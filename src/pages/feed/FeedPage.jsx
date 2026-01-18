import "./FeedPage.css";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import defaultAvatar from "@/assets/images/avatar-default.png";
import messagesSvg from "@/assets/icons/messages.svg";

import testPicture from "@/assets/images/test-picture.png";

import heartIcon from "@/assets/icons/heart.svg";
import heartFilledIcon from "@/assets/icons/heart-solid.svg";
import commentIcon from "@/assets/icons/comment.svg";
import saveIcon from "@/assets/icons/save.svg";
import saveFilledIcon from "@/assets/icons/save-solid.svg";
import moreIcon from "@/assets/icons/more.svg";

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

  // 더미 게시글
  const post = useMemo(
    () => ({
      id: "post-1",
      username: "닉네임",
      avatarUrl: "",
      imageUrl: testPicture,
      likeCount: 123,
      caption:
        "여기는 테스트 캡션입니다. 길어질 경우 ... 더보기를 눌러 전체가 펼쳐지도록",
    }),
    []
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isCaptionExpanded, setIsCaptionExpanded] = useState(false);

  const postAvatarSrc = post.avatarUrl?.trim() ? post.avatarUrl : defaultAvatar;
  const displayedLikeCount = post.likeCount + (isLiked ? 1 : 0);

  return (
    <main className="feed-page">
      <div className="feed-page__container">
        <section className="feed-page__timeline" aria-label="Feed">
          <article className="feed-card" aria-label="Post">
            <header className="feed-card__header">
              <div className="feed-card__author">
                <img className="feed-card__avatar" src={postAvatarSrc} alt="" />
                <div className="feed-card__username">{post.username}</div>
              </div>

              <button className="icon-btn" type="button" aria-label="More">
                <img className="icon-img" src={moreIcon} alt="" />
              </button>
            </header>

            <div className="feed-card__media">
              <img className="feed-card__image" src={post.imageUrl} alt="" />
            </div>

            <div className="feed-card__actions">
              <div className="feed-card__actions-left">
                <button
                  className="icon-btn"
                  type="button"
                  aria-label="Like"
                  onClick={() => setIsLiked((v) => !v)}
                >
                  <img
                    className="icon-img"
                    src={isLiked ? heartFilledIcon : heartIcon}
                    alt=""
                  />
                </button>

                <button className="icon-btn" type="button" aria-label="Comment">
                  <img className="icon-img" src={commentIcon} alt="" />
                </button>

                <button className="icon-btn" type="button" aria-label="Share">
                  <img className="icon-img" src={messagesSvg} alt="" />
                </button>
              </div>

              <button
                className="icon-btn"
                type="button"
                aria-label="Save"
                onClick={() => setIsSaved((v) => !v)}
              >
                <img
                  className="icon-img"
                  src={isSaved ? saveFilledIcon : saveIcon}
                  alt=""
                />
              </button>
            </div>

            <div className="feed-card__likes">
              좋아요 {displayedLikeCount}개
            </div>

            <div className="feed-card__caption">
              <span className="feed-card__caption-username">
                {post.username}
              </span>{" "}
              <span className={isCaptionExpanded ? "" : "caption-clamp"}>
                {post.caption}
              </span>
              {!isCaptionExpanded && (
                <>
                  {" "}
                  <button
                    className="caption-more"
                    type="button"
                    onClick={() => setIsCaptionExpanded(true)}
                  >
                    ... 더보기
                  </button>
                </>
              )}
            </div>
          </article>
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

      <button className="feed-message-bar" type="button" aria-label="Messages">
        <img className="feed-message-bar__icon" src={messagesSvg} alt="" />
        <span className="feed-message-bar__text">메시지</span>
      </button>
    </main>
  );
}

export default FeedPage;
