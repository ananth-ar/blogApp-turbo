"use client";

import { createPost } from "../lib/actions/postActions";
import Editor from "./Editor";



const BlogEdit = () => {
  return (
    <>
      <Editor onSaveCallback={createPost} />
    </>
  );
};

export default BlogEdit;
