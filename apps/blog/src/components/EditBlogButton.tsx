"use client";

import { useRouter } from "next/navigation";

const EditBlogButton = ({ slug }: { slug: string }) => {
  const router = useRouter();

  return (
    <button
      className="bg-green-600 p-1 pr-4 pl-4 rounded-md"
      onClick={() => router.push(`/editor/${slug}`)}
    >
      edit
    </button>
  );
};

export default EditBlogButton;
