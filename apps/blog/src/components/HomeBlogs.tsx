"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { getPopularPosts } from "../lib/actions/postActions";
import Link from "next/link";

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
        // <div key={posts.currentPage} className="flex flex-col gap-4">
        //   {posts.data.map((post:any) => (
        //     <li key={post.slug}>{post.slug}</li>
        //   ))}
        // </div>
        <div key={posts.currentPage} className="space-y-6">
          {posts.data.map((post: any) => (
            <div
              key={post.slug}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300
               hover:shadow-lg"
            >
              <img
                src={`http://localhost:3000/${post.image}`}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="flex flex-col p-6 ">
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                >
                  {post.title}
                </Link>
                <Link
                  href={`/${post.author.username}`}
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4"
                >
                  By {post.author?.username}
                </Link>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post._count.likes}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>{post._count.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div ref={ref}>{isFetchingNextPage && "Loading more..."}</div>
    </div>
  );
}
