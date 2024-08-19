"use client";

import React, { useState } from "react";
import { Comment } from "../[blog]/page";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  editCommentAction,
  replyToCommentAction,
} from "../../../lib/actions/postActions";

interface Props {
  postId: string;
  userId: string;
  comment: Comment;
}

const CommentCard = ({ comment, postId, userId }: Props) => {
  const [showEdit, setShowEdit] = useState(comment.User.id === userId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const router = useRouter();

  const { mutateAsync: replyToComment, isPending: isreply } = useMutation({
    mutationFn: () =>
      replyToCommentAction(replyText, userId, postId, comment.id),
    mutationKey: ["replyToCommentAction"],
    onSuccess: () => {
      setReplyText("");
      setIsReplying(false);
    },
  });

  const { mutateAsync: editComment, isPending: iseditcomment } = useMutation({
    mutationFn: () => editCommentAction(editedText, comment.id),
    mutationKey: ["editCommentAction"],
    onSuccess: () => {
      setIsEditing(false);
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">
          {comment.User.username}
        </span>
        {new Date(comment.createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>

      {isEditing ? (
        <div className="mt-2">
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows={3}
          />
          <div className="mt-2 space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => editComment()}
            >
              {iseditcomment ? "saving..." : "Save"}
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-600 mb-2">{comment.text}</p>
          <div className="space-x-2">
            {showEdit && (
              <button
                className="text-sm text-blue-500 hover:text-blue-700"
                onClick={() => {
                  if (!userId) {
                    router.push("/signin");
                    return;
                  }
                  setIsEditing(true);
                }}
              >
                Edit
              </button>
            )}
            <button
              className="text-sm text-blue-500 hover:text-blue-700"
              onClick={() => {
                if (!userId) {
                  router.push("/signin");
                  return;
                }
                setIsReplying(true);
              }}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {isReplying && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
          />
          <div className="mt-2 space-x-2">
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => replyToComment()}
            >
              {isreply ? "saving..." : "Save"}
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => setIsReplying(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-8 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard
              key={reply.id}
              comment={reply}
              postId={postId}
              userId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
