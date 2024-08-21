import { prisma } from "database";
import FollowButton from "../_components/FollowButton";
import { getServerSession } from "next-auth";
import CommentSection from "../_components/CommentSection";
import { LikeButton } from "../_components/LikeButtom";
import Link from "next/link";
import BookMarkPost from "../_components/BookMarkPost";
import { getUserIdAction } from "../../../lib/actions/userActions";
import { authOptions } from "../../../lib/auth";
import { unstable_cache } from "next/cache";
import { Tags } from "lucide-react";

interface Post {
  id: string;
  title: string;
  image: string | null;
  content: string;
  topic: string | null;
  authorId: string;
  createdAt: Date;
}

interface Props {
  params: { blog: string };
}

export type Comment = {
  id: string;
  text: string;
  userId: string;
  postId: string;
  createdAt: Date;
  parentCommentId: string | null;
  User: {
    id: string;
    username: string;
  };
  replies: Comment[];
};

const Blog = async ({ params: { blog } }: Props) => {
  const sessionUser = await getServerSession(authOptions);

  const post = await cachedPost(blog);
  const comments: Comment[] = await cachedCommentsForPost(post?.id!);
  const followStatus = await cachedFollowStatus(
    sessionUser?.user.username!,
    post.authorId
  );
  const bookedmarked = await cachedBookMark(
    sessionUser?.user.username!,
    post.slug
  );

  let isSame: boolean;
  let isFollows: boolean;
  let isLiked: boolean;
  let userId: string | undefined;

  if (sessionUser) {
    userId = await getUserIdAction(sessionUser.user.username!);
    isLiked = post.likes.some((user: any) => user.id === userId);
    isFollows = followStatus?.following.length === 1;
    isSame = post.author.username === sessionUser?.user.username;
  } else {
    isFollows = false;
    isSame = false;
    isLiked = false;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1>{post.title}</h1>
        {post.image && (
          <img className="h-80 w-80 " src={post.image} alt="Blog Image" />
        )}
        <div className="flex">
          <img
            className="h-5 w-5 pt-1 pr-1"
            src={post.author.image!}
            alt="Auther Image"
          />
          <Link href={`/${post.author.username}`}>{post.author.username}</Link>
        </div>
        {!isSame && (
          <FollowButton
            username={sessionUser?.user.username!}
            authorId={post.authorId}
            initialIsFollows={isFollows}
          />
        )}
        <LikeButton
          postId={post.id}
          userId={userId}
          initialLikeState={isLiked}
          totalLikes={post.likeCount}
        />
        <BookMarkPost
          username={sessionUser?.user.username!}
          postSlug={post.slug}
          initialBookMarkState={bookedmarked}
        />
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <CommentSection
          comments={comments}
          postId={post.id}
          userId={await getUserIdAction(sessionUser?.user.username!)}
        />
      </div>
    </>
  );
};

export default Blog;

async function getPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: postId },
      include: {
        likes: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    const likeCount = post.likes.length;

    return {
      ...post,
      likeCount,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

async function cachedPost(postId: string) {
  return unstable_cache(async () => getPost(postId), [postId], {
    tags: ["post"],
  })();
}

async function getCommentsForPost(postId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentCommentId: null,
    },
    include: {
      User: {
        select: { id: true, username: true },
      },
      replies: {
        include: {
          User: {
            select: { id: true, username: true },
          },
          replies: {
            include: {
              User: {
                select: { id: true, username: true },
              },
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments as Comment[];
}

async function cachedCommentsForPost(postId: string) {
  return unstable_cache(async () => getCommentsForPost(postId), [postId], {
    tags: ["comments"],
  })();
}

async function isFollowing(username: string, authorId: string) {
  return await prisma.user.findUnique({
    where: { username },
    include: {
      following: {
        where: { id: authorId },
        select: { id: true },
      },
    },
  });
}

async function cachedFollowStatus(username: string, authorId: string) {
  return unstable_cache(
    async () => isFollowing(username, authorId),
    [username, authorId],
    {
      tags: ["followStatus"],
    }
  )();
}

async function isPostBookmarked(username: string, postSlug: string) {
  if (!username) return false;
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      bookmarks: {
        where: { slug: postSlug },
        select: { id: true },
      },
    },
  });

  console.log("checking whether bookemarked ", user);
  return user?.bookmarks.length! > 0 || false;
}

async function cachedBookMark(username: string, postSlug: string) {
  return unstable_cache(
    async () => isPostBookmarked(username, postSlug),
    [username, postSlug],
    {
      tags: ["bookmark"],
    }
  )();
}
