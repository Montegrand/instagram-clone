import { useSelector } from "react-redux";
import Input from "@components/Input/Input.jsx";
import Avatar from "@components/ui/Avatar/Avatar.jsx";
import "./CreatePostStepFinal.css";

function CreatePostStepFinal({
  preview,
  previewFilterCss,
  vignetteOpacity,
  caption,
  location,
  altText,
  hideMetrics,
  disableComments,
  shareToThreads,
  onCaptionChange,
  onLocationChange,
  onAltTextChange,
  onHideMetricsChange,
  onDisableCommentsChange,
  onShareToThreadsChange,
}) {
  const vignetteStyle = { "--vignette-opacity": vignetteOpacity };
  const { username, nickname, photoURL } = useSelector((state) => state.user);
  const displayName = nickname || username || "사용자";

  return (
    <div className="create-post__panel create-post__panel--final">
      <div className="create-post__final">
        <div className="create-post__final-preview" style={vignetteStyle}>
          {/* <div className="create-post__tag-hint">
            사람을 태그하려면 사진을 클릭하세요
          </div> */}
          {preview ? (
            <img
              src={preview}
              alt="게시물 미리보기"
              style={{ filter: previewFilterCss }}
            />
          ) : (
            <div className="create-post__placeholder">사진이 없습니다</div>
          )}
        </div>
        <aside className="create-post__fields">
          <div className="create-post__user">
            <Avatar
              src={photoURL}
              alt={displayName}
              size={32}
              className="create-post__avatar"
            />
            <span className="create-post__username">{displayName}</span>
          </div>
          <div className="create-post__caption">
            <textarea
              className="create-post__textarea"
              rows={4}
              placeholder="문구를 입력하세요"
              value={caption}
              onChange={onCaptionChange}
            />
            <div className="create-post__caption-meta">
              <button type="button" className="create-post__emoji">
                이모티콘
              </button>
              <span className="create-post__counter">{caption.length}/2200</span>
            </div>
          </div>
          <Input
            wrapperClassName="create-post__input"
            placeholder="위치 추가 (준비중)"
            value={location}
            onChange={onLocationChange}
            disabled
          />

          <details className="create-post__accordion">
            <summary>접근성</summary>
            <label className="create-post__label">이미지 대체 텍스트</label>
            <textarea
              className="create-post__textarea create-post__textarea--full"
              rows={3}
              placeholder="대체 텍스트를 입력하세요"
              value={altText}
              onChange={onAltTextChange}
            />
          </details>

          <details className="create-post__accordion">
            <summary>고급 설정</summary>
            <label className="create-post__toggle">
              <input
                type="checkbox"
                checked={hideMetrics}
                onChange={onHideMetricsChange}
              />
              <span>이 게시물의 좋아요 수 및 조회수 숨기기</span>
            </label>
            <p className="create-post__help">
              이 게시물의 총 좋아요 및 조회수는 회원님만 볼 수 있습니다. 나중에
              게시물 상단의 ··· 메뉴에서 이 설정을 변경할 수 있습니다. 다른
              사람의 게시물에서 좋아요 수를 숨기려면 계정 설정으로 이동하세요.
              더 알아보기
            </p>

            <label className="create-post__toggle">
              <input
                type="checkbox"
                checked={disableComments}
                onChange={onDisableCommentsChange}
              />
              <span>댓글 기능 해제</span>
            </label>
            <p className="create-post__help">
              나중에 게시물 상단의 메뉴(···)에서 이 설정을 변경할 수 있습니다.
            </p>

            <label className="create-post__toggle">
              <input
                type="checkbox"
                checked={shareToThreads}
                onChange={onShareToThreadsChange}
              />
              <span>Threads에 자동으로 공유</span>
            </label>
            <p className="create-post__help">
              회원님의 게시물이 항상 Threads에 공유됩니다. Threads 설정에서 공개
              대상을 변경할 수 있습니다. 더 알아보기
            </p>
          </details>
        </aside>
      </div>
    </div>
  );
}

export default CreatePostStepFinal;
