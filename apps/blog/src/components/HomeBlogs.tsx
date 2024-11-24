"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getPopularPosts } from "../lib/actions/postActions";
import BlogCard from "./BlogCard";

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
      console.log("calling..");
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.pages.map((posts) => (
        <div key={posts.currentPage} className="space-y-6">
          {posts.data.map((post: any) => (
            <BlogCard
              title={post.title}
              author={post.author.username}
              likes={post._count.likes}
              comments={post._count.comments}
              date={post.createdAt}
              description={post.content}
              image={`http://localhost:3000/${post.image}`}
            />
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
    </div>
  );
}
