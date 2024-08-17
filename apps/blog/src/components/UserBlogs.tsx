"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getUserPosts } from "../lib/actions/postActions";

interface UserBlogsProps {
  userId: string;
  EditBlogButton?: React.ComponentType<{ slug: string }>;
}

export default function UserBlogs({ userId, EditBlogButton }: UserBlogsProps) {
  const { ref, inView } = useInView();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popularposts"],
      queryFn: ({ pageParam = 0 }) =>
        getUserPosts(
          {
            pageParam: JSON.parse(JSON.stringify(pageParam)),
          },
          userId
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) {
      console.log("calling..");
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-4 p-4">
      {data.pages.map((page) => (
        <div key={page.currentPage} className="flex flex-col gap-4">
          {page.data.map((post:any) => (
            <li key={post.slug}>
              {post.slug}
              <div>{EditBlogButton && <EditBlogButton slug={post.slug} />}</div>
            </li>
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
    </div>
  );
}
