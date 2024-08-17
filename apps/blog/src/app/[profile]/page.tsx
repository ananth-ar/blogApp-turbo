import { prisma } from "database";
import { getServerSession } from "next-auth";
import Link from "next/link";
import UserBlogs from "../../components/UserBlogs";
import { authOptions } from "../../lib/auth";


interface Props {
  params: { profile: string };
}

const UserProfile = async ({ params: { profile } }: Props) => {
  const session = await getServerSession(authOptions);
  const decodedProfile = decodeURIComponent(profile);
  const user = await prisma.user.findUnique({
    where: { username: decodedProfile },
  });

  if (!user) return <div>NO USER FOUND WITH NAME {decodedProfile}</div>;

  return (
    <div>
      UserProfile {decodedProfile}
      <div>
        {session?.user.username === decodedProfile && (
          <Link href={`/setting/edit-profile`}>edit profile</Link>
        )}
      </div>
      <UserBlogs userId={user.id} />
    </div>
  );
};

export default UserProfile;
