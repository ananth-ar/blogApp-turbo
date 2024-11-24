"use server";

import { prisma } from "database";
import { deleteImage, uploadImage } from "../utiles/filesaver";
import { isAuthenicated } from "../utiles/authHelper";
import { generateUniqueSlug, slugify } from "../utiles/helper";
import { createNotificationAction } from "./notificationActions";
import { revalidateTag } from "next/cache";

export async function createPost(formData: FormData) {
  const user = await isAuthenicated();
  if (!user) return console.log("not authenticated");

  const postData = {
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as File | null,
    topics: (formData.get("topics") as string).split(",").map((t) => t.trim()),
  };

  let imageUrl: string;
  if (postData.image) {
    imageUrl = await uploadImage(postData.image);
  }

  const slug = await generateUniqueSlug(postData.title);

  const result = await prisma.$transaction(async (prisma: any) => {
    const newPost = await prisma.post.create({
      data: {
        author: {
          connect: { username: user.username! },
        },
        slug: slug,
        title: postData.title,
        content: postData.content,
        image: imageUrl,
      },
    });

    for (const topicName of postData.topics) {
      const topic = await prisma.topic.upsert({
        where: { topic: topicName },
        update: {},
        create: { topic: topicName },
      });

      await prisma.postTopics.create({
        data: {
          post: { connect: { id: newPost.id } },
          topic: { connect: { id: topic.id } },
        },
      });
    }

    return newPost;
  });

  console.log("new post : ", result);
}

export async function updatePost(formData: FormData) {
  const user = await isAuthenicated();
  if (!user) return console.log("not authenticated");

  const postData = {
    authorId: formData.get("authorId") as string,
    title: formData.get("title") as string,
    content: formData.get("content") as string,
    image: formData.get("image") as File | null,
    slug: formData.get("slug") as string,
  };

  console.log("postData ", postData);

  let imageUrl;
  if (postData.image) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: postData.slug },
      select: { image: true },
    });
    if (existingPost?.image) {
      await deleteImage(existingPost.image);
    }

    imageUrl = await uploadImage(postData.image);
  }

  const updatedPost = await prisma.post.update({
    where: { slug: postData.slug },
    data: {
      title: postData.title,
      content: postData.content,
      image: imageUrl || undefined,
    },
  });
  console.log("update post ", updatedPost);
}

export async function likePost(userId: string, postId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { PostLikes: true },
    });

    const hasLiked = user?.PostLikes.some((post: any) => post.id === postId);

    if (hasLiked) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          PostLikes: {
            disconnect: { id: postId },
          },
        },
      });

      revalidateTag("post");
      return { liked: false };
    } else {
      await prisma.user.update({
        where: { id: userId },
        data: {
          PostLikes: {
            connect: { id: postId },
          },
        },
      });

      const author = await prisma.post.findUnique({
        where: { id: postId },
        select: {
          authorId: true,
        },
      });

      if (!author) throw new Error("Post not found");

      await createNotificationAction({
        type: "like",
        username: user?.username!,
        targetUserId: author.authorId,
        postId: postId,
      });

      revalidateTag("post");
      return { liked: true };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
}

export async function commentToPostAction(
  text: string,
  userId: string,
  postId: string
) {
  await prisma.comment.create({
    data: {
      text,
      userId,
      postId,
    },
  });
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });

  const author = await prisma.post.findUnique({
    where: { id: postId },
    select: {
      authorId: true,
    },
  });

  await createNotificationAction({
    type: "comment",
    username: user?.username!,
    targetUserId: author?.authorId!,
    postId: postId,
    comment: text,
  });

  revalidateTag("comments");
}

export async function replyToCommentAction(
  text: string,
  userId: string,
  postId: string,
  parentCommentId: string
) {
  await prisma.comment.create({
    data: {
      text,
      userId,
      postId,
      parentCommentId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      username: true,
    },
  });

  const comment = await prisma.comment.findUnique({
    where: { id: parentCommentId },
    select: {
      id: true,
      text: true,
      User: {
        select: {
          id: true,
        },
      },
    },
  });

  console.log("before reply notif ");
  await createNotificationAction({
    type: "comment",
    username: user?.username!,
    targetUserId: comment?.User.id!,
    comment: text,
  });

  revalidateTag("comments");
}

export async function editCommentAction(text: string, commentId: string) {
  await prisma.comment.update({
    where: { id: commentId },
    data: {
      text,
    },
  });
  revalidateTag("comments");
}

export async function addBookMarkAction(username: string, postSlug: string) {
  await prisma.user.update({
    where: { username },
    data: {
      bookmarks: {
        connect: { slug: postSlug },
      },
    },
  });
  revalidateTag("bookmark");
}

export async function removeBookMarkAction(username: string, postSlug: string) {
  await prisma.user.update({
    where: { username },
    data: {
      bookmarks: {
        disconnect: { slug: postSlug },
      },
    },
  });
  revalidateTag("bookmark");
}

const LIMIT = 5;

export async function getPopularPosts({ pageParam = 0 }) {
  const posts = await prisma.$transaction(async (tx: any) => {
    const popularPosts = await tx.post.findMany({
      take: LIMIT,
      skip: pageParam,
      select: {
        slug: true,
        image: true,
        title: true,
        createdAt: true,
        content: true,
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
    });
    return popularPosts;
  });

  const nextPage = posts.length === LIMIT ? pageParam + LIMIT : null;

  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    data: posts,
    currentPage: pageParam,
    nextPage,
  };
}

export async function getUserPosts({ pageParam = 0 }, userId: string) {
  const posts = await prisma.$transaction(async (tx: any) => {
    const popularPosts = await tx.post.findMany({
      where: { authorId: userId },
      take: LIMIT,
      skip: pageParam,
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
    });
    return popularPosts;
  });

  const nextPage = posts.length === LIMIT ? pageParam + LIMIT : null;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    data: posts,
    currentPage: pageParam,
    nextPage,
  };
}
