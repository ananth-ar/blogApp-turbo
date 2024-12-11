import { prisma } from "database";
import EditBlogButton from "../../../components/EditBlogButton";
import UserBlogs from "../../../components/UserBlogs";
import { isAuthenicated } from "../../../lib/utiles/authHelper";

const UserBlog = async () => {
  const user = await isAuthenicated();
  if (!user) return <div>your are not authoriesd</div>;

  const userId = await prisma.user.findUnique({
    where: { email: user.email! },
    select: { id: true },
  });

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId?.id,
    },
    include: {
      author: true,
      comments: true,
      likes: true,
    },
  });

  return (
    <div>
      <UserBlogs userId={userId?.id!} EditBlogButton={EditBlogButton} />
    </div>
  );
};

export default UserBlog;
