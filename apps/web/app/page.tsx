import { prisma } from "database";

export default async function Home() {
  const users = await prisma.user.findMany();

  if (!users) return <div>Hello world - user not defined</div>;

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
