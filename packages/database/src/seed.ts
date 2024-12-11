import { prisma } from "./client";

async function main() {
  const post = await prisma.post.upsert({
    where: { slug: "test-post" },
    update: {},
    create: {
      slug: "test-post",
      title: "Test Post",
      content: "This is a test post content.",
      authorId: "clywe98ao0000idwaa49l0yga",
    },
  });

  const comment1 = await prisma.comment.create({
    data: {
      text: "This is a top-level comment.",
      userId: "clywe98ao0000idwaa49l0yga",
      postId: post.id,
    },
  });

  const comment2 = await prisma.comment.create({
    data: {
      text: "This is another top-level comment.",
      userId: "clywe98ao0000idwaa49l0yga",
      postId: post.id,
    },
  });

  const reply1 = await prisma.comment.create({
    data: {
      text: "This is a reply to the first comment.",
      userId: "clywe98ao0000idwaa49l0yga",
      postId: post.id,
      parentCommentId: comment1.id,
    },
  });

  const reply2 = await prisma.comment.create({
    data: {
      text: "This is another reply to the first comment.",
      userId: "clywe98ao0000idwaa49l0yga",
      postId: post.id,
      parentCommentId: comment1.id,
    },
  });

  const nestedReply = await prisma.comment.create({
    data: {
      text: "This is a nested reply to the first reply.",
      userId: "clywe98ao0000idwaa49l0yga",
      postId: post.id,
      parentCommentId: reply1.id,
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
