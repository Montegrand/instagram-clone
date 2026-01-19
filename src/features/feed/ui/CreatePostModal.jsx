import { useMemo, useState } from "react";
import Input from "@components/Input/Input.jsx";
import "./CreatePostModal.css";

const steps = [
  { id: 1, label: "사진 선택" },
  { id: 2, label: "필터/편집" },
  { id: 3, label: "게시물 작성" },
];

const buildPreview = (file) => {
  if (!file) return "";
  return URL.createObjectURL(file);
};

function CreatePostModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [altText, setAltText] = useState("");
  const [hideMetrics, setHideMetrics] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [shareToThreads, setShareToThreads] = useState(true);

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(file);
    return true;
  }, [step, file]);

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] || null;
    if (preview) URL.revokeObjectURL(preview);
    setFile(nextFile);
    setPreview(nextFile ? buildPreview(nextFile) : "");
  };

  const handleClose = () => {
    if (preview) URL.revokeObjectURL(preview);
    onClose?.();
  };

  const handleNext = () => {
    if (!canNext) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="create-post">
      <header className="create-post__header">
        <h2 id="create-post-title">새 게시물 만들기</h2>
        <div className="create-post__steps">
          {steps.map((item) => (
            <span
              key={item.id}
              className={
                item.id === step
                  ? "create-post__step create-post__step--active"
                  : "create-post__step"
              }
            >
              {item.label}
            </span>
          ))}
        </div>
      </header>

      <section className="create-post__body">
        {step === 1 ? (
          <div className="create-post__panel">
            <p className="create-post__title">사진을 선택하세요</p>
            <label className="create-post__drop">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {preview ? (
                <img src={preview} alt="선택한 이미지 미리보기" />
              ) : (
                <span>여기를 클릭해서 사진을 추가하세요</span>
              )}
            </label>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="create-post__panel">
            <p className="create-post__title">필터/편집</p>
            <div className="create-post__editor">
              {preview ? (
                <img src={preview} alt="편집 대상 이미지" />
              ) : (
                <div className="create-post__placeholder">사진이 없습니다</div>
              )}
              <div className="create-post__filters">
                <button type="button">밝기</button>
                <button type="button">대비</button>
                <button type="button">채도</button>
                <button type="button">따뜻함</button>
              </div>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="create-post__panel">
            <p className="create-post__title">게시물 정보</p>
            <div className="create-post__layout">
              <div className="create-post__preview">
                {preview ? (
                  <img src={preview} alt="게시물 미리보기" />
                ) : (
                  <div className="create-post__placeholder">사진이 없습니다</div>
                )}
              </div>
              <div className="create-post__fields">
                <textarea
                  className="create-post__textarea"
                  rows={4}
                  placeholder="문구를 입력하세요"
                  value={caption}
                  onChange={(event) => setCaption(event.target.value)}
                />
                <Input
                  wrapperClassName="create-post__input"
                  placeholder="위치 추가"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />

                <details className="create-post__accordion">
                  <summary>접근성</summary>
                  <label className="create-post__label">
                    이미지 대체 텍스트
                  </label>
                  <textarea
                    className="create-post__textarea"
                    rows={3}
                    placeholder="대체 텍스트를 입력하세요"
                    value={altText}
                    onChange={(event) => setAltText(event.target.value)}
                  />
                </details>

                <details className="create-post__accordion">
                  <summary>고급 설정</summary>
                  <label className="create-post__toggle">
                    <input
                      type="checkbox"
                      checked={hideMetrics}
                      onChange={(event) => setHideMetrics(event.target.checked)}
                    />
                    <span>이 게시물의 좋아요 수 및 조회수 숨기기</span>
                  </label>
                  <p className="create-post__help">
                    이 게시물의 총 좋아요 및 조회수는 회원님만 볼 수 있습니다.
                    나중에 게시물 상단의 ··· 메뉴에서 이 설정을 변경할 수
                    있습니다. 다른 사람의 게시물에서 좋아요 수를 숨기려면 계정
                    설정으로 이동하세요. 더 알아보기
                  </p>

                  <label className="create-post__toggle">
                    <input
                      type="checkbox"
                      checked={disableComments}
                      onChange={(event) =>
                        setDisableComments(event.target.checked)
                      }
                    />
                    <span>댓글 기능 해제</span>
                  </label>
                  <p className="create-post__help">
                    나중에 게시물 상단의 메뉴(···)에서 이 설정을 변경할 수
                    있습니다.
                  </p>

                  <label className="create-post__toggle">
                    <input
                      type="checkbox"
                      checked={shareToThreads}
                      onChange={(event) =>
                        setShareToThreads(event.target.checked)
                      }
                    />
                    <span>Threads에 자동으로 공유</span>
                  </label>
                  <p className="create-post__help">
                    회원님의 게시물이 항상 Threads에 공유됩니다. Threads 설정에서
                    공개 대상을 변경할 수 있습니다. 더 알아보기
                  </p>
                </details>
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <footer className="create-post__footer">
        <button type="button" onClick={handlePrev} disabled={step === 1}>
          이전
        </button>
        <div className="create-post__actions">
          {step < 3 ? (
            <button type="button" onClick={handleNext} disabled={!canNext}>
              다음
            </button>
          ) : (
            <button type="button">공유</button>
          )}
          <button type="button" className="create-post__ghost" onClick={handleClose}>
            닫기
          </button>
        </div>
      </footer>
    </div>
  );
}

export default CreatePostModal;
