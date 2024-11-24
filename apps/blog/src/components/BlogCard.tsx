import React from "react";
import { Bookmark, MoreHorizontal } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BlogCard = ({
  author,
  title,
  likes,
  comments,
  date,
  description,
  image,
}: any) => {
  return (
    <div className="max-w-[48rem] p-4 bg-white rounded-lg ">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600">{author}</span>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="mb-2 text-xl font-bold">{title}</h2>
              <p className="mb-4 text-gray-600">
                {processHtmlContent(description)}...
              </p>
              <div className="flex text-sm text-gray-500 justify-between">
                <div className="flex gap-4 items-center">
                  <span>{formatDate(date)}</span>
                  <div className="flex items-center gap-1">
                    <span>{likes}</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </div>
                  <span>{comments} comments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-1 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer">
                    <MoreHorizontal size={18} />
                  </div>
                  <div className="p-1 text-gray-500 rounded-full hover:bg-gray-100 cursor-pointer">
                    <Bookmark size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="ml-4 flex-shrink-0">
              <img src={image} className="w-[14rem] h-[12rem] object-contain" />
            </div>
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-200 h-[0.5px] mt-4" />
    </div>
  );
};

export default BlogCard;

function processHtmlContent(content: string) {
  // Remove all HTML tags and replace with a single space
  const withoutHtml = content.replace(/<[^>]+>/g, " ");

  // Remove extra spaces (including multiple spaces, tabs, and newlines)
  const cleanedText = withoutHtml.replace(/\s+/g, " ").trim();

  // Split the text into words
  const words = cleanedText.split(" ");

  // Take first 40 words and join them back together
  const first40Words = words.slice(0, 40).join(" ");

  return first40Words;
}

function formatDate(date: Date | string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
