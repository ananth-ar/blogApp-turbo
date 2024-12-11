"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { likePost } from "../../../lib/actions/postActions";

interface LikeButtonProps {
  postId: string;
  userId?: string;
  totalLikes: number;
  initialLikeState: boolean;
}

export function LikeButton({
  postId,
  userId,
  initialLikeState,
  totalLikes,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLikeState);
  const router = useRouter();

  const { mutateAsync: likeMutation, isPending } = useMutation({
    mutationFn: () => likePost(userId!, postId),
    onError: () => {
      setIsLiked(!isLiked);
    },
  });

  const handleLike = () => {
    if (!userId) {
      router.push("/signin");
      return;
    }
    setIsLiked(!isLiked);
    likeMutation();
  };

  return (
    <div>
      <button
        onClick={handleLike}
        disabled={isPending}
        className={`px-2 py-1 rounded-lg ${
          isLiked ? "bg-red-600 text-white" : "bg-gray-200 text-black"
        }`}
      >
        {isLiked ? "Unlike" : "Like"}
      </button>
      likes{totalLikes}
    </div>
  );
}
