import Input from "@components/Input/Input.jsx";
import "./FeedUploadForm.css";

function FeedUploadForm({
  caption,
  location,
  previews,
  status,
  onCaptionChange,
  onLocationChange,
  onFilesChange,
  onSubmit,
}) {
  return (
    <form className="feed-upload" onSubmit={onSubmit}>
      <div className="feed-upload__field">
        <label className="feed-upload__label" htmlFor="feed-upload-files">
          사진 선택
        </label>
        <input
          id="feed-upload-files"
          className="feed-upload__file"
          type="file"
          accept="image/*"
          multiple
          onChange={onFilesChange}
        />
      </div>

      {previews?.length ? (
        <div className="feed-upload__previews">
          {previews.map((preview) => (
            <img
              key={preview.url}
              src={preview.url}
              alt="업로드 미리보기"
            />
          ))}
        </div>
      ) : null}

      <Input
        label="캡션"
        name="caption"
        placeholder="문구를 입력하세요"
        value={caption}
        onChange={onCaptionChange}
        wrapperClassName="feed-upload__field"
      />

      <Input
        label="위치"
        name="location"
        placeholder="위치 추가"
        value={location}
        onChange={onLocationChange}
        wrapperClassName="feed-upload__field"
      />

      {status?.error ? (
        <p className="feed-upload__error">{status.error}</p>
      ) : null}

      <button
        className="feed-upload__submit"
        type="submit"
        disabled={status?.loading}
      >
        {status?.loading ? "업로드 중..." : "게시하기"}
      </button>
    </form>
  );
}

export default FeedUploadForm;
