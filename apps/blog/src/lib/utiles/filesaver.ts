import { unlink, writeFile } from "fs/promises";
import path from "path";

export async function uploadImage(image: File): Promise<string> {
  const filename = `${Date.now()}-${image.name}`;

  const uploadDir = path.join(process.cwd(), "public", "uploads");

  const filepath = path.join(uploadDir, filename);

  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await writeFile(filepath, buffer);

  return `/uploads/${filename}`;
}

export async function deleteImage(imageUrl: string) {
  const filename = path.basename(imageUrl);
  const filepath = path.join(process.cwd(), "public", "uploads", filename);

  try {
    await unlink(filepath);
  } catch (error) {
    console.error("Error deleting image:", error);
  }
}
