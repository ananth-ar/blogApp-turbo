import React from "react";
import { Bookmark } from "lucide-react";

const ReadingListFooter = () => {
  return (
    <div className="max-w-md p-4">
      <h2 className="text-base font-bold mb-2">Reading list</h2>

      <div className="mb-6 text-gray-600 text-sm">
        Click the <Bookmark className="inline-block mx-1 w-4 h-4" /> on any
        story to easily add it to your reading list or a custom list that you
        can share.
      </div>

      <div className="text-sm text-gray-600">
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <a href="#" className="hover:text-gray-900">
            Help
          </a>
          <a href="#" className="hover:text-gray-900">
            Status
          </a>
          <a href="#" className="hover:text-gray-900">
            About
          </a>
          <a href="#" className="hover:text-gray-900">
            Careers
          </a>
          <a href="#" className="hover:text-gray-900">
            Press
          </a>
          <a href="#" className="hover:text-gray-900">
            Blog
          </a>
          <a href="#" className="hover:text-gray-900">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-900">
            Terms
          </a>
        </div>
        <div className="mt-1 flex gap-x-3">
          <a href="#" className="hover:text-gray-900">
            Text to speech
          </a>
          <a href="#" className="hover:text-gray-900">
            Teams
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReadingListFooter;
