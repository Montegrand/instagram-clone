import "./FeedPostModalContent.css";

const getPrimaryImage = (images) => {
  if (!Array.isArray(images)) return "";
  return images[0] || "";
};

function FeedPostModalContent({ post }) {
  if (!post) return null;

  const {
    username,
    profileImageUrl,
    imageUrls,
    caption,
    likeCount,
    commentCount,
    location,
  } = post;

  const primaryImage = getPrimaryImage(imageUrls);
  const displayLikes = Number.isFinite(likeCount) ? likeCount : 0;
  const displayComments = Number.isFinite(commentCount) ? commentCount : 0;

  return (
    <div className="feed-post-modal">
      <div className="feed-post-modal__media">
        {primaryImage ? (
          <img src={primaryImage} alt="" />
        ) : (
          <div className="feed-post-modal__placeholder">이미지가 없습니다</div>
        )}
      </div>
      <div className="feed-post-modal__body">
        <header className="feed-post-modal__header">
          <div className="feed-post-modal__profile">
            <img
              className="feed-post-modal__avatar"
              src={profileImageUrl || "https://via.placeholder.com/36"}
              alt=""
            />
            <div>
              <div className="feed-post-modal__username">
                {username || "user"}
              </div>
              {location ? (
                <div className="feed-post-modal__location">{location}</div>
              ) : null}
            </div>
          </div>
        </header>

        <div className="feed-post-modal__caption">
          <span className="feed-post-modal__username">{username || "user"}</span>
          <p>{caption || "게시물 설명이 아직 없습니다."}</p>
        </div>

        <div className="feed-post-modal__stats">
          <span>좋아요 {displayLikes}개</span>
          <span>댓글 {displayComments}개</span>
        </div>

        <div className="feed-post-modal__actions">
          <button type="button">좋아요</button>
          <button type="button">댓글</button>
          <button type="button">공유</button>
          <button type="button">저장</button>
        </div>
      </div>
    </div>
  );
}

export default FeedPostModalContent;
