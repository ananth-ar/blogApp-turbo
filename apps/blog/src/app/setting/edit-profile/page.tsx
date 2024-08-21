import { unstable_cache } from "next/cache";
import { isAuthenicated } from "../../../lib/utiles/authHelper";
import ProfileEditForm from "./_components/ProfileEditForm";
import { prisma } from "database";

export default async function EditProfilePage() {
  const sessionData = await isAuthenicated();

  const user = await cachedUser(sessionData.username!);

  if (!user) {
    return <div>User not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <ProfileEditForm user={user} />
    </div>
  );
}

async function getUser(username: string) {
  return await prisma.user.findUnique({
    where: { username },
    include: { SocialMedia: true },
  });
}

async function cachedUser(username: string) {
  return unstable_cache(async () => getUser(username), [username], {
    tags: ["editUser"],
  })();
}
