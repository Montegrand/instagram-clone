import "./FeedPostCard.css";

const getPrimaryImage = (images) => {
  if (!Array.isArray(images)) return "";
  return images[0] || "";
};

const formatCreatedAt = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof Date) {
    return value.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return "";
};

function FeedPostCard({ post, onOpen }) {
  if (!post) return null;

  const {
    username,
    profileImageUrl,
    imageUrls,
    caption,
    likeCount,
    commentCount,
    location,
    createdAt,
  } = post;

  const primaryImage = getPrimaryImage(imageUrls);
  const displayLikes = Number.isFinite(likeCount) ? likeCount : 0;
  const displayComments = Number.isFinite(commentCount) ? commentCount : 0;
  const displayCreatedAt = formatCreatedAt(createdAt);

  return (
    <article className="feed-post-card">
      <header className="feed-post-card__header">
        <div className="feed-post-card__profile">
          <img
            className="feed-post-card__avatar"
            src={profileImageUrl || "/images/profile/default-avatar.png"}
            alt=""
          />
          <div className="feed-post-card__meta">
            <span className="feed-post-card__username">{username || "user"}</span>
            {location ? (
              <span className="feed-post-card__location">{location}</span>
            ) : null}
          </div>
        </div>
        <button className="feed-post-card__more" type="button">
          더 보기
        </button>
      </header>

      <button
        className="feed-post-card__media"
        type="button"
        onClick={onOpen}
      >
        {primaryImage ? (
          <img src={primaryImage} alt="" />
        ) : (
          <div className="feed-post-card__placeholder">이미지가 없습니다</div>
        )}
      </button>

      <div className="feed-post-card__actions">
        <div className="feed-post-card__actions-left">
          <button type="button">
            <svg aria-label="좋아요" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>좋아요</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>
            {/* svg from instagram */}
            좋아요
          </button>
          <button type="button">
            <svg aria-label="댓글 달기" class="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>댓글 달기</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
            {/* svg from instagram */}
            댓글
          </button>
          <button type="button">
            <svg aria-label="공유하기" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>공유하기</title><path d="M13.973 20.046 21.77 6.928C22.8 5.195 21.55 3 19.535 3H4.466C2.138 3 .984 5.825 2.646 7.456l4.842 4.752 1.723 7.121c.548 2.266 3.571 2.721 4.762.717Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="7.488" x2="15.515" y1="12.208" y2="7.641"></line></svg>
            {/* svg from instagram */}
          </button>
        </div>
        <button type="button">
          <svg aria-label="저장" class="x1lliihq x1n2onr6 xyb1xck" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>저장</title><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
          {/* svg from instagram */}
        </button>
      </div>

      <div className="feed-post-card__stats">
        <span>좋아요 {displayLikes}개</span>
      </div>

      <div className="feed-post-card__caption">
        <span className="feed-post-card__username">{username || "user"}</span>
        <p>{caption || "게시물 설명이 아직 없습니다."}</p>
      </div>

      <div className="feed-post-card__comments">
        댓글 {displayComments}개 모두 보기
      </div>

      {displayCreatedAt ? (
        <div className="feed-post-card__timestamp">{displayCreatedAt}</div>
      ) : null}
    </article>
  );
}

export default FeedPostCard;
