"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getPopularPosts } from "../lib/actions/postActions";

export default function HomeBlogs() {
  const { ref, inView } = useInView();

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popularposts"],
      queryFn: ({ pageParam = 0 }) =>
        getPopularPosts({
          pageParam: JSON.parse(JSON.stringify(pageParam)),
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  useEffect(() => {
    if (inView) {
      console.log('calling..')
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
            <li key={post.slug}>{post.slug}</li>
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
    </div>
  );
}
