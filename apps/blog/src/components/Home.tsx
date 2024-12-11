import { prisma } from "database";
import HomeBlogs from "./HomeBlogs";
import { Separator } from "./ui/separator";
import SmallBlogCard from "./SmallBlogCard";
import AuthorCard from "./AuthorCard";
import ReadingListFooter from "./ReadingListFooter";

const Home = async () => {
  // everything below works
  // await getPopularPosts();
  const recommendedTopics = await getPopularTopics(15);
  const recentpost = await getRecentPosts(3);
  const popularUsers = await getPopularUsers(3);

  return (
    <div className="flex justify-center h-auto gap-6">
      <div className="mt-4">
        <HomeBlogs />
      </div>
      <Separator orientation="vertical" className="h-auto mx-4 bg-zinc-200" />
      <div>
        <div className="mt-4">
          <span className="text-base font-bold mb-2"> Recent Posts</span>
          <div>
            {recentpost.map((post: any) => (
              <SmallBlogCard
                title={post.title}
                username={post.author.username}
                date={post.createdAt}
                image={`http://localhost:3000/${post.image}`}
              />
            ))}
          </div>
        </div>
        <Separator className="mx-4 bg-zinc-200 h-[0.5px]" />
        <div className="mt-4">
          <span className="text-base font-bold mb-2">Recommended topics</span>
          <div className="max-w-[30rem] my-2">
            {recommendedTopics.map((topic: any) => (
              <div className="inline-flex items-center px-4 py-2 bg-gray-50 rounded-full text-base my-2 mx-1 text-gray-900">
                <span className="relative">{topic.topic}</span>
              </div>
            ))}
          </div>
        </div>
        <Separator className="mx-4 bg-zinc-200 h-[0.5px]" />
        <div className="mt-4 ">
          <span className="text-base font-bold mb-2"> Who to follow</span>

          <div>
            {popularUsers.map((user: any) => (
              <AuthorCard
                name={user.name}
                username={user.username}
                description={user.description}
                image={user.image}
              />
            ))}
          </div>
        </div>
        <Separator className="mx-4 bg-zinc-200 h-[0.5px]" />
        <ReadingListFooter />
      </div>
    </div>
  );
};

export default Home;

async function getPopularPosts() {
  const popularPosts = await prisma.post.findMany({
    select: {
      slug: true,
      image: true,
      title: true,
      author: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
    orderBy: [
      {
        comments: {
          _count: "desc",
        },
      },
      {
        likes: {
          _count: "desc",
        },
      },
    ],
    take: 3,
  });

  console.log("popular posts: ", popularPosts);
  return popularPosts;
}

async function getRecentPosts(limit: number = 10) {
  const recentPosts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
    include: {
      author: true,
      topics: {
        include: {
          topic: true,
        },
      },
    },
  });
  console.log("recent posts: ", recentPosts);
  return recentPosts;
}

async function getPopularTopics(limit: number = 10) {
  const popularTopics = await prisma.topic.findMany({
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    take: limit,
    include: {
      posts: true,
    },
  });

  console.log("popular topics: ", popularTopics);
  return popularTopics;
}

async function getPopularUsers(limit: number = 10) {
  const popularUsers = await prisma.user.findMany({
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
    take: limit,
    include: {
      followers: true,
      following: true,
    },
  });
  console.log("popular users: ", popularUsers);
  return popularUsers;
}
