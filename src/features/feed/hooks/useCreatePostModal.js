import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@services/firebaseClient.js";

const OUTPUT_IMAGE_TYPE = "image/jpeg";
const OUTPUT_IMAGE_QUALITY = 0.92;

const buildPreview = (file) => {
  if (!file) return "";
  return URL.createObjectURL(file);
};

const filters = [
  { id: "normal", label: "원본", css: "none" },
  { id: "aden", label: "Aden", css: "brightness(1.05) contrast(0.9) saturate(1.2)" },
  { id: "clarendon", label: "Clarendon", css: "contrast(1.2) saturate(1.35)" },
  { id: "crema", label: "Crema", css: "sepia(0.2) contrast(0.95) saturate(1.1)" },
  { id: "gingham", label: "Gingham", css: "contrast(0.9) brightness(1.05) sepia(0.15)" },
  { id: "juno", label: "Juno", css: "saturate(1.3) contrast(1.1)" },
  { id: "lark", label: "Lark", css: "contrast(1.1) saturate(1.2)" },
  { id: "ludwig", label: "Ludwig", css: "contrast(1.1) saturate(1.1)" },
  { id: "moon", label: "Moon", css: "grayscale(1) contrast(1.1) brightness(1.1)" },
  { id: "valen", label: "발렌", css: "sepia(0.25) saturate(1.2) brightness(1.05)" },
  { id: "perpetua", label: "Perpetua", css: "contrast(0.95) saturate(1.1)" },
  { id: "reyes", label: "Reyes", css: "sepia(0.2) contrast(0.85) brightness(1.1)" },
  { id: "slumber", label: "Slumber", css: "saturate(0.8) contrast(1.05)" },
];

const filterStrengthDefaults = Object.fromEntries(
  filters.map((filter) => [filter.id, 100]),
);

const adjustmentConfig = [
  { id: "brightness", label: "밝기", min: -100, max: 100 },
  { id: "contrast", label: "대비", min: -100, max: 100 },
  { id: "blur", label: "흐리게", min: -100, max: 100 },
  { id: "saturate", label: "채도", min: -100, max: 100 },
  { id: "temperature", label: "온도", min: -100, max: 100 },
  { id: "vignette", label: "주위 어둡게", min: 0, max: 100 },
];

const adjustmentDefaults = Object.fromEntries(
  adjustmentConfig.map((adjustment) => [adjustment.id, 0]),
);

const FILTER_BASE_VALUES = {
  brightness: 1,
  contrast: 1,
  saturate: 1,
  sepia: 0,
  grayscale: 0,
  "hue-rotate": 0,
  invert: 0,
  opacity: 1,
  blur: 0,
};

const applyFilterStrength = (css, strength) => {
  if (!css || css === "none") return "none";
  const normalizedStrength = Number.isFinite(strength)
    ? Math.min(Math.max(strength, 0), 100)
    : 100;
  if (normalizedStrength === 0) return "none";
  const ratio = normalizedStrength / 100;

  return css.replace(/([a-z-]+)\(([^)]+)\)/g, (match, name, rawValue) => {
    const trimmed = rawValue.trim();
    const valueMatch = trimmed.match(/^(-?\d*\.?\d+)([a-z%]*)$/i);
    if (!valueMatch) return match;
    const value = Number(valueMatch[1]);
    const unit = valueMatch[2] || "";
    const hasBase = Object.prototype.hasOwnProperty.call(FILTER_BASE_VALUES, name);
    if (!hasBase || Number.isNaN(value)) return match;

    const base = FILTER_BASE_VALUES[name];
    const adjusted = base + (value - base) * ratio;
    const rounded = Math.round(adjusted * 1000) / 1000;
    return `${name}(${rounded}${unit})`;
  });
};

const clampNumber = (value, min, max) => Math.min(Math.max(value, min), max);

