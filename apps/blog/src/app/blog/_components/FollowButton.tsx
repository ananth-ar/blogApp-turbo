"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { userFollow, userUnfollow } from "../../../lib/actions/userActions";

interface Props {
  username: string | null;
  authorId: string;
  initialIsFollows: boolean;
}

const FollowButton = ({ username, authorId, initialIsFollows }: Props) => {
  const [isFollows, setIsFollows] = useState<boolean>(initialIsFollows);
  const router = useRouter();

  const { mutate: followUser } = useMutation({
    mutationFn: () => userFollow(username!, authorId),
    onMutate: () => {
      setIsFollows(true);
    },
    onError: () => setIsFollows(false),
  });

  const { mutate: unfollowUser } = useMutation({
    mutationFn: () => userUnfollow(username!, authorId),
    onMutate: () => {
      setIsFollows(false);
    },
    onError: () => setIsFollows(true),
  });

  const onFollowClick = () => {
    if (!username) {
      router.push("/signin");
      return;
    }

    if (isFollows) unfollowUser();
    else followUser();
  };
  return (
    <button
      className="bg-cyan-500 rounded-md pr-5 pl-5"
      onClick={onFollowClick}
    >
      {isFollows ? "unfollow" : "follow"}
    </button>
  );
};

export default FollowButton;
