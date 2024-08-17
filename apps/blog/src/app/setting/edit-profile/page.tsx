import { isAuthenicated } from "../../../lib/utiles/authHelper";
import ProfileEditForm from "./_components/ProfileEditForm";
import { prisma } from "database";

export default async function EditProfilePage() {
  const sessionData = await isAuthenicated();

  const user = await prisma.user.findUnique({
    where: { username: sessionData.username! },
    include: { SocialMedia: true },
  });

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
