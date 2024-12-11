import { prisma } from "database";

export function generateUsernameFromEmail(email: string): string {
  const localPart = email.split("@")[0];
  if (localPart) return "@" + localPart.replace(/[^a-zA-Z0-9]/g, "");
  return email;
}

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "_")
    .replace(/-+/g, "_");
};

export const generateUniqueSlug = async (title: string) => {
  let slug = slugify(title);
  let uniqueSlug = slug;
  let counter = 1;

  while (true) {
    const existingPost = await prisma.post.findUnique({
      where: { slug: uniqueSlug },
    });

    if (!existingPost) {
      return uniqueSlug;
    }

    const date = new Date().toISOString().split("T")[0];
    uniqueSlug = `${slug}_${date}_${counter}`;
    counter++;
  }
};
