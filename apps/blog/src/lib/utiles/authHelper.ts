import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";

export async function isAuthenicated() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");
  return session.user;
}
