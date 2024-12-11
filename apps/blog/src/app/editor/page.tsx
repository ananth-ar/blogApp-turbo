import dynamic from "next/dynamic";

const BlogEdit = dynamic(() => import("../../components/EditBlog"), {
  ssr: false,
});

const EditorPage = () => {
  return (
    <>
      <BlogEdit />
    </>
  );
};

export default EditorPage;
