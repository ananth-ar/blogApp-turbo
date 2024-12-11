"use server";

import { prisma } from "database";
import { createNotificationAction } from "./notificationActions";
import { FormState } from "../../app/setting/edit-profile/_components/ProfileEditForm";
import { revalidateTag } from "next/cache";

export async function getUserIdAction(username: string) {
  if (username) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return user?.id;
  }
}

export async function updateProfile(prevState: FormState, formData: FormData) {
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const x = formData.get("x") as string;
  const instagram = formData.get("instagram") as string;
  const facebook = formData.get("facebook") as string;
  const youtube = formData.get("youtube") as string;

  try {
    await prisma.user.update({
      where: { username: username },
      data: {
        name,
        description,
        SocialMedia: {
          upsert: {
            create: { x, instagram, facebook, youtube },
            update: { x, instagram, facebook, youtube },
          },
        },
      },
    });

    revalidateTag("editUser");
    return { success: true, message: "Profile updated successfully!" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}

export async function userImg(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    select: {
      image: true,
    },
  });
}



export async function userFollow(username: string, authorId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        following: {
          connect: { id: authorId },
        },
      },
    });

    await createNotificationAction({
      type: "follow",
      username: username,
      targetUserId: authorId,
    });

    revalidateTag("followStatus");

    return updatedUser;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
}

export async function isFollowing(
  followerUsername: string,
  followedUserId: string
) {
  try {
    const follower = await prisma.user.findUnique({
      where: { username: followerUsername },
      include: {
        following: {
          where: { id: followedUserId },
          select: { id: true },
        },
      },
    });

    return follower?.following.length === 1;
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw error;
  }
}

export async function userUnfollow(username: string, authorId: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: { username },
      data: {
        following: {
          disconnect: { id: authorId },
        },
      },
    });

    revalidateTag("followStatus");

    return updatedUser;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
}
