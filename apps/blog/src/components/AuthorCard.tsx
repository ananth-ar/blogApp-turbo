import React from "react";

const AuthorCard = ({ name, description, username, image }: any) => {
  return (
    <div className="flex items-center justify-between max-w-md p-2">
      <div className="flex items-center gap-3">
        <img src={image} alt="Liu Zuo Lin" className="w-9 h-9 rounded-full" />
        <div>
          <div className="text-[14px] font-medium text-gray-900">{name}</div>
          <div className="text-[13px] text-gray-500">{username}</div>
          <div className="text-[13px] text-gray-500">
            {trimstring(description)}
          </div>
        </div>
      </div>
      <button className="px-4 py-1 text-sm font-medium text-gray-700 border border-gray-300 rounded-full hover:bg-gray-50">
        Follow
      </button>
    </div>
  );
};

export default AuthorCard;

function trimstring(content: string) {
  // Split the text into words
  const words = content.split(" ");

  // Take first 40 words and join them back together
  const first40Words = words.slice(0, 8).join(" ");

  return first40Words;
}
