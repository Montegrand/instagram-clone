import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";
import { db } from "@services/firebaseClient.js";

const mapPost = (docSnap) => {
  const data = docSnap.data() || {};
  return {
    id: docSnap.id,
    userId: data.userId || "",
    username: data.username || "user",
    profileImageUrl: data.profileImageUrl || "",
    imageUrls: Array.isArray(data.imageUrls) ? data.imageUrls : [],
    caption: data.caption || "",
    likeCount: Number.isFinite(data.likeCount) ? data.likeCount : 0,
    commentCount: Number.isFinite(data.commentCount) ? data.commentCount : 0,
    location: data.location || "",
    createdAt: data.createdAt?.toDate?.() || null,
  };
};

export const useFeedPosts = ({ pageSize = 20 } = {}) => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(pageSize),
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setPosts(snapshot.docs.map(mapPost));
        setStatus({ loading: false, error: "" });
      },
      (error) => {
        setStatus({
          loading: false,
          error: error?.message || "Failed to load posts.",
        });
      },
    );

    return () => unsubscribe();
  }, [pageSize]);

  return { posts, status };
};