const buildAdjustmentFilters = (adjustments) => {
  const parts = [];
  const brightness = clampNumber(1 + adjustments.brightness / 100, 0, 2);
  if (adjustments.brightness !== 0) {
    parts.push(`brightness(${brightness})`);
  }

  const contrast = clampNumber(1 + adjustments.contrast / 100, 0, 2);
  if (adjustments.contrast !== 0) {
    parts.push(`contrast(${contrast})`);
  }

  const blur = Math.max(adjustments.blur, 0);
  if (blur > 0) {
    parts.push(`blur(${Math.round(blur) / 10}px)`);
  }

  const saturate = clampNumber(1 + adjustments.saturate / 100, 0, 2);
  if (adjustments.saturate !== 0) {
    parts.push(`saturate(${saturate})`);
  }

  const temperature = adjustments.temperature;
  if (temperature !== 0) {
    parts.push(`hue-rotate(${Math.round(temperature * 0.5)}deg)`);
  }

  return parts.length ? parts.join(" ") : "none";
};

const buildVignetteOpacity = (value) =>
  clampNumber(value, 0, 100) / 100 * 0.6;

const loadImage = (file) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = (error) => {
      URL.revokeObjectURL(objectUrl);
      reject(error);
    };

    image.src = objectUrl;
  });

const renderFilteredBlob = async ({ file, filterCss, vignetteOpacity, zoom }) => {
  const image = await loadImage(file);
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas not supported.");
  }

  const scale = clampNumber(Number(zoom) || 1, 1, 2);
  const drawWidth = width * scale;
  const drawHeight = height * scale;
  const offsetX = (width - drawWidth) / 2;
  const offsetY = (height - drawHeight) / 2;

  ctx.imageSmoothingQuality = "high";
  ctx.filter = filterCss && filterCss !== "none" ? filterCss : "none";
  ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
  ctx.filter = "none";

  const vignetteAlpha = clampNumber(vignetteOpacity ?? 0, 0, 1);
  if (vignetteAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = vignetteAlpha;
    const innerRadius = Math.min(width, height) * 0.45;
    const outerRadius = Math.max(width, height);
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      innerRadius,
      width / 2,
      height / 2,
      outerRadius,
    );
    gradient.addColorStop(0, "rgba(0,0,0,0)");
    gradient.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to encode image."));
          return;
        }
        resolve(blob);
      },
      OUTPUT_IMAGE_TYPE,
      OUTPUT_IMAGE_QUALITY,
    );
  });
};

