import { prisma } from "database";
import {  NextResponse } from "next/server";
import { socket } from "../../../../lib/service/socket";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const notificationCount = await prisma.notification.count({
      where: {
        targetUserId: user.id,
      },
    });
    console.log("emitting notificationCount from api ", notificationCount);
    socket.emit("avaliabeNotification-api", {
      username: username,
      data: notificationCount,
    });

    return NextResponse.json({ data: "Success" });
  } catch (error) {
    console.error("Error getting available notifications: ", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
