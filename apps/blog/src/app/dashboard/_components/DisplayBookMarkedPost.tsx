"use client";

import Link from "next/link";

const DisplayBookMarkedPost = ({ posts }: { posts: any }) => {
  console.log("all booked marked posts ", posts);
  return (
    <div className="space-y-4">
      {posts.map((post: any) => (
        <div
          key={post.id}
          className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>

          <Link
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded
            hover:bg-blue-600"
            href={`/blog/${post.slug}`}
          >
            View Post
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayBookMarkedPost;
