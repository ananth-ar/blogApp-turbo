"use client";

import { useMutation } from "@tanstack/react-query";
import React, { Dispatch, useState } from "react";
import { commentToPostAction } from "../../../lib/actions/postActions";

interface Props {
  postId: string;
  userId: string;
  setNewComment: Dispatch<React.SetStateAction<boolean>>;
}

const NewComment = ({ postId, userId, setNewComment }: Props) => {
  const [text, setText] = useState("");

  const { mutateAsync: commentToPost, isPending } = useMutation({
    mutationFn: () => commentToPostAction(text, userId, postId),
    mutationKey: ["commentToPostAction"],
    onSuccess: () => {
      setText("");
      setNewComment(false);
    },
  });

  return (
    <div className="mt-2">
      <textarea
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
      />
      <div className="mt-2 space-x-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={async () => await commentToPost()}
        >
          {isPending ? "saving..." : "Save"}
        </button>
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          onClick={() => setNewComment(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewComment;
