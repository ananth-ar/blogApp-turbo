import { prisma } from "database";

interface Props {
  params: { topic: string };
}

const TopicPage = async ({ params: { topic } }: Props) => {
 
  const topicWithPosts = await prisma.topic.findUnique({
    where: {
      topic: decodeURIComponent(topic),
    },
    include: {
      posts: {
        include: {
          post: true,
        },
      },
    },
  });

  const posts = topicWithPosts?.posts.map((pt: any) => pt.post) || [];

  console.log("topics ", posts);

  return <div>TopicPage</div>;
};

export default TopicPage;
