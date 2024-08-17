"use server";

import { Socket } from "socket.io-client";
import { getUserIdAction } from "./userActions";
import { prisma } from "database";

type NotificationType = "follow" | "comment" | "like";

interface NotificationData {
  type: NotificationType;
  username: string;
  targetUserId: string;
  postId?: string;
  comment?: string;
  socket?: Socket;
}

export async function createNotificationAction({
  type,
  username,
  targetUserId,
  postId,
  comment,
  socket,
}: NotificationData) {
  try {
    let notificationData: any = {
      targetUserId: targetUserId,
    };

    if (type === "follow") {
      notificationData.newFollowusername = username;
    } else if (type === "like" || type === "comment") {
      if (postId) {
        const post = await prisma.post.findUnique({
          where: { id: postId },
          select: { title: true, slug: true },
        });

        if (!post) {
          throw new Error("Post not found");
        }

        notificationData = {
          ...notificationData,
          postTitle: post.title,
          postSlug: post.slug,
          ...(type === "comment" && {
            userPostCommentusername: username,
            comment: comment,
          }),
          ...(type === "like" && { userPostLikeusername: username }),
        };
      }
    }
    if (type === "comment") {
      if (!postId) {
        notificationData = {
          ...notificationData,

          ...(type === "comment" && {
            userReplyusername: username,
            comment: comment,
          }),
        };
        console.log("inside reply notif ", notificationData);
      }
    }
    await prisma.notification.create({
      data: notificationData,
    });

    const notificationCount = await prisma.notification.count({
      where: {
        targetUserId: targetUserId,
      },
    });

    const response = await fetch("http://localhost:5000/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        notificationCount,
        targetUserId,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Response from Express server:", result);
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
}

export async function getUnreadNotificationsAction(userId: string) {
  try {
    const unreadNotifications = await prisma.notification.findMany({
      where: {
        targetUserId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("unreadNotif ", unreadNotifications);
    return unreadNotifications;
  } catch (error) {
    console.error("Error fetching unread notifications:", error);
    throw error;
  }
}

export async function markNotificationAsReadAction(notificationId: string) {
  try {
    const updatedNotification = await prisma.notification.delete({
      where: { id: notificationId },
    });
    console.log("markreadNotif ", updatedNotification);
    return updatedNotification;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
}

const LIMIT = 10;

export async function fetchNotifications({ pageParam = 0 }) {
  const notifications = await prisma.$transaction(async (tx:any) => {
    const fetchedNotifications = await tx.notification.findMany({
      take: LIMIT,
      skip: pageParam,
      orderBy: {
        createdAt: "desc",
      },
    });

    const notificationIds = fetchedNotifications.map((n:any) => n.id);

    await tx.notification.deleteMany({
      where: {
        id: {
          in: notificationIds,
        },
      },
    });

    return fetchedNotifications;
  });

  const nextPage = notifications.length === LIMIT ? pageParam + LIMIT : null;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: notifications,
    currentPage: pageParam,
    nextPage,
  };
}
