/* eslint-disable @typescript-eslint/no-unused-vars */
import { Heart } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function LikeButton({ postId, userId, initialLikes, alreadyLiked }: {
  postId: string;
  userId: string;
  initialLikes: number;
  alreadyLiked: boolean;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(alreadyLiked);

  const handleLike = async () => {
    if (liked) return;

    try {
      const res = await fetch(`/api/like-post/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!res.ok) throw new Error("Already liked or failed");

      const data = await res.json();
      setLikes(data.likes);
      setLiked(true);
      toast.success("Liked!");
    } catch (err) {
      toast.error("You already liked this post!");
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={liked}
      className={`flex items-center gap-1 ${
        liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
      }`}
    >
      <Heart size={20} fill={liked ? "red" : "none"} />
      <span>{likes}</span>
    </button>
  );
}
