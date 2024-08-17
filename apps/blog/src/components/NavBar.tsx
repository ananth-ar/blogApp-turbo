"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { socket } from "../lib/service/socket";

const NavBar = () => {
  const [notification, setNotification] = useState();
  const { status, data: session } = useSession();

  useEffect(() => {
    socket.on("avaliabeNotification", (data) => {
      console.log("avaliabeNotification ", data);
      setNotification(data);
    });
  }, [ session]);

  return (
    <div className="flex bg-slate-900 p-3 space-x-3">
      {status === "authenticated" ? (
        <div className="flex">
          <a
            className="text-zinc-200 pr-3"
            onClick={async () => await signOut()}
          >
            sign out
          </a>
          <Link href="/dashboard/notifications" className="text-cyan-50">
            notifications {notification}
          </Link>
        </div>
      ) : (
        <Link className="text-zinc-200" href="/signin">
          sign in
        </Link>
      )}
      <div className="text-zinc-200">{session && session.user!.name}</div>
      <Link className="text-zinc-200" href="/editor">
        write
      </Link>
    </div>
  );
};

export default NavBar;
