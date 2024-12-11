"use client";

import { SessionProvider, useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";
import { socket } from "../lib/service/socket";

function SocketManager({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session) {
      socket.connect();

      socket.on("connect", () => {
        console.log("Client Socket connected");
  
        socket.emit("authenticated", session.user.username!);
      });

      socket.on("userJoined", (data) => {
        console.log("user successfully joined ", data);
      });

      
      return () => {
        socket.disconnect();
      };
    }
  }, [session, status]);



  return children;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <SocketManager>{children}</SocketManager>
    </SessionProvider>
  );
};

export default AuthProvider;
