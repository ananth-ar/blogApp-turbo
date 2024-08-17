import { prisma } from "database";
import HomeBlogs from "./HomeBlogs";

const Home = async () => {
  //   await getPopularPosts();
  //   await getPopularTopics();
  //   await getRecentPosts(2);
  //   await getPopularUsers();

  return (
    <div>
      Home
      <HomeBlogs />
    </div>
  );
};

export default Home;

async function getPopularPosts() {
  const popularPosts = await prisma.post.findMany({
    select: {
      slug: true,
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
