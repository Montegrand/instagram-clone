import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@services/firebaseClient.js";

const buildPreviewList = (files) => {
  if (!Array.isArray(files)) return [];
  return files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
  }));
};

const cleanupPreviews = (previews) => {
  previews.forEach((preview) => URL.revokeObjectURL(preview.url));
};

export const usePostUpload = () => {
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [status, setStatus] = useState({ loading: false, error: "", ok: false });

  const { uid, username, nickname, photoURL, isAuthenticated } = useSelector(
    (state) => state.user,
  );

  const displayName = useMemo(() => {
    return nickname || username || "user";
  }, [nickname, username]);

  const onFilesChange = (event) => {
    const nextFiles = Array.from(event.target.files || []);
    cleanupPreviews(previews);
    setFiles(nextFiles);
    setPreviews(buildPreviewList(nextFiles));
  };

  const resetForm = () => {
    cleanupPreviews(previews);
    setCaption("");
    setLocation("");
    setFiles([]);
    setPreviews([]);
    setStatus({ loading: false, error: "", ok: false });
  };

  const uploadImages = async () => {
    const uploads = files.map(async (file) => {
      const storageRef = ref(
        storage,
        `posts/${uid}/${Date.now()}-${file.name}`,
      );
      await uploadBytes(storageRef, file);
      return getDownloadURL(storageRef);
    });

    return Promise.all(uploads);
  };

  const onSubmit = async (event) => {
    event?.preventDefault();
    if (!isAuthenticated || !uid) {
      setStatus({ loading: false, error: "로그인이 필요합니다.", ok: false });
      return { ok: false };
    }
    if (!files.length) {
      setStatus({ loading: false, error: "이미지를 선택해주세요.", ok: false });
      return { ok: false };
    }

    setStatus({ loading: true, error: "", ok: false });

    try {
      const imageUrls = await uploadImages();
      const payload = {
        userId: uid,
        username: displayName,
        profileImageUrl: photoURL || "",
        caption: caption.trim(),
        imageUrls,
        location: location.trim(),
        likeCount: 0,
        commentCount: 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "posts"), payload);
      setStatus({ loading: false, error: "", ok: true });
      return { ok: true };
    } catch (error) {
      setStatus({
        loading: false,
        error: error?.message || "업로드에 실패했습니다.",
        ok: false,
      });
      return { ok: false };
    }
  };

  return {
    caption,
    location,
    files,
    previews,
    status,
    setCaption,
    setLocation,
    onFilesChange,
    onSubmit,
    resetForm,
  };
};
