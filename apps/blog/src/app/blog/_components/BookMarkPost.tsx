"use client";


import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { addBookMarkAction, removeBookMarkAction } from "../../../lib/actions/postActions";

interface BookMarkProps {
  postSlug: string;
  username?: string;
  initialBookMarkState: boolean;
}

const BookMarkPost = ({
  postSlug,
  username,
  initialBookMarkState,
}: BookMarkProps) => {
  const [bookedmarked, setBookmarked] = useState(initialBookMarkState);
  const router = useRouter();

  const { mutateAsync: bookmarkMutation, isPending } = useMutation({
    mutationFn: () => addBookMarkAction(username!, postSlug),
    onError: () => {
      setBookmarked(false);
    },
  });

  const { mutateAsync: removebookmarkMutation } = useMutation({
    mutationFn: () => removeBookMarkAction(username!, postSlug),
    onError: () => {
      setBookmarked(true);
    },
  });

  const onBookMarkClick = () => {
    if (!username) {
      router.push("/signin");
      return;
    }
    if (!bookedmarked) {
      bookmarkMutation();
      setBookmarked(true);
    } else {
      removebookmarkMutation();
      setBookmarked(false);
    }
  };

  return (
    <button
      className={`px-2 py-1 rounded-lg ${
        bookedmarked ? "bg-violet-600 text-white" : "bg-gray-200 text-black"
      }`}
      onClick={onBookMarkClick}
    >
      {bookedmarked ? "bookmarked" : "bookmark"}
    </button>
  );
};

export default BookMarkPost;
