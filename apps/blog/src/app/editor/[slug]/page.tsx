import { prisma } from "database";
import Editor from "../../../components/Editor";
import { updatePost } from "../../../lib/actions/postActions";

interface Post {
  slug: string;
  title: string;
  image: string | null;
  content: string;
  topic: string | null;
  authorId: string;
  createdAt: Date;
}

interface Props {
  params: { slug: string };
}

const EditBlog = async ({ params: { slug } }: Props) => {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Editor onSaveCallback={updatePost} post={post} />
    </>
  );
};

export default EditBlog;
