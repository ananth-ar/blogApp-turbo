"use client";

import { useState } from "react";
import BlogContent from "./BlogContent";
import BlogTitleImg from "./BlogTitleImg";
import SearchTopic from "./SearchTopic";

type Props = {
  post?: {
    slug: string;
    title: string;
    image: string | null;
    content: string;
  };
  onSaveCallback: (data: any) => Promise<void>;
};

const Editor = ({ post, onSaveCallback }: Props) => {
  const [title, setTitle] = useState(post?.title || "");
  const [image, setImage] = useState<File | null>(null);
  const [content, setContent] = useState(post?.content || "");
  const [topics, setTopics] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState(post?.image || "");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      console.log(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview("");
    }
  };

  const saveBlog = async () => {
    const formData = new FormData();
    formData.append("title", title!);
    formData.append("content", content!);
    if (topics.length > 0) {
      formData.append("topics", topics.join(","));
    }
    if (image) {
      formData.append("image", image);
    }
    if (post) formData.append("slug", post?.slug);

    try {
      console.log(formData);
      await onSaveCallback(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button onClick={saveBlog}>save</button>
      <BlogTitleImg
        title={title!}
        imagePreview={imagePreview!}
        handleImageChange={handleImageChange}
        setTitle={setTitle}
      />
      <SearchTopic setTopics={setTopics} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Topics</h2>
        {topics.length > 0 ? (
          <ul className="list-disc pl-5">
            {topics.map((topic, index) => (
              <li key={index} className="text-gray-700 mb-1">
                {topic}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No topics available</p>
        )}
      </div>
      <BlogContent content={content!} setContent={setContent} />
    </>
  );
};

export default Editor;
