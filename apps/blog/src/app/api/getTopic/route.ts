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

    const topic = await prisma.$queryRaw`
        SELECT * FROM "Topic"
        WHERE topic ILIKE ${`%${query}%`}
      `;

    console.log("topic ", topic);
    return NextResponse.json({ topic });
  } catch (error: any) {
    console.error(error);
   return NextResponse.json(
     { error: "An error occurred while searching topic" },
     { status: 500 }
   );  }
}
