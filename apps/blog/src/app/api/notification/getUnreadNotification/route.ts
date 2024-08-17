import { prisma } from "database";
import { NextRequest, NextResponse } from "next/server";
import { socket } from "../../../../lib/service/socket";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    console.log("inside GET");
    const searchParams = request.nextUrl.searchParams;
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

    const unreadNotifications = await prisma.notification.findMany({
      where: {
        targetUserId: user?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    socket.emit("unreadNotifications-api", unreadNotifications);

    return NextResponse.json({ data: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error getting avaliable notifications: ", error);
    return NextResponse.json({ error: error }, { status: 200 });
  }
}
