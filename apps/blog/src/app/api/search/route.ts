import { prisma } from "database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url!);
    const query = searchParams.get("query");

    if (typeof query !== "string") {
      throw new Error("Invalid request");
    }

    const users = await prisma.$queryRaw`
        SELECT * FROM "User"
        WHERE name ILIKE ${`%${query}%`}
      `;

    const posts = await prisma.$queryRaw`   
        SELECT * FROM "Post"
        WHERE title ILIKE ${`%${query}%`}
      `;

    console.log("user ", users, "   post ", posts);
    return NextResponse.json({ users, posts });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while searching " },
      { status: 500 }
    );
  }
}