export const useCreatePostModal = () => {
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [altText, setAltText] = useState("");
  const [hideMetrics, setHideMetrics] = useState(false);
  const [disableComments, setDisableComments] = useState(false);
  const [shareToThreads, setShareToThreads] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeFilter, setActiveFilter] = useState("normal");
  const [activeTab, setActiveTab] = useState("filter");
  const [filterStrengths, setFilterStrengths] = useState(() => ({
    ...filterStrengthDefaults,
  }));
  const [adjustments, setAdjustments] = useState(() => ({
    ...adjustmentDefaults,
  }));
  const [uploadStatus, setUploadStatus] = useState({
    loading: false,
    error: "",
    ok: false,
  });

  const { uid, username, nickname, photoURL, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  const displayName = useMemo(() => {
    return nickname || username || "user";
  }, [nickname, username]);

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(file);
    return true;
  }, [step, file]);
  const isFinalStep = step === 3;
  const headerTitle = step === 2 ? "편집" : "새 게시물 만들기";
  const primaryActionLabel = isFinalStep
    ? uploadStatus.loading
      ? "공유 중..."
      : "공유하기"
    : "다음";
  const selectedFilter = useMemo(() => {
    return filters.find((filter) => filter.id === activeFilter) || filters[0];
  }, [activeFilter]);
  const activeFilterStrength = filterStrengths[activeFilter] ?? 100;
  const selectedFilterCss = useMemo(() => {
    return applyFilterStrength(selectedFilter.css, activeFilterStrength);
  }, [selectedFilter.css, activeFilterStrength]);
  const adjustmentFilterCss = useMemo(() => {
    return buildAdjustmentFilters(adjustments);
  }, [adjustments]);
  const vignetteOpacity = useMemo(() => {
    return buildVignetteOpacity(adjustments.vignette);
  }, [adjustments.vignette]);
  const previewFilterCss = useMemo(() => {
    const parts = [selectedFilterCss, adjustmentFilterCss].filter(
      (value) => value && value !== "none",
    );
    return parts.length ? parts.join(" ") : "none";
  }, [selectedFilterCss, adjustmentFilterCss]);

  const applyFile = (nextFile) => {
    if (!nextFile || !nextFile.type?.startsWith("image/")) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(nextFile);
    setPreview(buildPreview(nextFile));
    setZoom(1);
    setIsZoomOpen(false);
    setActiveFilter("normal");
    setActiveTab("filter");
    setFilterStrengths({ ...filterStrengthDefaults });
    setAdjustments({ ...adjustmentDefaults });
    setUploadStatus({ loading: false, error: "", ok: false });
  };

  const handleFileChange = (event) => {
    const nextFile = event.target.files?.[0] || null;
    applyFile(nextFile);
  };

  const handleNext = () => {
    if (!canNext) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleToggleZoom = () => {
    setIsZoomOpen((prev) => !prev);
  };

  const handleZoomChange = (event) => {
    setZoom(Number(event.target.value));
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const nextFile = event.dataTransfer?.files?.[0] || null;
    applyFile(nextFile);
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleAltTextChange = (event) => {
    setAltText(event.target.value);
  };

  const handleHideMetricsChange = (event) => {
    setHideMetrics(event.target.checked);
  };

  const handleDisableCommentsChange = (event) => {
    setDisableComments(event.target.checked);
  };

  const handleShareToThreadsChange = (event) => {
    setShareToThreads(event.target.checked);
  };

  const handleResetFilter = () => {
    setActiveFilter("normal");
  };

  const handleSelectFilter = (filterId) => {
    setActiveFilter(filterId);
  };

  const handleSetTab = (tab) => {
    setActiveTab(tab);
  };

  const handleFilterStrengthChange = (value) => {
    const nextValue = Number(value);
    setFilterStrengths((prev) => ({
      ...prev,
      [activeFilter]: Math.min(Math.max(nextValue, 0), 100),
    }));
  };

  const handleAdjustmentChange = (id, value) => {
    setAdjustments((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleShare = async () => {
    if (uploadStatus.loading) return { ok: false };
    if (!isAuthenticated || !uid) {
      setUploadStatus({
        loading: false,
        error: "로그인이 필요합니다.",
        ok: false,
      });
      return { ok: false };
    }
    if (!file) {
      setUploadStatus({
        loading: false,
        error: "이미지를 선택해주세요.",
        ok: false,
      });
      return { ok: false };
    }

    setUploadStatus({ loading: true, error: "", ok: false });

    try {
      const baseName = file.name?.replace(/\.[^/.]+$/, "") || "upload";
      const safeName = baseName.replace(/\s+/g, "-");
      const extension = OUTPUT_IMAGE_TYPE === "image/webp" ? "webp" : "jpg";
      const fileName = `${safeName}.${extension}`;

      const blob = await renderFilteredBlob({
        file,
        filterCss: previewFilterCss,
        vignetteOpacity,
        zoom,
      });

      const storageRef = ref(storage, `posts/${uid}/${Date.now()}-${fileName}`);
      await uploadBytes(storageRef, blob, { contentType: OUTPUT_IMAGE_TYPE });
      const imageUrl = await getDownloadURL(storageRef);

      const payload = {
        userId: uid,
        username: displayName,
        profileImageUrl: photoURL || "",
        caption: caption.trim(),
        imageUrls: [imageUrl],
        location: location.trim(),
        likeCount: 0,
        commentCount: 0,
        createdAt: serverTimestamp(),
        altText: altText.trim(),
        hideMetrics,
        disableComments,
        shareToThreads,
      };

      await addDoc(collection(db, "posts"), payload);
      setUploadStatus({ loading: false, error: "", ok: true });
      return { ok: true };
    } catch (error) {
      setUploadStatus({
        loading: false,
        error: error?.message || "업로드에 실패했습니다.",
        ok: false,
      });
      return { ok: false };
    }
  };

  return {
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
    selectedFilter,
    activeTab,
    activeFilterStrength,
    selectedFilterCss,
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
  };
};
