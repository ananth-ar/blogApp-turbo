import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { prisma } from "database";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

app.use("/notifications", async (req: Request, res: Response) => {
  const { notificationCount, targetUserId } = req.body;

  const user = await prisma.user.findUnique({
    where: { id: targetUserId },
  });
  if (user) {
    io.to(user.username).emit("avaliabeNotification", notificationCount);
    res.json({ message: "Notification sent", notificationCount });
  }
});

io.on("connection", (socket) => {
  console.log(`new socket connection ${socket.id} `);

  socket.on("authenticated", async (username) => {
    socket.join(username);
    console.log(`User joined room ${username}`);

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (user) {
      const notificationCount = await prisma.notification.count({
        where: {
          targetUserId: user.id,
        },
      });

      socket.emit("avaliabeNotification", notificationCount);
    }
  });

  socket.on("disconnect", (socket) => {
    console.log(`socket disconnected ${socket} `);
  });
});

const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000;

server.listen(port, () => {
  console.log(
    `${
      process.env.NODE_ENV === "production" ? "prod" : "dev"
    } server listening on port ${port}`
  );
});
