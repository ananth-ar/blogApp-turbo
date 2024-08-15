import express from "express";
import cors from "cors";
import { prisma } from "database";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.get("/", async (req: any, res: any) => {
  const users = await prisma.user.findMany();
  console.log("in server ", users);
  res.send("Hello World!");
});

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
