import { prisma } from "database";
import DisplayBookMarkedPost from "../_components/DisplayBookMarkedPost";
import { isAuthenicated } from "../../../lib/utiles/authHelper";

const BookMarks = async () => {
  const user = await isAuthenicated();
  const bookmarkPosts = await getAllBookmarkedPosts(user.username!);

  return (
    <div>
      <DisplayBookMarkedPost posts={bookmarkPosts} />
    </div>
  );
};

export default BookMarks;

 async function getAllBookmarkedPosts(username: string) {
  const userWithBookmarks = await prisma.user.findUnique({
    where: { username },
    select: {
      bookmarks: {
        select: {
          id: true,
          slug: true,
          title: true,
          image: true,
          content: true,
        },
      },
    },
  });

  return userWithBookmarks?.bookmarks || [];
}
