import RangeInput from "@components/Range/RangeInput.jsx";
import "./CreatePostStepEdit.css";

function CreatePostStepEdit({
  preview,
  zoom,
  isZoomOpen,
  filters,
  activeFilter,
  activeTab,
  activeFilterStrength,
  previewFilterCss,
  adjustmentConfig,
  adjustments,
  vignetteOpacity,
  onToggleZoom,
  onZoomChange,
  onResetFilter,
  onSelectFilter,
  onSelectTab,
  onFilterStrengthChange,
  onAdjustmentChange,
}) {
  const isAdjustTab = activeTab === "adjust";
  const vignetteStyle = { "--vignette-opacity": vignetteOpacity };

  return (
    <div className="create-post__panel create-post__panel--edit">
      <div className="create-post__workbench">
        <div className="create-post__canvas" style={vignetteStyle}>
          {preview ? (
            <img
              src={preview}
              alt="편집 대상 이미지"
              style={{
                transform: `scale(${zoom})`,
                filter: previewFilterCss,
              }}
            />
          ) : (
            <div className="create-post__placeholder">사진이 없습니다</div>
          )}
          <div className="create-post__canvas-actions create-post__canvas-actions--left">
            <button type="button" disabled>
              자르기
            </button>
            <button type="button" aria-pressed={isZoomOpen} onClick={onToggleZoom}>
              확대/축소
            </button>
          </div>
          <div className="create-post__canvas-actions create-post__canvas-actions--right">
            <button type="button" onClick={onResetFilter}>
              원본
            </button>
          </div>
          {isZoomOpen ? (
            <div className="create-post__zoom">
              <input
                type="range"
                min="1"
                max="2"
                step="0.01"
                value={zoom}
                onChange={onZoomChange}
              />
            </div>
          ) : null}
        </div>
        <aside
          className={`create-post__sidebar${
            isAdjustTab ? " create-post__sidebar--adjust" : ""
          }`}
        >
          <div className="create-post__tabs">
            <button
              type="button"
              className={`create-post__tab${
                activeTab === "filter" ? " create-post__tab--active" : ""
              }`}
              onClick={() => onSelectTab("filter")}
            >
              필터
            </button>
            <button
              type="button"
              className={`create-post__tab${
                activeTab === "adjust" ? " create-post__tab--active" : ""
              }`}
              onClick={() => onSelectTab("adjust")}
            >
              조정
            </button>
          </div>
          <div className="create-post__filter-grid">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`create-post__filter${
                  activeFilter === filter.id ? " create-post__filter--active" : ""
                }`}
                onClick={() => onSelectFilter(filter.id)}
              >
                <span
                  className="create-post__filter-thumb"
                  aria-hidden="true"
                  style={
                    preview
                      ? {
                          backgroundImage: `url(${preview})`,
                          filter: filter.css,
                        }
                      : undefined
                  }
                />
                <span className="create-post__filter-name">{filter.label}</span>
              </button>
            ))}
          </div>
          {activeFilter !== "normal" ? (
            <RangeInput
              className="create-post__filter-strength"
              label="Intensity"
              min={0}
              max={100}
              value={activeFilterStrength}
              onChange={onFilterStrengthChange}
            />
          ) : null}
          <div className="create-post__adjust-list">
            {adjustmentConfig.map((adjustment) => (
              <RangeInput
                key={adjustment.id}
                label={adjustment.label}
                min={adjustment.min}
                max={adjustment.max}
                step={1}
                value={adjustments[adjustment.id]}
                onChange={(nextValue) =>
                  onAdjustmentChange(adjustment.id, nextValue)
                }
                showReset={adjustments[adjustment.id] !== 0}
                resetLabel="재조정"
                onReset={() => onAdjustmentChange(adjustment.id, 0)}
              />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CreatePostStepEdit;
