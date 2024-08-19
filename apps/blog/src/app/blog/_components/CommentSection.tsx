"use client";

import { useState } from "react";
import { Comment } from "../[blog]/page";
import CommentCard from "./CommentCard";
import NewComment from "./NewComment";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  userId?: string;
  comments: Comment[];
}

const CommentSection = ({ comments, postId, userId }: Props) => {
  const [newComment, setNewComment] = useState(false);
 
  const router = useRouter();

  const handleComment = () => {
    if (!userId) {
      router.push("/signin");
      return;
    }
    setNewComment(true);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-4">
      <button
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleComment}
      >
        comment
      </button>
      <div>
        {newComment && (
          <NewComment
            setNewComment={setNewComment}
            postId={postId}
            userId={userId!}
          />
        )}
      </div>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          postId={postId}
          userId={userId!}
        />
      ))}
    </div>
  );
};

export default CommentSection;
