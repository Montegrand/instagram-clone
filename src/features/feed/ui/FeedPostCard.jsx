import "./FeedPostCard.css";

const getPrimaryImage = (images) => {
  if (!Array.isArray(images)) return "";
  return images[0] || "";
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

  return (
    <article className="feed-post-card">
      <header className="feed-post-card__header">
        <div className="feed-post-card__profile">
          <img
            className="feed-post-card__avatar"
            src={profileImageUrl || "https://via.placeholder.com/36"}
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
          <button type="button">좋아요</button>
          <button type="button">댓글</button>
          <button type="button">공유</button>
        </div>
        <button type="button">저장</button>
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

      {createdAt ? (
        <div className="feed-post-card__timestamp">{createdAt}</div>
      ) : null}
    </article>
  );
}

export default FeedPostCard;
