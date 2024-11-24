import React from "react";

const SmallBlogCard = ({ title, username, date, image }: any) => {
  return (
    <div className="max-w-md p-4 bg-white rounded-lg">
      <div className="flex items-start gap-3">
        <img src={image} alt="User avatar" className="w-8 h-8 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-sm font-medium">{username}</span>
            <span className="text-blue-500">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </span>
          </div>
          <h3 className="mb-1 font-bold text-gray-900">{title}</h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{formatDate(date)}</span>
            <span className="text-amber-400">★</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallBlogCard;

function formatDate(date: Date | string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
