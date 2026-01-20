import { useCreatePostModal } from "@features/feed/hooks";
import CreatePostStepSelect from "./create-post/CreatePostStepSelect.jsx";
import CreatePostStepEdit from "./create-post/CreatePostStepEdit.jsx";
import CreatePostStepFinal from "./create-post/CreatePostStepFinal.jsx";
import "./CreatePostModal.css";

function CreatePostModal({ onClose }) {
  const {
    step,
    canNext,
    isFinalStep,
    headerTitle,
    primaryActionLabel,
    preview,
    zoom,
    isZoomOpen,
    isDragging,
    filters,
    activeFilter,
    activeTab,
    activeFilterStrength,
    previewFilterCss,
    adjustmentConfig,
    adjustments,
    vignetteOpacity,
    uploadStatus,
    caption,
    location,
    altText,
    hideMetrics,
    disableComments,
    shareToThreads,
    handleNext,
    handlePrev,
    handleToggleZoom,
    handleZoomChange,
    handleFileChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleSetTab,
    handleCaptionChange,
    handleLocationChange,
    handleAltTextChange,
    handleHideMetricsChange,
    handleDisableCommentsChange,
    handleShareToThreadsChange,
    handleResetFilter,
    handleSelectFilter,
    handleFilterStrengthChange,
    handleAdjustmentChange,
    handleShare,
  } = useCreatePostModal();

  const handlePrimaryAction = async () => {
    if (step < 3) {
      handleNext();
      return;
    }

    const result = await handleShare();
    if (result?.ok) {
      onClose?.();
    }
  };

  return (
    <div className="create-post">
      <header className="create-post__header">
        <div className="create-post__header-side">
          {step > 1 ? (
            <button type="button" className="create-post__back" onClick={handlePrev}>
              이전
            </button>
          ) : null}
        </div>
        <h2 id="create-post-title" className="create-post__heading">
          {headerTitle}
        </h2>
        <div className="create-post__header-side create-post__header-side--right">
          <button
            type="button"
            className="create-post__primary"
            onClick={handlePrimaryAction}
            disabled={(isFinalStep ? uploadStatus.loading : !canNext)}
          >
            {primaryActionLabel}
          </button>
        </div>
      </header>

      <section className="create-post__body">
        {step === 1 ? (
          <CreatePostStepSelect
            preview={preview}
            zoom={zoom}
            isZoomOpen={isZoomOpen}
            isDragging={isDragging}
            onToggleZoom={handleToggleZoom}
            onZoomChange={handleZoomChange}
            onResetFilter={handleResetFilter}
            onFileChange={handleFileChange}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ) : null}

        {step === 2 ? (
          <CreatePostStepEdit
            preview={preview}
            zoom={zoom}
            isZoomOpen={isZoomOpen}
            filters={filters}
            activeFilter={activeFilter}
            activeTab={activeTab}
            activeFilterStrength={activeFilterStrength}
            previewFilterCss={previewFilterCss}
            adjustmentConfig={adjustmentConfig}
            adjustments={adjustments}
            vignetteOpacity={vignetteOpacity}
            onToggleZoom={handleToggleZoom}
            onZoomChange={handleZoomChange}
            onResetFilter={handleResetFilter}
            onSelectFilter={handleSelectFilter}
            onSelectTab={handleSetTab}
            onFilterStrengthChange={handleFilterStrengthChange}
            onAdjustmentChange={handleAdjustmentChange}
          />
        ) : null}

        {step === 3 ? (
          <CreatePostStepFinal
            preview={preview}
            previewFilterCss={previewFilterCss}
            vignetteOpacity={vignetteOpacity}
            caption={caption}
            location={location}
            altText={altText}
            hideMetrics={hideMetrics}
            disableComments={disableComments}
            shareToThreads={shareToThreads}
            onCaptionChange={handleCaptionChange}
            onLocationChange={handleLocationChange}
            onAltTextChange={handleAltTextChange}
            onHideMetricsChange={handleHideMetricsChange}
            onDisableCommentsChange={handleDisableCommentsChange}
            onShareToThreadsChange={handleShareToThreadsChange}
          />
        ) : null}
      </section>
    </div>
  );
}

export default CreatePostModal;
